# -*- coding: utf-8 -*-
"""
accenture.py  —  Accenture Cognitive Assessment blueprint.
===========================================================
Official pattern (2024):
  Quantitative Aptitude   15 Qs  25 min
  Verbal Ability          15 Qs  20 min
  Critical Reasoning      10 Qs  15 min
  ──────────────────────────────────────
  Total                   40 Qs  60 min

Marking: +1 correct, 0 wrong (no negative marking).
"""

EXAM_CONFIG = {
    "exam_id":   "accenture",
    "name":      "Accenture Cognitive Assessment",
    "body":      "Accenture",
    "country":   "India",
    "total_questions":  40,
    "total_time_mins":  60,
    "correct_marks":    1.00,
    "negative_marks":   0.00,

    "sections": [
        {
            "id":        "numerical_ability",
            "label":     "Quantitative Aptitude",
            "time_mins":  25,
            "topics": [
                {"topic": "percentage",               "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "profit_loss",              "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "data_interpretation",      "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "time_work",                "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "number_series",            "count": 3, "easy": 1, "medium": 2, "hard": 0},
            ],
        },
        {
            "id":        "verbal_ability",
            "label":     "Verbal Ability",
            "time_mins":  20,
            "topics": [
                {"topic": "reading_comprehension", "count": 5, "easy": 3, "medium": 2, "hard": 0},
                {"topic": "fill_in_the_blanks",    "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "error_detection",       "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "vocabulary",            "count": 3, "easy": 2, "medium": 1, "hard": 0},
            ],
        },
        {
            "id":        "reasoning_ability",
            "label":     "Critical Reasoning",
            "time_mins":  15,
            "topics": [
                {"topic": "analogy",         "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "coding_decoding", "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "syllogism",       "count": 2, "easy": 1, "medium": 1, "hard": 0},
                {"topic": "direction_sense", "count": 2, "easy": 1, "medium": 1, "hard": 0},
            ],
        },
    ],
}
