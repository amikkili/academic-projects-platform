# -*- coding: utf-8 -*-
"""
infosys.py  —  Infosys Online Assessment blueprint.
=====================================================
Official pattern (2024):
  Quantitative Aptitude           10 Qs  35 min
  Reasoning & Logical Ability     15 Qs  25 min
  Verbal Ability                  20 Qs  20 min
  Programming Concepts             5 Qs  10 min
  ───────────────────────────────────────────────
  Total MCQ                       50 Qs  90 min
  (Pseudo-code / coding round: separate, out of scope)

Marking: +1 correct, 0 wrong (no negative marking).
"""

EXAM_CONFIG = {
    "exam_id":   "infosys",
    "name":      "Infosys Online Assessment",
    "body":      "Infosys Limited",
    "country":   "India",
    "total_questions":  50,
    "total_time_mins":  90,
    "correct_marks":    1.00,
    "negative_marks":   0.00,

    "sections": [
        {
            "id":        "numerical_ability",
            "label":     "Quantitative Aptitude",
            "time_mins":  35,
            "topics": [
                {"topic": "number_series",            "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "data_interpretation",      "count": 2, "easy": 1, "medium": 1, "hard": 0},
                {"topic": "percentage",               "count": 2, "easy": 1, "medium": 1, "hard": 0},
                {"topic": "profit_loss",              "count": 1, "easy": 0, "medium": 1, "hard": 0},
                {"topic": "time_work",                "count": 2, "easy": 1, "medium": 1, "hard": 0},
            ],
        },
        {
            "id":        "reasoning_ability",
            "label":     "Reasoning & Logical Ability",
            "time_mins":  25,
            "topics": [
                {"topic": "analogy",                    "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "coding_decoding",            "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "seating_arrangement_linear", "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "blood_relations",            "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "direction_sense",            "count": 3, "easy": 2, "medium": 1, "hard": 0},
            ],
        },
        {
            "id":        "verbal_ability",
            "label":     "Verbal Ability",
            "time_mins":  20,
            "topics": [
                {"topic": "reading_comprehension", "count": 5, "easy": 3, "medium": 2, "hard": 0},
                {"topic": "fill_in_the_blanks",    "count": 5, "easy": 3, "medium": 2, "hard": 0},
                {"topic": "error_detection",       "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "vocabulary",            "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "cloze_test",            "count": 2, "easy": 1, "medium": 1, "hard": 0},
            ],
        },
        {
            "id":        "programming_logic",
            "label":     "Programming Concepts",
            "time_mins":  10,
            "topics": [
                {"topic": "output_prediction", "count": 2, "easy": 1, "medium": 1, "hard": 0},
                {"topic": "time_complexity",   "count": 2, "easy": 1, "medium": 1, "hard": 0},
                {"topic": "cs_concepts",       "count": 1, "easy": 1, "medium": 0, "hard": 0},
            ],
        },
    ],
}
