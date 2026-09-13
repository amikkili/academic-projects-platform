# -*- coding: utf-8 -*-
"""
wipro.py  —  Wipro NLTH (National Level Talent Hunt) blueprint.
================================================================
Official pattern (2024):
  Verbal Ability                  18 Qs  18 min
  Analytical & Logical Reasoning  18 Qs  18 min
  Quantitative Aptitude           12 Qs  12 min
  ───────────────────────────────────────────────
  Total MCQ                       48 Qs  48 min
  (Written communication + coding round: out of scope for MCQ platform)

Marking: +1 correct, 0 wrong (no negative marking).
"""

EXAM_CONFIG = {
    "exam_id":   "wipro_nlth",
    "name":      "Wipro NLTH — Online Aptitude Test",
    "body":      "Wipro Limited",
    "country":   "India",
    "total_questions":  48,
    "total_time_mins":  48,
    "correct_marks":    1.00,
    "negative_marks":   0.00,

    "sections": [
        {
            "id":        "verbal_ability",
            "label":     "Verbal Ability",
            "time_mins":  18,
            "topics": [
                {"topic": "reading_comprehension", "count": 5, "easy": 3, "medium": 2, "hard": 0},
                {"topic": "error_detection",       "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "fill_in_the_blanks",    "count": 4, "easy": 3, "medium": 1, "hard": 0},
                {"topic": "vocabulary",            "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "para_jumbles",          "count": 2, "easy": 1, "medium": 1, "hard": 0},
            ],
        },
        {
            "id":        "reasoning_ability",
            "label":     "Analytical & Logical Reasoning",
            "time_mins":  18,
            "topics": [
                {"topic": "analogy",                    "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "coding_decoding",            "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "series_completion",          "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "seating_arrangement_linear", "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "syllogism",                  "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "direction_sense",            "count": 3, "easy": 2, "medium": 1, "hard": 0},
            ],
        },
        {
            "id":        "numerical_ability",
            "label":     "Quantitative Aptitude",
            "time_mins":  12,
            "topics": [
                {"topic": "simplification",           "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "percentage",               "count": 2, "easy": 1, "medium": 1, "hard": 0},
                {"topic": "time_speed_distance",      "count": 2, "easy": 1, "medium": 1, "hard": 0},
                {"topic": "time_work",                "count": 2, "easy": 1, "medium": 1, "hard": 0},
                {"topic": "simple_compound_interest", "count": 2, "easy": 1, "medium": 1, "hard": 0},
                {"topic": "profit_loss",              "count": 1, "easy": 0, "medium": 1, "hard": 0},
            ],
        },
    ],
}
