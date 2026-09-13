# -*- coding: utf-8 -*-
"""
tcs_nqt.py  —  TCS NQT exam blueprint.
========================================
Official pattern (2024):
  Numerical Ability      26 Qs  40 min
  Verbal Ability         24 Qs  30 min
  Reasoning Ability      30 Qs  50 min
  Programming Logic MCQ  10 Qs  15 min
  ─────────────────────────────────────
  Total MCQ              90 Qs 135 min
  (Coding problems: 2 Qs, 45 min — out of scope for MCQ platform)

topic keys under each section map to generate_<topic>() calls in the engine layer.
Topics that reuse mocktest-platform-style quant/reasoning/english engines are
noted; topics marked [new] are served by tcs_coding_engine.py.
"""

EXAM_CONFIG = {
    "exam_id":   "tcs_nqt",
    "name":      "TCS NQT — National Qualifier Test",
    "body":      "Tata Consultancy Services",
    "country":   "India",
    "total_questions":  90,
    "total_time_mins": 135,
    "correct_marks":   1.00,
    "negative_marks": -0.33,

    "sections": [
        {
            "id":       "numerical_ability",
            "label":    "Numerical Ability",
            "time_mins": 40,
            "topics": [
                # count, easy, medium, hard
                {"topic": "simplification",           "count": 5, "easy": 3, "medium": 2, "hard": 0},
                {"topic": "number_series",            "count": 5, "easy": 2, "medium": 2, "hard": 1},
                {"topic": "data_interpretation",      "count": 5, "easy": 2, "medium": 2, "hard": 1},
                {"topic": "percentage",               "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "profit_loss",              "count": 2, "easy": 0, "medium": 2, "hard": 0},
                {"topic": "time_work",                "count": 2, "easy": 0, "medium": 2, "hard": 0},
                {"topic": "time_speed_distance",      "count": 2, "easy": 0, "medium": 1, "hard": 1},
                {"topic": "simple_compound_interest", "count": 2, "easy": 0, "medium": 2, "hard": 0},
            ],
        },
        {
            "id":       "verbal_ability",
            "label":    "Verbal Ability",
            "time_mins": 30,
            "topics": [
                {"topic": "reading_comprehension", "count": 6, "easy": 3, "medium": 3, "hard": 0},
                {"topic": "error_detection",       "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "fill_in_the_blanks",    "count": 4, "easy": 3, "medium": 1, "hard": 0},
                {"topic": "vocabulary",            "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "para_jumbles",          "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "cloze_test",            "count": 3, "easy": 2, "medium": 1, "hard": 0},
            ],
        },
        {
            "id":       "reasoning_ability",
            "label":    "Reasoning Ability",
            "time_mins": 50,
            "topics": [
                {"topic": "coding_decoding",            "count": 5, "easy": 3, "medium": 2, "hard": 0},
                {"topic": "seating_arrangement_linear", "count": 5, "easy": 2, "medium": 2, "hard": 1},
                {"topic": "blood_relations",            "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "syllogism",                  "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "direction_sense",            "count": 3, "easy": 2, "medium": 1, "hard": 0},
                {"topic": "analogy",                    "count": 5, "easy": 3, "medium": 2, "hard": 0},
                {"topic": "series_completion",          "count": 5, "easy": 3, "medium": 1, "hard": 1},
            ],
        },
        {
            "id":       "programming_logic",
            "label":    "Programming Logic",
            "time_mins": 15,
            "topics": [
                # [new] — served by tcs_coding_engine.py
                {"topic": "output_prediction", "count": 4, "easy": 2, "medium": 2, "hard": 0},
                {"topic": "time_complexity",   "count": 3, "easy": 1, "medium": 2, "hard": 0},
                {"topic": "cs_concepts",       "count": 3, "easy": 1, "medium": 2, "hard": 0},
            ],
        },
    ],
}
