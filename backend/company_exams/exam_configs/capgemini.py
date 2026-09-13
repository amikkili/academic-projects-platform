# -*- coding: utf-8 -*-
"""
capgemini.py  —  Capgemini AMCAT-powered Online Assessment blueprint.
=======================================================================
Official pattern (2024):
  Quantitative Aptitude   16 Qs  16 min
  Logical Ability         14 Qs  14 min
  Verbal Ability          18 Qs  18 min
  Pseudo Code             10 Qs  15 min
  ──────────────────────────────────────
  Total                   58 Qs  63 min

Marking: +1 correct, 0 wrong (no negative marking).
"""

EXAM_CONFIG = {
    "exam_id":   "capgemini",
    "name":      "Capgemini Online Assessment",
    "body":      "Capgemini SE",
    "country":   "India",
    "total_questions":  58,
    "total_time_mins":  63,
    "correct_marks":    1.00,
    "negative_marks":   0.00,

    "sections": [
        {
            "id":        "numerical_ability",
            "label":     "Quantitative Aptitude",
            "time_mins":  16,
            "topics": [
                {"topic": "simplification",           "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "percentage",               "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "number_series",            "count": 2, "easy": 1, "medium": 1, "hard": 0},
                {"topic": "profit_loss",              "count": 2, "easy": 0, "medium": 2, "hard": 0},
                {"topic": "time_work",                "count": 2, "easy": 0, "medium": 2, "hard": 0},
                {"topic": "time_speed_distance",      "count": 2, "easy": 0, "medium": 1, "hard": 1},
                {"topic": "simple_compound_interest", "count": 2, "easy": 0, "medium": 2, "hard": 0},
            ],
        },
        {
            "id":        "reasoning_ability",
            "label":     "Logical Ability",
            "time_mins":  14,
            "topics": [
                {"topic": "analogy",                    "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "coding_decoding",            "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "series_completion",          "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "seating_arrangement_linear", "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "direction_sense",            "count": 2, "easy": 1, "medium": 1, "hard": 0},
            ],
        },
        {
            "id":        "verbal_ability",
            "label":     "Verbal Ability",
            "time_mins":  18,
            "topics": [
                {"topic": "reading_comprehension", "count": 5, "easy": 3, "medium": 2, "hard": 0},
                {"topic": "fill_in_the_blanks",    "count": 4, "easy": 3, "medium": 1, "hard": 0},
                {"topic": "error_detection",       "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "vocabulary",            "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "cloze_test",            "count": 2, "easy": 1, "medium": 1, "hard": 0},
            ],
        },
        {
            "id":        "programming_logic",
            "label":     "Pseudo Code",
            "time_mins":  15,
            "topics": [
                {"topic": "output_prediction", "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "time_complexity",   "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "cs_concepts",       "count": 3, "easy": 1, "medium": 2, "hard": 0},
            ],
        },
    ],
}
