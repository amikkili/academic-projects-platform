import random
from .concept_questions import CONCEPT_QA

# Maps project-id → [(concept_key, weight), ...]
# weight controls how many questions are drawn from each concept
PROJECT_CONCEPTS = {
    'sentiment-analysis': [
        ('lstm', 3),
        ('word_embeddings', 2),
        ('nlp_preprocessing', 2),
    ],
    'student-result-portal': [
        ('rest_api', 3),
        ('jwt_auth', 2),
        ('mongodb', 2),
    ],
    'smart-irrigation': [
        ('mqtt', 3),
        ('iot_sensors', 2),
        ('nodemcu_esp8266', 2),
    ],
    'house-price-prediction': [
        ('linear_regression', 3),
        ('cross_validation', 2),
        ('feature_engineering', 1),
    ],
    'network-intrusion-detection': [
        ('xgboost', 3),
        ('network_security', 2),
        ('classification_metrics', 1),
    ],
    'face-recognition-attendance': [
        ('face_recognition_dlib', 3),
        ('opencv', 2),
        ('flask_web', 1),
        ('sqlite_mobile', 1),
    ],
    'library-management': [
        ('spring_boot', 3),
        ('jpa_hibernate', 2),
        ('mysql_db', 2),
        ('oop_java', 1),
    ],
    'expense-tracker-app': [
        ('flutter_dart', 3),
        ('sqlite_mobile', 2),
    ],
}

# Fallback for unknown concepts (not in CONCEPT_QA)
_FALLBACK_QA = [
    {
        "q": "Can you explain what this project does at a high level?",
        "a": "Describe the problem the project solves, the main technologies used, and how data flows through the system from input to output.",
        "concept": "general",
        "difficulty": "easy",
    }
]


def generate_viva(project_id: str, difficulty: str, count: int, user_seed: str) -> list[dict]:
    """
    Generate `count` viva Q&As for `project_id` at `difficulty` level.

    Args:
        project_id:  slug matching PROJECT_CONCEPTS (e.g. 'sentiment-analysis')
        difficulty:  'easy' | 'medium' | 'hard'
        count:       total number of Q&As to return (capped at available pool size)
        user_seed:   any string unique to the student (e.g. email or name)

    Returns:
        List of dicts: { q, a, concept, difficulty }
    """
    if difficulty not in ('easy', 'medium', 'hard'):
        difficulty = 'easy'

    concepts = PROJECT_CONCEPTS.get(project_id, [])
    if not concepts:
        return _FALLBACK_QA[:count]

    # ── 1. Build weighted pool ────────────────────────────────────────────────
    # For each (concept, weight): draw `weight` questions from the difficulty tier.
    # If the tier has fewer than `weight` questions, take what's available.
    pool: list[dict] = []

    for concept, weight in concepts:
        tier_questions = CONCEPT_QA.get(concept, {}).get(difficulty, [])
        if not tier_questions:
            # Fall back to 'easy' if the requested tier is empty for this concept
            tier_questions = CONCEPT_QA.get(concept, {}).get('easy', [])

        if not tier_questions:
            continue

        # Seeded shuffle so the same user always sees the same subset
        rng = random.Random(f"{user_seed}_{concept}_{difficulty}")
        shuffled = tier_questions.copy()
        rng.shuffle(shuffled)

        drawn = shuffled[:weight]
        for qa in drawn:
            pool.append({
                "q": qa["q"],
                "a": qa["a"],
                "concept": concept.replace('_', ' ').title(),
                "difficulty": difficulty,
            })

    # ── 2. Shuffle the combined pool with the same seed ───────────────────────
    master_rng = random.Random(f"{user_seed}_{project_id}_{difficulty}_order")
    master_rng.shuffle(pool)

    # ── 3. Return up to `count` questions ─────────────────────────────────────
    return pool[:count] if pool else _FALLBACK_QA[:count]
