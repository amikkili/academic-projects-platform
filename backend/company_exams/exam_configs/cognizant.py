# -*- coding: utf-8 -*-
"""
cognizant.py  —  Cognizant CCAT (Corporate Aptitude Test) blueprint.
======================================================================
Official pattern (2024):
  Reasoning Aptitude     16 Qs  25 min
  Verbal Ability         22 Qs  25 min
  Applied Mathematics    16 Qs  35 min
  Attention to Detail    12 Qs  10 min
  ──────────────────────────────────────
  Total                  66 Qs  95 min

Marking: +1 correct, 0 wrong (no negative marking).
"""

EXAM_CONFIG = {
    "exam_id":   "cognizant_ccat",
    "name":      "Cognizant CCAT — Corporate Aptitude Test",
    "body":      "Cognizant Technology Solutions",
    "country":   "India",
    "total_questions":  66,
    "total_time_mins":  95,
    "correct_marks":    1.00,
    "negative_marks":   0.00,

    "sections": [
        {
            "id":        "reasoning_ability",
            "label":     "Reasoning Aptitude",
            "time_mins":  25,
            "topics": [
                {"topic": "coding_decoding",            "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "analogy",                    "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "syllogism",                  "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "direction_sense",            "count": 2, "easy": 1, "medium": 1, "hard": 0},
                {"topic": "blood_relations",            "count": 2, "easy": 1, "medium": 1, "hard": 0},
            ],
        },
        {
            "id":        "verbal_ability",
            "label":     "Verbal Ability",
            "time_mins":  25,
            "topics": [
                {"topic": "reading_comprehension", "count": 6, "easy": 3, "medium": 3, "hard": 0},
                {"topic": "error_detection",       "count": 5, "easy": 3, "medium": 2, "hard": 0},
                {"topic": "fill_in_the_blanks",    "count": 5, "easy": 3, "medium": 2, "hard": 0},
                {"topic": "vocabulary",            "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "para_jumbles",          "count": 2, "easy": 1, "medium": 1, "hard": 0},
            ],
        },
        {
            "id":        "numerical_ability",
            "label":     "Applied Mathematics",
            "time_mins":  35,
            "topics": [
                {"topic": "data_interpretation",      "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "number_series",            "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "percentage",               "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "profit_loss",              "count": 2, "easy": 0, "medium": 2, "hard": 0},
                {"topic": "time_work",                "count": 2, "easy": 0, "medium": 2, "hard": 0},
                {"topic": "simple_compound_interest", "count": 2, "easy": 0, "medium": 2, "hard": 0},
            ],
        },
        {
            "id":        "attention_to_detail",
            "label":     "Attention to Detail",
            "time_mins":  10,
            "topics": [
                {"topic": "simplification", "count": 5, "easy": 3, "medium": 2, "hard": 0},
                {"topic": "number_series",  "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "coding_decoding","count": 3, "easy": 2, "medium": 1, "hard": 0},
            ],
        },
    ],
}
