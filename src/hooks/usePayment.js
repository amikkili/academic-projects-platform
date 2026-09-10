import { useState, useCallback } from 'react'
import { API_BASE } from '../lib/api'

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return }
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload  = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

/**
 * usePayment — drives the full Razorpay checkout flow.
 *
 * Usage:
 *   const { pay, loading, error } = usePayment({ token, user, onSuccess })
 *   pay({ plan: 'single', project_id: 'sentiment-analysis' })
 *   pay({ plan: 'all' })
 */
export function usePayment({ token, user, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const pay = useCallback(async ({ plan, project_id = null }) => {
    setError('')
    setLoading(true)
    try {
      const loaded = await loadRazorpayScript()
      if (!loaded) throw new Error('Could not load Razorpay. Check your internet connection.')

      // 1. Create order on backend
      const orderRes = await fetch(`${API_BASE}/payments/create-order`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body:    JSON.stringify({ plan, project_id }),
      })
      if (!orderRes.ok) {
        const e = await orderRes.json()
        throw new Error(e.detail || 'Failed to create order')
      }
      const order = await orderRes.json()

      // 2. Open Razorpay modal
      await new Promise((resolve, reject) => {
        const options = {
          key:         order.key_id,
          amount:      order.amount,
          currency:    order.currency,
          name:        'AcademiCode',
          description: order.plan_label,
          order_id:    order.order_id,
          prefill: {
            name:  user?.name  || '',
            email: user?.email || '',
          },
          theme: { color: '#F97316' },
          handler: async (response) => {
            // 3. Verify payment on backend
            const verifyRes = await fetch(`${API_BASE}/payments/verify`, {
              method:  'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({
                razorpay_order_id:   response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature:  response.razorpay_signature,
              }),
            })
            if (!verifyRes.ok) { reject(new Error('Payment verification failed')); return }
            resolve()
          },
          modal: {
            ondismiss: () => reject(new Error('Payment cancelled')),
          },
        }
        const rzp = new window.Razorpay(options)
        rzp.on('payment.failed', () => reject(new Error('Payment failed')))
        rzp.open()
      })

      onSuccess?.({ plan, project_id })
    } catch (err) {
      // Don't treat "cancelled" as a hard error — just clear loading silently
      if (!err.message.includes('cancelled')) {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }, [token, user, onSuccess])

  return { pay, loading, error }
}
