# -*- coding: utf-8 -*-
"""
tcs_coding_engine.py
=====================
Generates TCS NQT Programming Logic MCQ questions.

Three topic types, each with multiple sub-types:

  output_prediction  — "What is the output of the following code?"
    sub-types: loop_accumulator, string_ops, list_ops,
               nested_loop_count, recursion_trace

  time_complexity    — "What is the time complexity?"
    sub-types: single_loop, nested_loops, binary_search,
               merge_sort_call, constant_op

  cs_concepts        — MCQ pool (OOP, DS, algorithms, Python facts)

Randomization:
  seed controls rng → same seed always produces the same question.
  Variable values, array contents, loop bounds all drawn from rng.
  Different seeds → different numbers inside the same code template → different answer.

Return shape (identical to mocktest-platform engines):
  {
    "question":       str,           # includes code block in triple backticks
    "options":        {A:_, B:_, C:_, D:_},
    "correct_option": "A"|"B"|"C"|"D",
    "explanation":    {hint, steps, remember, concept},
    "metadata":       {topic, sub_type, difficulty, seed, ...}
  }
"""

import random
import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# ─────────────────────────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────────────────────────

def _make_options(rng, correct, distractors):
    """Shuffle correct + distractors into A/B/C/D. Return (opts, correct_label)."""
    pool = [str(correct)] + [str(d) for d in distractors if str(d) != str(correct)]
    pool = list(dict.fromkeys(pool))          # deduplicate, preserve order
    while len(pool) < 4:
        pool.append(str(int(correct) + rng.randint(1, 5) * rng.choice([-1, 1])))
        pool = list(dict.fromkeys(pool))
    pool = pool[:4]
    rng.shuffle(pool)
    labels = ["A", "B", "C", "D"]
    opts = {labels[i]: pool[i] for i in range(4)}
    cor_lbl = next(k for k, v in opts.items() if v == str(correct))
    return opts, cor_lbl


def _pool_question(rng, pool, difficulty):
    """Pick a question from a pool list filtered by difficulty."""
    filtered = [q for q in pool if q.get("difficulty", "easy") == difficulty]
    if not filtered:
        filtered = pool
    item = rng.choice(filtered)
    opts = dict(item["options"])          # copy so shuffle doesn't mutate pool
    items_list = list(opts.items())
    rng.shuffle(items_list)
    shuffled = {["A","B","C","D"][i]: v for i, (_, v) in enumerate(items_list)}
    cor_lbl = next(k for k, v in shuffled.items() if v == item["options"][item["correct_option"]])
    return {
        "question":       item["question"],
        "options":        shuffled,
        "correct_option": cor_lbl,
        "explanation":    item.get("explanation", {}),
        "metadata": {
            "topic":      "cs_concepts",
            "sub_type":   item.get("sub_type", "concept_mcq"),
            "difficulty": difficulty,
            "seed":       rng.randint(0, 999999),
        },
    }


# ─────────────────────────────────────────────────────────────────────────────
# OUTPUT PREDICTION — sub-type generators
# ─────────────────────────────────────────────────────────────────────────────

def _loop_accumulator(rng, difficulty):
    """
    x = <start>
    for i in range(<n>):
        x += <step>       # or x *= step (medium/hard)
    print(x)
    """
    start = rng.choice([0, 1, 2, 3, 5, 10])
    n     = rng.choice([3, 4, 5, 6] if difficulty == "easy" else [4, 5, 6, 7, 8])

    if difficulty == "easy":
        step = rng.choice([1, 2, 3, 4, 5])
        correct = start + step * n
        op_sym  = f"+= {step}"
        op_desc = f"adds {step} each iteration"
        trace   = [f"Before loop: x = {start}"] + \
                  [f"i={i}: x = {start + step*i} + {step} = {start + step*(i+1)}" for i in range(n)]
    elif difficulty == "medium":
        step = rng.choice([2, 3, 5])
        op   = rng.choice(["add", "sub"])
        if op == "add":
            correct = start + step * n
            op_sym  = f"+= {step}"
            op_desc = f"adds {step} each iteration"
            trace   = [f"i={i}: x = {start + step*i} + {step} = {start + step*(i+1)}" for i in range(n)]
        else:
            correct = start - step * n
            op_sym  = f"-= {step}"
            op_desc = f"subtracts {step} each iteration"
            trace   = [f"i={i}: x = {start - step*i} - {step} = {start - step*(i+1)}" for i in range(n)]
    else:
        # hard: nested expression x += i * step
        step = rng.choice([2, 3])
        correct = start + step * sum(range(n))   # x += i*step each iter
        op_sym  = f"+= i * {step}"
        op_desc = f"adds i*{step} each iteration (i = 0..{n-1})"
        trace   = [f"i={i}: x += {i}*{step} = {i*step}" for i in range(n)]

    code = f"""x = {start}
for i in range({n}):
    x {op_sym}
print(x)"""

    question = f"What is the output of the following Python code?\n\n```python\n{code}\n```"
    distractors = [
        correct + rng.choice([1,2,3,-1,-2]),
        correct + n,
        start + n,
    ]
    opts, cor_lbl = _make_options(rng, correct, distractors)

    steps = [{"label": t.split(":")[0], "value": t.split(":",1)[1].strip()} for t in trace]
    return {
        "question":       question,
        "options":        opts,
        "correct_option": cor_lbl,
        "explanation": {
            "hint":    f"The loop runs {n} times (range({n}) → 0 to {n-1}). The variable x {op_desc}.",
            "steps":   steps,
            "remember": f"range({n}) gives {n} values: 0, 1, …, {n-1}. Count carefully.",
            "concept":  "Loop output tracing with accumulator variable.",
        },
        "metadata": {
            "topic": "output_prediction", "sub_type": "loop_accumulator",
            "difficulty": difficulty, "correct_val": str(correct),
        },
    }


def _string_ops(rng, difficulty):
    """String slicing / method questions."""
    words = ["python", "laptop", "campus", "coding", "rocket", "bridge",
             "signal", "cursor", "memory", "packet"]
    word = rng.choice(words)
    n    = len(word)

    if difficulty == "easy":
        # s[a:b]  or  s[:b]  or  s[a:]
        variant = rng.choice(["slice_full", "upper", "len"])
        if variant == "slice_full":
            a = rng.randint(0, n // 2)
            b = rng.randint(a + 1, n)
            correct  = word[a:b]
            code     = f's = "{word}"\nprint(s[{a}:{b}])'
            hint     = f"Slicing s[{a}:{b}] extracts characters at index {a} up to (not including) {b}."
            remember = "Python slicing: s[start:stop] — stop index is exclusive."
        elif variant == "upper":
            correct  = word.upper()
            code     = f's = "{word}"\nprint(s.upper())'
            hint     = "s.upper() converts all characters to uppercase."
            remember = "str.upper() returns a new string; the original is unchanged."
        else:
            correct  = str(n)
            code     = f's = "{word}"\nprint(len(s))'
            hint     = f'len("{word}") counts the characters: {n}.'
            remember = "len(s) returns the number of characters including spaces."
        steps = [{"label": "s", "value": f'"{word}"'},
                 {"label": "result", "value": str(correct)}]

    elif difficulty == "medium":
        variant = rng.choice(["reverse", "replace", "count"])
        if variant == "reverse":
            correct  = word[::-1]
            code     = f's = "{word}"\nprint(s[::-1])'
            hint     = "s[::-1] reverses the string using step -1."
            remember = "s[::-1] is the idiomatic Python string reverse."
        elif variant == "replace":
            old = rng.choice(list(word))
            new = rng.choice(["x", "z", "0"])
            correct  = word.replace(old, new)
            code     = f's = "{word}"\nprint(s.replace("{old}", "{new}"))'
            hint     = f's.replace("{old}", "{new}") replaces every "{old}" with "{new}".'
            remember = "str.replace() replaces ALL occurrences, not just the first."
        else:
            ch = rng.choice(list(set(word)))
            correct  = str(word.count(ch))
            code     = f's = "{word}"\nprint(s.count("{ch}"))'
            hint     = f's.count("{ch}") counts how many times "{ch}" appears in "{word}".'
            remember = "str.count(sub) is case-sensitive."
        steps = [{"label": "s", "value": f'"{word}"'},
                 {"label": "result", "value": str(correct)}]

    else:
        # hard: chained methods
        correct  = word.strip().upper()[:3]
        code     = f's = "  {word}  "\nprint(s.strip().upper()[:3])'
        hint     = f'strip() removes spaces → "{word}", upper() → "{word.upper()}", [:3] → "{correct}".'
        remember = "Method chains execute left to right; each returns a new string."
        steps = [
            {"label": "strip()", "value": f'"{word}"'},
            {"label": "upper()", "value": f'"{word.upper()}"'},
            {"label": "[:3]",    "value": f'"{correct}"'},
        ]

    question = f"What is the output of the following Python code?\n\n```python\n{code}\n```"
    # distractors: near-miss variants
    distractors = [
        word[1:] if variant != "slice_full" else word,   # off-by-one
        correct[1:] if len(str(correct)) > 1 else correct + "x",
        str(correct).lower() if str(correct) != str(correct).lower() else str(correct).upper(),
    ]
    opts, cor_lbl = _make_options(rng, correct, distractors)
    # force string options (no int conversion)
    opts = {k: v for k, v in opts.items()}

    return {
        "question":       question,
        "options":        opts,
        "correct_option": cor_lbl,
        "explanation": {
            "hint":    hint,
            "steps":   steps,
            "remember": remember,
            "concept":  "Python string operations and slicing.",
        },
        "metadata": {
            "topic": "output_prediction", "sub_type": "string_ops",
            "difficulty": difficulty, "correct_val": str(correct),
        },
    }


def _list_ops(rng, difficulty):
    """List append/pop/index/sum output questions."""
    base   = [rng.randint(1, 9) for _ in range(rng.randint(3, 5))]

    if difficulty == "easy":
        val     = rng.randint(10, 20)
        correct = str(base + [val])
        code    = f"lst = {base}\nlst.append({val})\nprint(lst)"
        hint    = f"append({val}) adds {val} to the end of the list."
        steps   = [{"label": "Initial list", "value": str(base)},
                   {"label": f"After append({val})", "value": correct}]
        remember = "list.append() adds to the END; it modifies the list in place."
        distractors = [str([val] + base), str(base[:-1] + [val]), str(base)]

    elif difficulty == "medium":
        variant = rng.choice(["pop", "sum", "index"])
        if variant == "pop":
            popped  = base[-1]
            correct = str(popped)
            code    = f"lst = {base}\nprint(lst.pop())"
            hint    = "lst.pop() removes and returns the LAST element."
            steps   = [{"label": "List", "value": str(base)},
                       {"label": "pop() returns", "value": correct}]
            remember = "list.pop() with no argument removes the last item."
            distractors = [str(base[0]), str(base[1]), str(len(base))]
        elif variant == "sum":
            s       = sum(base)
            correct = str(s)
            code    = f"lst = {base}\nprint(sum(lst))"
            hint    = f"sum({base}) = {' + '.join(map(str, base))} = {s}."
            steps   = [{"label": "Elements", "value": str(base)},
                       {"label": "Sum",      "value": correct}]
            remember = "sum() works on any iterable of numbers."
            distractors = [str(s + 1), str(s - 1), str(max(base))]
        else:
            idx     = rng.randint(0, len(base) - 1)
            correct = str(base[idx])
            code    = f"lst = {base}\nprint(lst[{idx}])"
            hint    = f"lst[{idx}] accesses the element at index {idx} (0-based)."
            steps   = [{"label": f"Index {idx}", "value": correct}]
            remember = "Python lists are 0-indexed. lst[0] is the first element."
            distractors = [str(base[idx - 1] if idx > 0 else base[1]),
                           str(idx), str(len(base))]

    else:
        # hard: list comprehension output
        n       = rng.choice([3, 4, 5])
        step    = rng.choice([2, 3])
        result  = [i * step for i in range(n)]
        correct = str(result)
        code    = f"lst = [i * {step} for i in range({n})]\nprint(lst)"
        hint    = f"Comprehension: i * {step} for i in range({n}) → {result}."
        steps   = [{"label": f"i={i}", "value": f"i * {step} = {i*step}"} for i in range(n)]
        remember = "List comprehensions: [expr for var in iterable] — same as a for-loop building a list."
        distractors = [str(list(range(n))), str([i*step for i in range(1, n+1)]),
                       str([i+step for i in range(n)])]

    question = f"What is the output of the following Python code?\n\n```python\n{code}\n```"
    opts, cor_lbl = _make_options(rng, correct, distractors)
    return {
        "question":       question,
        "options":        opts,
        "correct_option": cor_lbl,
        "explanation": {
            "hint":    hint,
            "steps":   steps,
            "remember": remember,
            "concept":  "Python list operations.",
        },
        "metadata": {
            "topic": "output_prediction", "sub_type": "list_ops",
            "difficulty": difficulty, "correct_val": str(correct),
        },
    }


def _nested_loop_count(rng, difficulty):
    """Count how many times a print runs inside nested loops."""
    outer = rng.choice([2, 3, 4, 5])
    inner = rng.choice([2, 3, 4])
    correct = outer * inner

    if difficulty == "easy":
        code = f"""count = 0
for i in range({outer}):
    for j in range({inner}):
        count += 1
print(count)"""
        hint = f"Outer loop runs {outer} times, inner loop runs {inner} times each → {outer} × {inner} = {correct}."
    else:
        start_i = rng.choice([1, 2])
        start_j = rng.choice([1, 2])
        real_outer = outer - start_i
        real_inner = inner - start_j
        correct    = real_outer * real_inner
        code = f"""count = 0
for i in range({start_i}, {outer}):
    for j in range({start_j}, {inner}):
        count += 1
print(count)"""
        hint = f"Outer loop: range({start_i},{outer}) → {real_outer} iterations. Inner: range({start_j},{inner}) → {real_inner}. Total = {real_outer}×{real_inner} = {correct}."

    question = f"What is the output of the following Python code?\n\n```python\n{code}\n```"
    distractors = [outer + inner, outer * inner + 1, outer * inner - 1]
    opts, cor_lbl = _make_options(rng, correct, distractors)
    return {
        "question":       question,
        "options":        opts,
        "correct_option": cor_lbl,
        "explanation": {
            "hint":    hint,
            "steps":   [{"label": "Outer iterations", "value": str(outer if difficulty=="easy" else outer - start_i)},
                        {"label": "Inner iterations", "value": str(inner if difficulty=="easy" else inner - start_j)},
                        {"label": "Total",            "value": str(correct)}],
            "remember": "Nested loops: total iterations = outer_count × inner_count.",
            "concept":  "Nested loop iteration counting.",
        },
        "metadata": {
            "topic": "output_prediction", "sub_type": "nested_loop_count",
            "difficulty": difficulty, "correct_val": str(correct),
        },
    }


def _recursion_trace(rng, difficulty):
    """Factorial or Fibonacci trace for small n."""
    if difficulty in ("easy", "medium"):
        # factorial
        n = rng.choice([3, 4, 5] if difficulty == "easy" else [5, 6])
        import math
        correct = math.factorial(n)
        code = f"""def fact(n):
    if n == 0:
        return 1
    return n * fact(n - 1)

print(fact({n}))"""
        call_trace = []
        val = 1
        for k in range(1, n + 1):
            val *= k
            call_trace.append({"label": f"fact({k})", "value": f"{k} × {val//k} = {val}"})
        hint    = f"fact({n}) = {n}! = {' × '.join(str(i) for i in range(1,n+1))} = {correct}."
        remember = "Recursion unwinds from base case (n=0 returns 1) upward."
    else:
        # Fibonacci
        n = rng.choice([6, 7, 8])
        def fib(k): return k if k <= 1 else fib(k-1) + fib(k-2)
        correct  = fib(n)
        code = f"""def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

print(fib({n}))"""
        seq = [fib(i) for i in range(n + 1)]
        call_trace = [{"label": f"fib({i})", "value": str(seq[i])} for i in range(n + 1)]
        hint     = f"Fibonacci: 0,1,1,2,3,5,8,13,... fib({n}) = {correct}."
        remember = "Fibonacci: fib(n) = fib(n-1) + fib(n-2), with fib(0)=0, fib(1)=1."

    question = f"What is the output of the following Python code?\n\n```python\n{code}\n```"
    distractors = [correct - 1, correct + 1, correct * 2]
    opts, cor_lbl = _make_options(rng, correct, distractors)
    return {
        "question":       question,
        "options":        opts,
        "correct_option": cor_lbl,
        "explanation": {
            "hint":    hint,
            "steps":   call_trace,
            "remember": remember,
            "concept":  "Recursion tracing.",
        },
        "metadata": {
            "topic": "output_prediction", "sub_type": "recursion_trace",
            "difficulty": difficulty, "correct_val": str(correct),
        },
    }


_OUTPUT_SUB_TYPES = {
    "easy":   [_loop_accumulator, _string_ops, _list_ops, _nested_loop_count],
    "medium": [_loop_accumulator, _string_ops, _list_ops, _nested_loop_count, _recursion_trace],
    "hard":   [_loop_accumulator, _string_ops, _list_ops, _nested_loop_count, _recursion_trace],
}


def generate_output_prediction(difficulty="easy", seed=42):
    rng  = random.Random(seed)
    fns  = _OUTPUT_SUB_TYPES.get(difficulty, _OUTPUT_SUB_TYPES["easy"])
    fn   = rng.choice(fns)
    for attempt in range(10):
        try:
            result = fn(random.Random(seed + attempt), difficulty)
            result["metadata"]["seed"] = seed
            result["metadata"]["difficulty"] = difficulty
            return result
        except Exception:
            continue
    return None


# ─────────────────────────────────────────────────────────────────────────────
# TIME COMPLEXITY — sub-type generators
# ─────────────────────────────────────────────────────────────────────────────

_TC_POOL = [
    # easy
    {
        "difficulty": "easy",
        "sub_type": "single_loop",
        "question": "What is the time complexity of the following algorithm?\n\n```python\ndef find_max(arr):\n    max_val = arr[0]\n    for x in arr:\n        if x > max_val:\n            max_val = x\n    return max_val\n```",
        "options": {"A": "O(1)", "B": "O(n)", "C": "O(n²)", "D": "O(log n)"},
        "correct_option": "B",
        "explanation": {
            "hint": "The loop visits every element once → proportional to input size n.",
            "steps": [{"label": "Loop", "value": "Runs n times (once per element)"},
                      {"label": "Body", "value": "O(1) comparison per iteration"},
                      {"label": "Total", "value": "O(n)"}],
            "remember": "A single pass over n elements = O(n).",
            "concept": "Linear time complexity.",
        },
    },
    {
        "difficulty": "easy",
        "sub_type": "constant_op",
        "question": "What is the time complexity of the following?\n\n```python\ndef get_first(arr):\n    return arr[0]\n```",
        "options": {"A": "O(n)", "B": "O(n²)", "C": "O(1)", "D": "O(log n)"},
        "correct_option": "C",
        "explanation": {
            "hint": "Accessing an element by index is always one operation regardless of array size.",
            "steps": [{"label": "Operation", "value": "arr[0] — direct index access"},
                      {"label": "Cost", "value": "Same for any n → O(1)"}],
            "remember": "Array index access is O(1) — it doesn't depend on array size.",
            "concept": "Constant time complexity.",
        },
    },
    {
        "difficulty": "easy",
        "sub_type": "binary_search",
        "question": "What is the time complexity of binary search on a sorted array of n elements?",
        "options": {"A": "O(n)", "B": "O(n log n)", "C": "O(n²)", "D": "O(log n)"},
        "correct_option": "D",
        "explanation": {
            "hint": "Binary search halves the search space each step: n → n/2 → n/4 → ... → 1. That is log₂(n) steps.",
            "steps": [{"label": "Step 1", "value": "Compare middle element"},
                      {"label": "Step 2", "value": "Discard half the array"},
                      {"label": "Steps needed", "value": "log₂(n)"}],
            "remember": "Halving the problem each step → O(log n).",
            "concept": "Logarithmic time complexity.",
        },
    },
    # medium
    {
        "difficulty": "medium",
        "sub_type": "nested_loops",
        "question": "What is the time complexity of the following?\n\n```python\ndef bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(n - 1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n```",
        "options": {"A": "O(n)", "B": "O(n log n)", "C": "O(n²)", "D": "O(2n)"},
        "correct_option": "C",
        "explanation": {
            "hint": "Two nested loops each running ~n times → n × n = n² comparisons.",
            "steps": [{"label": "Outer loop", "value": "Runs n times"},
                      {"label": "Inner loop", "value": "Runs n-1 times per outer"},
                      {"label": "Total", "value": "n × (n-1) ≈ O(n²)"}],
            "remember": "Two nested loops over the same input → O(n²).",
            "concept": "Quadratic time complexity.",
        },
    },
    {
        "difficulty": "medium",
        "sub_type": "merge_sort",
        "question": "What is the average-case time complexity of merge sort for n elements?",
        "options": {"A": "O(n²)", "B": "O(n)", "C": "O(n log n)", "D": "O(log n)"},
        "correct_option": "C",
        "explanation": {
            "hint": "Merge sort divides the array (log n levels) and merges at each level (O(n) work) → O(n log n).",
            "steps": [{"label": "Divide", "value": "log₂(n) levels of splitting"},
                      {"label": "Merge",  "value": "O(n) work at each level"},
                      {"label": "Total",  "value": "O(n log n)"}],
            "remember": "Merge sort: always O(n log n) — best, average, and worst case.",
            "concept": "O(n log n) time complexity.",
        },
    },
    {
        "difficulty": "medium",
        "sub_type": "dict_lookup",
        "question": "What is the average-case time complexity of looking up a key in a Python dictionary?",
        "options": {"A": "O(n)", "B": "O(log n)", "C": "O(n²)", "D": "O(1)"},
        "correct_option": "D",
        "explanation": {
            "hint": "Python dicts are hash tables. A hash lookup computes the hash and accesses the bucket directly — no iteration over all keys.",
            "steps": [{"label": "Hash key", "value": "O(1) — compute hash"},
                      {"label": "Access",   "value": "O(1) — go to bucket"},
                      {"label": "Total",    "value": "O(1) average case"}],
            "remember": "Hash table lookup is O(1) average. Worst case (all collisions) is O(n) but rare.",
            "concept": "Hash table time complexity.",
        },
    },
    {
        "difficulty": "medium",
        "sub_type": "log_loop",
        "question": "What is the time complexity of the following?\n\n```python\ndef count_halvings(n):\n    count = 0\n    while n > 1:\n        n = n // 2\n        count += 1\n    return count\n```",
        "options": {"A": "O(n)", "B": "O(log n)", "C": "O(n²)", "D": "O(1)"},
        "correct_option": "B",
        "explanation": {
            "hint": "n is halved each iteration: n → n/2 → n/4 → ... → 1. That takes log₂(n) steps.",
            "steps": [{"label": "Each iteration", "value": "n is divided by 2"},
                      {"label": "Steps to reach 1", "value": "log₂(n)"},
                      {"label": "Total", "value": "O(log n)"}],
            "remember": "Dividing by 2 each step → O(log n).",
            "concept": "Logarithmic while-loop.",
        },
    },
    # hard
    {
        "difficulty": "hard",
        "sub_type": "two_loops_independent",
        "question": "What is the time complexity of the following?\n\n```python\ndef process(arr, brr):\n    for x in arr:        # len = n\n        print(x)\n    for y in brr:        # len = m\n        print(y)\n```",
        "options": {"A": "O(n × m)", "B": "O(n²)", "C": "O(n + m)", "D": "O(n log m)"},
        "correct_option": "C",
        "explanation": {
            "hint": "The two loops are sequential (not nested). First loop: O(n). Second loop: O(m). Total: O(n + m).",
            "steps": [{"label": "First loop",  "value": "O(n) — iterates arr"},
                      {"label": "Second loop", "value": "O(m) — iterates brr"},
                      {"label": "Total",       "value": "O(n) + O(m) = O(n + m)"}],
            "remember": "Sequential loops ADD; nested loops MULTIPLY.",
            "concept": "Sequential vs nested loop complexity.",
        },
    },
    {
        "difficulty": "hard",
        "sub_type": "recursion_complexity",
        "question": "What is the time complexity of the following recursive function for input n?\n\n```python\ndef power(base, n):\n    if n == 0:\n        return 1\n    return base * power(base, n - 1)\n```",
        "options": {"A": "O(log n)", "B": "O(n²)", "C": "O(1)", "D": "O(n)"},
        "correct_option": "D",
        "explanation": {
            "hint": "Each call reduces n by 1 and does O(1) work. The call chain is n levels deep → O(n).",
            "steps": [{"label": "Recursive calls", "value": "power(base,n) → power(base,n-1) → ... → power(base,0)"},
                      {"label": "Depth",           "value": "n levels"},
                      {"label": "Work per level",  "value": "O(1)"},
                      {"label": "Total",           "value": "O(n)"}],
            "remember": "Recursion reducing by 1 each call → O(n). Halving each call → O(log n).",
            "concept": "Recursive time complexity.",
        },
    },
]


def generate_time_complexity(difficulty="easy", seed=42):
    rng      = random.Random(seed)
    filtered = [q for q in _TC_POOL if q["difficulty"] == difficulty]
    if not filtered:
        filtered = _TC_POOL
    item = rng.choice(filtered)
    opts = {k: v for k, v in item["options"].items()}
    keys = list(opts.keys())
    rng.shuffle(keys)
    shuffled    = {keys[i]: opts[list(opts.keys())[i]] for i in range(len(keys))}
    correct_val = item["options"][item["correct_option"]]
    cor_lbl     = next(k for k, v in shuffled.items() if v == correct_val)
    return {
        "question":       item["question"],
        "options":        shuffled,
        "correct_option": cor_lbl,
        "explanation":    item.get("explanation", {}),
        "metadata": {
            "topic":      "time_complexity",
            "sub_type":   item.get("sub_type", "complexity_mcq"),
            "difficulty": difficulty,
            "seed":       seed,
        },
    }


# ─────────────────────────────────────────────────────────────────────────────
# CS CONCEPTS — static pool (OOP, DS, Python facts, algorithms)
# ─────────────────────────────────────────────────────────────────────────────

_CS_POOL = [
    # OOP — easy
    {
        "difficulty": "easy", "sub_type": "oop_basics",
        "question": "Which OOP principle allows a class to inherit properties and methods from another class?",
        "options": {"A": "Encapsulation", "B": "Polymorphism", "C": "Inheritance", "D": "Abstraction"},
        "correct_option": "C",
        "explanation": {
            "hint": "Inheritance lets a child class reuse code from a parent class.",
            "steps": [{"label": "Inheritance", "value": "Child class extends parent → reuses fields and methods"}],
            "remember": "4 pillars of OOP: Encapsulation, Abstraction, Inheritance, Polymorphism (EAIP).",
            "concept": "OOP — Inheritance.",
        },
    },
    {
        "difficulty": "easy", "sub_type": "oop_basics",
        "question": "What is the term for binding data and methods together into a single unit (class)?",
        "options": {"A": "Inheritance", "B": "Polymorphism", "C": "Abstraction", "D": "Encapsulation"},
        "correct_option": "D",
        "explanation": {
            "hint": "Encapsulation = wrapping data and behavior into one capsule (the class).",
            "steps": [{"label": "Encapsulation", "value": "Data (attributes) + behavior (methods) in one class"}],
            "remember": "Encapsulation also controls access via private/public — data hiding.",
            "concept": "OOP — Encapsulation.",
        },
    },
    {
        "difficulty": "easy", "sub_type": "python_basics",
        "question": "Which of the following is immutable in Python?",
        "options": {"A": "list", "B": "dict", "C": "set", "D": "tuple"},
        "correct_option": "D",
        "explanation": {
            "hint": "Immutable means you cannot change the object after creation. Tuples cannot be modified.",
            "steps": [{"label": "tuple", "value": "Immutable — cannot add, remove or change elements after creation"},
                      {"label": "list, dict, set", "value": "Mutable — can be changed after creation"}],
            "remember": "Mutable: list, dict, set. Immutable: int, float, str, tuple, frozenset.",
            "concept": "Python mutability.",
        },
    },
    {
        "difficulty": "easy", "sub_type": "ds_basics",
        "question": "Which data structure follows the Last In, First Out (LIFO) principle?",
        "options": {"A": "Queue", "B": "Stack", "C": "Linked List", "D": "Array"},
        "correct_option": "B",
        "explanation": {
            "hint": "LIFO: the last item pushed is the first one popped — like a stack of plates.",
            "steps": [{"label": "Stack", "value": "push() adds to top, pop() removes from top → LIFO"}],
            "remember": "Stack = LIFO. Queue = FIFO (First In, First Out).",
            "concept": "Stack data structure.",
        },
    },
    # medium
    {
        "difficulty": "medium", "sub_type": "oop_intermediate",
        "question": "In Python, what does the `__init__` method do?",
        "options": {"A": "Deletes an object", "B": "Initialises object attributes when an instance is created",
                    "C": "Defines a class method", "D": "Returns the string representation of an object"},
        "correct_option": "B",
        "explanation": {
            "hint": "`__init__` is the constructor — Python calls it automatically when you write MyClass().",
            "steps": [{"label": "__init__", "value": "Called automatically on object creation to set initial state"},
                      {"label": "self",     "value": "Refers to the new instance being initialised"}],
            "remember": "`__init__` ≠ constructor (Python calls it after __new__), but treat it as a constructor in practice.",
            "concept": "Python OOP — __init__ method.",
        },
    },
    {
        "difficulty": "medium", "sub_type": "ds_intermediate",
        "question": "What is the worst-case time complexity of searching for an element in an unsorted array?",
        "options": {"A": "O(1)", "B": "O(log n)", "C": "O(n)", "D": "O(n²)"},
        "correct_option": "C",
        "explanation": {
            "hint": "Without sorting, you must check every element — worst case is the last one or not found.",
            "steps": [{"label": "Linear search", "value": "Check each element one by one"},
                      {"label": "Worst case",    "value": "Element at end or absent → n comparisons → O(n)"}],
            "remember": "Unsorted array search = O(n). Sorted array with binary search = O(log n).",
            "concept": "Linear search complexity.",
        },
    },
    {
        "difficulty": "medium", "sub_type": "python_intermediate",
        "question": "What does `*args` allow in a Python function definition?",
        "options": {"A": "Keyword-only arguments", "B": "A variable number of positional arguments",
                    "C": "Default parameter values", "D": "A dictionary of arguments"},
        "correct_option": "B",
        "explanation": {
            "hint": "`*args` collects any number of positional arguments into a tuple.",
            "steps": [{"label": "*args", "value": "def f(*args): — args is a tuple of all positional args passed"},
                      {"label": "**kwargs", "value": "Collects keyword arguments into a dict (different)"}],
            "remember": "*args → tuple. **kwargs → dict. Both are variable-length argument mechanisms.",
            "concept": "Python *args and **kwargs.",
        },
    },
    {
        "difficulty": "medium", "sub_type": "sorting",
        "question": "Which sorting algorithm has an average-case time complexity of O(n log n)?",
        "options": {"A": "Bubble Sort", "B": "Selection Sort", "C": "Insertion Sort", "D": "Merge Sort"},
        "correct_option": "D",
        "explanation": {
            "hint": "Merge Sort always divides and conquers → O(n log n) in all cases.",
            "steps": [{"label": "Bubble/Selection/Insertion", "value": "O(n²) average case"},
                      {"label": "Merge Sort",                 "value": "O(n log n) — always"}],
            "remember": "O(n log n) sorters: Merge Sort (always), Quick Sort (average), Heap Sort (always).",
            "concept": "Sorting algorithm complexity.",
        },
    },
    # hard
    {
        "difficulty": "hard", "sub_type": "oop_advanced",
        "question": "What is the output of the following Python code?\n\n```python\nclass A:\n    def greet(self):\n        return 'Hello from A'\n\nclass B(A):\n    def greet(self):\n        return 'Hello from B'\n\nobj = B()\nprint(obj.greet())\n```",
        "options": {"A": "Hello from A", "B": "Hello from B", "C": "Error", "D": "Hello from A and B"},
        "correct_option": "B",
        "explanation": {
            "hint": "obj is an instance of B. Python's Method Resolution Order (MRO) looks up B first, finds greet() there, and uses it.",
            "steps": [{"label": "obj = B()", "value": "Creates a B instance"},
                      {"label": "obj.greet()", "value": "MRO: B → A. Found in B → returns 'Hello from B'"}],
            "remember": "Method overriding: child class method takes precedence over parent. MRO goes child → parent.",
            "concept": "OOP — Method Overriding & MRO.",
        },
    },
    {
        "difficulty": "hard", "sub_type": "python_advanced",
        "question": "What will the following code print?\n\n```python\ndef f(x, lst=[]):\n    lst.append(x)\n    return lst\n\nprint(f(1))\nprint(f(2))\n```",
        "options": {"A": "[1]\\n[2]", "B": "[1]\\n[1, 2]", "C": "Error", "D": "[1, 2]\\n[1, 2]"},
        "correct_option": "B",
        "explanation": {
            "hint": "Default mutable arguments (like lists) are created ONCE when the function is defined, not on every call. The same list object is reused.",
            "steps": [{"label": "f(1)", "value": "lst = [] (created once). append(1) → [1]. Returns [1]"},
                      {"label": "f(2)", "value": "lst is still [1] from previous call. append(2) → [1,2]. Returns [1,2]"}],
            "remember": "Never use mutable defaults: def f(x, lst=None): if lst is None: lst = []",
            "concept": "Python mutable default argument gotcha.",
        },
    },
]


def generate_cs_concepts(difficulty="easy", seed=42):
    rng      = random.Random(seed)
    filtered = [q for q in _CS_POOL if q["difficulty"] == difficulty]
    if not filtered:
        filtered = _CS_POOL
    item = rng.choice(filtered)
    opts = {k: v for k, v in item["options"].items()}
    keys = list(opts.keys())
    rng.shuffle(keys)
    orig_keys   = list(item["options"].keys())
    shuffled    = {keys[i]: item["options"][orig_keys[i]] for i in range(len(keys))}
    correct_val = item["options"][item["correct_option"]]
    cor_lbl     = next(k for k, v in shuffled.items() if v == correct_val)
    return {
        "question":       item["question"],
        "options":        shuffled,
        "correct_option": cor_lbl,
        "explanation":    item.get("explanation", {}),
        "metadata": {
            "topic":      "cs_concepts",
            "sub_type":   item.get("sub_type", "concept_mcq"),
            "difficulty": difficulty,
            "seed":       seed,
        },
    }


# ─────────────────────────────────────────────────────────────────────────────
# PUBLIC API — called by assembler
# ─────────────────────────────────────────────────────────────────────────────

_TOPIC_DISPATCH = {
    "output_prediction": generate_output_prediction,
    "time_complexity":   generate_time_complexity,
    "cs_concepts":       generate_cs_concepts,
}


def generate(topic: str, difficulty: str = "easy", seed: int = 42) -> dict:
    """
    Main entry point called by assembler.
    topic: "output_prediction" | "time_complexity" | "cs_concepts"
    """
    fn = _TOPIC_DISPATCH.get(topic)
    if fn is None:
        return None
    result = fn(difficulty=difficulty, seed=seed)
    if result and "metadata" in result:
        result["metadata"]["seed"] = seed
        result["metadata"]["difficulty"] = difficulty
    return result


# ─────────────────────────────────────────────────────────────────────────────
# LOCAL TEST
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import json
    print("=" * 60)
    print("  TCS CODING ENGINE — QUICK TEST")
    print("=" * 60)
    for topic in ["output_prediction", "time_complexity", "cs_concepts"]:
        for diff in ["easy", "medium", "hard"]:
            q = generate(topic, diff, seed=42)
            if q:
                preview = q["question"][:80].replace("\n", " ")
                print(f"  [{topic}/{diff}]  {preview}...")
                print(f"    Correct: {q['correct_option']} = {q['options'][q['correct_option']]}")
            else:
                print(f"  [{topic}/{diff}]  NONE")
    print()
    print("Seed stability test (same seed = same question):")
    a = generate("output_prediction", "easy", seed=1001)
    b = generate("output_prediction", "easy", seed=1001)
    print(f"  seed=1001 stable: {a['correct_option'] == b['correct_option']}")
    c = generate("output_prediction", "easy", seed=2002)
    print(f"  seed=2002 differs from 1001: {a['options'] != c['options']}")
