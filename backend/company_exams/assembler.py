# -*- coding: utf-8 -*-
"""
assembler.py  —  Builds a full company exam paper for one student.
===================================================================
Usage:
    from backend.company_exams.assembler import build_paper
    paper = build_paper(exam_id="tcs_nqt", master_seed="STUDENT-42")

Returns a structured paper dict with all sections and questions ready
to send to the frontend.

Seed derivation:
    child_seed = SHA256(master_seed + section + topic + index) % 10^9
    Same student key → same paper every time (deterministic).
    Different keys → different papers (randomised).

Engine dispatch:
    programming_logic section → tcs_coding_engine.generate(topic, diff, seed)
    quant / verbal / reasoning → mocktest-platform engine_router.route()
"""

import hashlib
import sys
import os

_HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, _HERE)

# ── mocktest-platform engine router (quant / verbal / reasoning) ──────────────
_MOCKTEST_SHUFFLERS = os.path.normpath(
    os.path.join(_HERE, "..", "..", "..", "mocktest-platform", "backend", "shufflers")
)
if _MOCKTEST_SHUFFLERS not in sys.path:
    sys.path.insert(0, _MOCKTEST_SHUFFLERS)

try:
    from engine_router import route as _mt_route
    _MT_ENGINES_AVAILABLE = True
except ImportError:
    _MT_ENGINES_AVAILABLE = False

from exam_configs.tcs_nqt      import EXAM_CONFIG as _TCS_NQT_CONFIG
from exam_configs.infosys      import EXAM_CONFIG as _INFOSYS_CONFIG
from exam_configs.wipro        import EXAM_CONFIG as _WIPRO_CONFIG
from exam_configs.cognizant    import EXAM_CONFIG as _COGNIZANT_CONFIG
from exam_configs.capgemini    import EXAM_CONFIG as _CAPGEMINI_CONFIG
from exam_configs.accenture    import EXAM_CONFIG as _ACCENTURE_CONFIG
from exam_configs.hcl          import EXAM_CONFIG as _HCL_CONFIG
from exam_configs.tech_mahindra import EXAM_CONFIG as _TECH_MAHINDRA_CONFIG
from engines.tcs_coding_engine import generate as _coding_generate

_EXAM_REGISTRY = {
    "tcs_nqt":       _TCS_NQT_CONFIG,
    "infosys":       _INFOSYS_CONFIG,
    "wipro_nlth":    _WIPRO_CONFIG,
    "cognizant_ccat": _COGNIZANT_CONFIG,
    "capgemini":     _CAPGEMINI_CONFIG,
    "accenture":     _ACCENTURE_CONFIG,
    "hcl":           _HCL_CONFIG,
    "tech_mahindra": _TECH_MAHINDRA_CONFIG,
}


_DIFFICULTY_CHOICES = ["easy", "medium", "hard"]


def _derive_seed(master_seed: str, section: str, topic: str, index: int) -> int:
    """Deterministic child seed per question slot."""
    raw   = f"{master_seed}::{section}::{topic}::{index}"
    digest = hashlib.sha256(raw.encode()).digest()[:8]
    return int.from_bytes(digest, byteorder="big") % (10 ** 9)


def _pick_difficulty(easy: int, medium: int, hard: int, rng_index: int, master_seed: str, section: str, topic: str) -> str:
    """
    Pick difficulty for question slot `rng_index` based on the per-topic easy/medium/hard counts.
    Fills easy slots first, then medium, then hard.
    """
    thresholds = []
    for _ in range(easy):   thresholds.append("easy")
    for _ in range(medium): thresholds.append("medium")
    for _ in range(hard):   thresholds.append("hard")
    if rng_index < len(thresholds):
        return thresholds[rng_index]
    return "easy"


def _generate_placeholder(section: str, topic: str, difficulty: str, seed: int, index: int) -> dict:
    """
    Placeholder for topics whose engines are not yet built (quant/verbal/reasoning).
    Returns a minimal dict so the paper is always complete.
    Remove this once real engines are wired in.
    """
    return {
        "question":       f"[{topic.replace('_', ' ').title()}] Question {index} ({difficulty}) — engine coming soon.",
        "options":        {"A": "Option A", "B": "Option B", "C": "Option C", "D": "Option D"},
        "correct_option": "A",
        "explanation":    {"hint": "Engine not yet integrated.", "steps": [], "remember": "", "concept": topic},
        "metadata": {
            "topic": topic, "section": section, "difficulty": difficulty,
            "seed": seed, "index": index, "source": "placeholder",
        },
    }


def _generate_question(section_id: str, topic: str, difficulty: str, seed: int, index: int,
                       master_seed: str = "") -> dict:
    """Route question generation to the correct engine."""
    if section_id == "programming_logic":
        result = _coding_generate(topic=topic, difficulty=difficulty, seed=seed)
        if result:
            result["metadata"].update({"section": section_id, "index": index})
            return result

    if _MT_ENGINES_AVAILABLE:
        result = _mt_route(topic=topic, difficulty=difficulty, master_seed=master_seed, index=index)
        if result:
            result["metadata"].update({"section": section_id, "index": index})
            return result

    return _generate_placeholder(section_id, topic, difficulty, seed, index)


def build_paper(exam_id: str, master_seed: str) -> dict:
    """
    Build a complete exam paper for one student.

    Args:
        exam_id:     e.g. "tcs_nqt"
        master_seed: unique per student, e.g. "STUDENT-REG-2024-001"
                     or any string — same string always gives same paper.

    Returns:
        {
          "exam_id":      str,
          "master_seed":  str,
          "sections": [
            {
              "id":      str,
              "label":   str,
              "time_mins": int,
              "questions": [ {question, options, correct_option, explanation, metadata}, ... ]
            },
            ...
          ],
          "total_questions": int,
          "correct_marks":   float,
          "negative_marks":  float,
        }
    """
    config = _EXAM_REGISTRY.get(exam_id)
    if not config:
        raise ValueError(f"Unknown exam_id: '{exam_id}'. Available: {list(_EXAM_REGISTRY.keys())}")

    paper_sections = []
    global_index   = 0

    for section in config["sections"]:
        sec_id    = section["id"]
        questions = []
        q_index   = 0

        for topic_entry in section["topics"]:
            topic  = topic_entry["topic"]
            count  = topic_entry["count"]
            easy_n = topic_entry.get("easy",   0)
            med_n  = topic_entry.get("medium", 0)
            hard_n = topic_entry.get("hard",   0)

            for slot in range(count):
                child_seed = _derive_seed(master_seed, sec_id, topic, global_index)
                difficulty = _pick_difficulty(easy_n, med_n, hard_n, slot, master_seed, sec_id, topic)
                q = _generate_question(sec_id, topic, difficulty, child_seed, global_index + 1, master_seed)
                questions.append(q)
                global_index += 1
                q_index      += 1

        paper_sections.append({
            "id":        sec_id,
            "label":     section["label"],
            "time_mins": section["time_mins"],
            "questions": questions,
        })

    return {
        "exam_id":         config["exam_id"],
        "name":            config["name"],
        "master_seed":     master_seed,
        "sections":        paper_sections,
        "total_questions": config["total_questions"],
        "correct_marks":   config["correct_marks"],
        "negative_marks":  config["negative_marks"],
    }


# ── Local test ────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import json

    print("Building TCS NQT paper for STUDENT-001...")
    paper = build_paper("tcs_nqt", "STUDENT-2024-001")

    print(f"  Exam:    {paper['name']}")
    print(f"  Seed:    {paper['master_seed']}")
    print(f"  Total Q: {sum(len(s['questions']) for s in paper['sections'])}")
    print()

    for sec in paper["sections"]:
        print(f"  [{sec['id']}] {sec['label']} — {len(sec['questions'])} questions, {sec['time_mins']} min")
        # show programming_logic in detail
        if sec["id"] == "programming_logic":
            for q in sec["questions"]:
                preview = q["question"][:70].replace("\n", " ")
                print(f"    Q{q['metadata']['index']}: [{q['metadata']['topic']}/{q['metadata']['difficulty']}]  {preview}...")

    print()
    print("Seed stability (same seed = same paper):")
    paper2 = build_paper("tcs_nqt", "STUDENT-2024-001")
    same = all(
        paper["sections"][s]["questions"][q]["correct_option"] ==
        paper2["sections"][s]["questions"][q]["correct_option"]
        for s in range(len(paper["sections"]))
        for q in range(len(paper["sections"][s]["questions"]))
    )
    print(f"  Identical papers: {same}")

    print()
    print("Different students get different programming_logic questions:")
    p1 = build_paper("tcs_nqt", "STUDENT-A")
    p2 = build_paper("tcs_nqt", "STUDENT-B")
    pl1 = [q["correct_option"] for q in p1["sections"][3]["questions"]]
    pl2 = [q["correct_option"] for q in p2["sections"][3]["questions"]]
    print(f"  Student A answers: {pl1}")
    print(f"  Student B answers: {pl2}")
    print(f"  Different: {pl1 != pl2}")
