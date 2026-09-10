import os
import hmac
import hashlib
from datetime import datetime, timezone

import razorpay
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional

from ..database.db import get_db
from ..database.models import Payment
from .auth import get_current_user

router = APIRouter(prefix="/payments", tags=["payments"])

RAZORPAY_KEY_ID     = os.getenv("RAZORPAY_KEY_ID",     "rzp_test_YOUR_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "YOUR_KEY_SECRET")

PLANS = {
    "single": {"amount_paise": 49900,  "label": "Single Project — ₹499"},
    "all":    {"amount_paise": 199900, "label": "All Projects — ₹1,999"},
}

def _rzp_client():
    return razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))


class CreateOrderIn(BaseModel):
    plan: str
    project_id: Optional[str] = None

class VerifyIn(BaseModel):
    razorpay_order_id:   str
    razorpay_payment_id: str
    razorpay_signature:  str


@router.post("/create-order")
def create_order(body: CreateOrderIn, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if body.plan not in PLANS:
        raise HTTPException(status_code=400, detail="Invalid plan")
    if body.plan == "single" and not body.project_id:
        raise HTTPException(status_code=400, detail="project_id required for single plan")

    if body.plan == "all":
        existing = db.query(Payment).filter(
            Payment.user_id == user.id, Payment.plan == "all", Payment.status == "paid",
        ).first()
    else:
        existing = db.query(Payment).filter(
            Payment.user_id == user.id, Payment.project_id == body.project_id, Payment.status == "paid",
        ).first()

    if existing:
        raise HTTPException(status_code=409, detail="Already purchased")

    plan_info = PLANS[body.plan]
    rzp = _rzp_client()
    rzp_order = rzp.order.create({
        "amount":   plan_info["amount_paise"],
        "currency": "INR",
        "receipt":  f"uid{user.id[:8]}_{body.plan}",
        "notes":    {"user_id": user.id, "plan": body.plan, "project_id": body.project_id or ""},
    })

    payment = Payment(
        user_id=user.id,
        plan=body.plan,
        project_id=body.project_id,
        amount_paise=plan_info["amount_paise"],
        razorpay_order_id=rzp_order["id"],
        status="created",
    )
    db.add(payment)
    db.commit()

    return {
        "order_id":   rzp_order["id"],
        "amount":     plan_info["amount_paise"],
        "currency":   "INR",
        "key_id":     RAZORPAY_KEY_ID,
        "plan_label": plan_info["label"],
    }


@router.post("/verify")
def verify_payment(body: VerifyIn, db: Session = Depends(get_db), user=Depends(get_current_user)):
    payment = db.query(Payment).filter(
        Payment.razorpay_order_id == body.razorpay_order_id,
        Payment.user_id == user.id,
    ).first()

    if not payment:
        raise HTTPException(status_code=404, detail="Order not found")
    if payment.status == "paid":
        return {"success": True, "already_paid": True}

    msg = f"{body.razorpay_order_id}|{body.razorpay_payment_id}"
    expected = hmac.new(
        RAZORPAY_KEY_SECRET.encode("utf-8"),
        msg.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()

    if not hmac.compare_digest(expected, body.razorpay_signature):
        payment.status = "failed"
        db.commit()
        raise HTTPException(status_code=400, detail="Payment signature mismatch")

    payment.status              = "paid"
    payment.razorpay_payment_id = body.razorpay_payment_id
    payment.razorpay_signature  = body.razorpay_signature
    payment.paid_at             = datetime.now(timezone.utc)
    db.commit()

    return {"success": True}


@router.get("/my-access")
def my_access(db: Session = Depends(get_db), user=Depends(get_current_user)):
    all_plan = db.query(Payment).filter(
        Payment.user_id == user.id, Payment.plan == "all", Payment.status == "paid",
    ).first()

    if all_plan:
        return {"has_all": True, "project_ids": []}

    paid_projects = db.query(Payment.project_id).filter(
        Payment.user_id == user.id, Payment.plan == "single", Payment.status == "paid",
    ).all()

    return {"has_all": False, "project_ids": [row.project_id for row in paid_projects]}
