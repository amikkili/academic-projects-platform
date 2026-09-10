from __future__ import annotations
import re
import random
from .skill_bullets import SKILL_BULLETS, ALIASES


def _normalise(skill: str) -> str:
    key = skill.lower().strip()
    key = re.sub(r"\s+", " ", key)
    return ALIASES.get(key, key)


def _years_to_tier(years: float) -> str:
    if years < 1:
        return "fresher"
    if years < 3:
        return "junior"
    if years < 6:
        return "mid"
    return "senior"


def generate_bullets(
    skills: list[str],
    years_exp: float,
    max_bullets: int = 10,
    user_seed: int | None = None,
) -> dict:
    """
    Generate resume bullets for the given skills and experience level.

    user_seed — pass the logged-in user's DB id.
      Same seed  → same shuffled order (reproducible per user).
      Different seeds → different bullet subsets from the same pool,
      so two users with identical skills won't get identical output.
      None → random (anonymous / unauthenticated users).

    Returns:
      { tier, matched, unmatched, bullets, summary }
    """
    tier = _years_to_tier(years_exp)

    matched: list[str] = []
    unmatched: list[str] = []
    per_skill: dict[str, list[str]] = {}

    for raw in skills:
        key = _normalise(raw)
        if key in SKILL_BULLETS:
            matched.append(raw)
            bullets = list(SKILL_BULLETS[key].get(tier, []))
            if not bullets:
                for fallback in ("mid", "junior", "fresher"):
                    bullets = list(SKILL_BULLETS[key].get(fallback, []))
                    if bullets:
                        break

            # Seed = user_id + skill key → each skill shuffles independently
            # across users, but reproducibly for the same user.
            rng = random.Random(f"{user_seed}_{key}" if user_seed is not None else None)
            rng.shuffle(bullets)
            per_skill[raw] = bullets
        else:
            unmatched.append(raw)

    # Pick evenly from each skill, then fill remainder
    seen: set[str] = set()
    max_per_skill = max(1, max_bullets // max(len(per_skill), 1))
    selected: list[str] = []

    for bullets in per_skill.values():
        count = 0
        for b in bullets:
            if b not in seen and count < max_per_skill:
                seen.add(b)
                selected.append(b)
                count += 1

    if len(selected) < max_bullets:
        for bullets in per_skill.values():
            for b in bullets:
                if b not in seen:
                    seen.add(b)
                    selected.append(b)
                    if len(selected) >= max_bullets:
                        break
            if len(selected) >= max_bullets:
                break

    return {
        "tier": tier,
        "matched": matched,
        "unmatched": unmatched,
        "bullets": selected[:max_bullets],
        "summary": _generate_summary(matched, tier, years_exp),
    }


def _generate_summary(skills: list[str], tier: str, years_exp: float) -> str:
    if not skills:
        return ""

    skill_str = ", ".join(skills[:5])
    if len(skills) > 5:
        skill_str += f" and {len(skills) - 5} more"

    if tier == "fresher":
        return (
            f"Recent engineering graduate with hands-on academic project experience in {skill_str}. "
            "Passionate about building practical solutions and eager to contribute to real-world engineering teams."
        )
    if tier == "junior":
        return (
            f"Software engineer with {years_exp:.0f}+ year(s) of professional experience in {skill_str}. "
            "Track record of delivering features independently with a focus on code quality and testing."
        )
    if tier == "mid":
        return (
            f"Software engineer with {years_exp:.0f}+ years of experience designing and delivering scalable solutions using {skill_str}. "
            "Proven ability to own complex technical problems end-to-end and mentor junior team members."
        )
    return (
        f"Senior engineer with {years_exp:.0f}+ years of experience architecting high-performance systems using {skill_str}. "
        "Consistent record of technical leadership, cross-team collaboration, and measurable business impact."
    )
