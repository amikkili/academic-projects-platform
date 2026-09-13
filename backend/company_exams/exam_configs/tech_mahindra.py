# -*- coding: utf-8 -*-
"""
tech_mahindra.py  —  Tech Mahindra Online Assessment blueprint.
================================================================
Official pattern (2024):
  Quantitative Aptitude   25 Qs  30 min
  Logical Reasoning       25 Qs  30 min
  English Language        25 Qs  20 min
  ──────────────────────────────────────
  Total                   75 Qs  80 min

Marking: +1 correct, 0 wrong (no negative marking).
"""

EXAM_CONFIG = {
    "exam_id":   "tech_mahindra",
    "name":      "Tech Mahindra Online Assessment",
    "body":      "Tech Mahindra Limited",
    "country":   "India",
    "total_questions":  75,
    "total_time_mins":  80,
    "correct_marks":    1.00,
    "negative_marks":   0.00,

    "sections": [
        {
            "id":        "numerical_ability",
            "label":     "Quantitative Aptitude",
            "time_mins":  30,
            "topics": [
                {"topic": "simplification",           "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "number_series",            "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "percentage",               "count": 4, "easy": 1, "medium": 2, "hard": 1},
                {"topic": "profit_loss",              "count": 3, "easy": 0, "medium": 2, "hard": 1},
                {"topic": "time_work",                "count": 4, "easy": 1, "medium": 2, "hard": 1},
                {"topic": "time_speed_distance",      "count": 3, "easy": 0, "medium": 2, "hard": 1},
                {"topic": "data_interpretation",      "count": 3, "easy": 1, "medium": 2, "hard": 0},
            ],
        },
        {
            "id":        "reasoning_ability",
            "label":     "Logical Reasoning",
            "time_mins":  30,
            "topics": [
                {"topic": "analogy",                    "count": 5, "easy": 2, "medium": 3, "hard": 0},
                {"topic": "coding_decoding",            "count": 5, "easy": 2, "medium": 3, "hard": 0},
                {"topic": "seating_arrangement_linear", "count": 4, "easy": 1, "medium": 2, "hard": 1},
                {"topic": "blood_relations",            "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "syllogism",                  "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "direction_sense",            "count": 3, "easy": 1, "medium": 2, "hard": 0},
            ],
        },
        {
            "id":        "verbal_ability",
            "label":     "English Language",
            "time_mins":  20,
            "topics": [
                {"topic": "reading_comprehension", "count": 6, "easy": 3, "medium": 3, "hard": 0},
                {"topic": "error_detection",       "count": 5, "easy": 2, "medium": 3, "hard": 0},
                {"topic": "fill_in_the_blanks",    "count": 5, "easy": 2, "medium": 3, "hard": 0},
                {"topic": "vocabulary",            "count": 5, "easy": 2, "medium": 3, "hard": 0},
                {"topic": "para_jumbles",          "count": 2, "easy": 1, "medium": 1, "hard": 0},
                {"topic": "cloze_test",            "count": 2, "easy": 1, "medium": 1, "hard": 0},
            ],
        },
    ],
}
