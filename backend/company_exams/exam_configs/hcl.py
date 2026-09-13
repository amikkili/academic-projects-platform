# -*- coding: utf-8 -*-
"""
hcl.py  —  HCL Online Aptitude Test blueprint.
================================================
Official pattern (2024):
  Numerical Ability     15 Qs  20 min
  Verbal Ability        15 Qs  20 min
  Logical Reasoning     20 Qs  25 min
  Technical MCQ         10 Qs  15 min
  ──────────────────────────────────────
  Total                 60 Qs  80 min

Marking: +1 correct, 0 wrong (no negative marking).
"""

EXAM_CONFIG = {
    "exam_id":   "hcl",
    "name":      "HCL Online Aptitude Test",
    "body":      "HCL Technologies",
    "country":   "India",
    "total_questions":  60,
    "total_time_mins":  80,
    "correct_marks":    1.00,
    "negative_marks":   0.00,

    "sections": [
        {
            "id":        "numerical_ability",
            "label":     "Numerical Ability",
            "time_mins":  20,
            "topics": [
                {"topic": "simplification",      "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "number_series",       "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "percentage",          "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "profit_loss",         "count": 3, "easy": 0, "medium": 2, "hard": 1},
                {"topic": "time_work",           "count": 3, "easy": 0, "medium": 2, "hard": 1},
            ],
        },
        {
            "id":        "verbal_ability",
            "label":     "Verbal Ability",
            "time_mins":  20,
            "topics": [
                {"topic": "reading_comprehension", "count": 5, "easy": 3, "medium": 2, "hard": 0},
                {"topic": "error_detection",       "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "vocabulary",            "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "fill_in_the_blanks",    "count": 3, "easy": 2, "medium": 1, "hard": 0},
            ],
        },
        {
            "id":        "reasoning_ability",
            "label":     "Logical Reasoning",
            "time_mins":  25,
            "topics": [
                {"topic": "analogy",                    "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "coding_decoding",            "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "seating_arrangement_linear", "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "blood_relations",            "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "syllogism",                  "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "direction_sense",            "count": 3, "easy": 2, "medium": 1, "hard": 0},
            ],
        },
        {
            "id":        "programming_logic",
            "label":     "Technical MCQ",
            "time_mins":  15,
            "topics": [
                {"topic": "output_prediction", "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "time_complexity",   "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "cs_concepts",       "count": 3, "easy": 1, "medium": 2, "hard": 0},
            ],
        },
    ],
}
