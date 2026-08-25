def calculate_match(candidate_skills: str, required_skills: str):
    candidate_set = {
        skill.strip().lower()
        for skill in candidate_skills.split(",")
        if skill.strip()
    }

    required_set = {
        skill.strip().lower()
        for skill in required_skills.split(",")
        if skill.strip()
    }

    if not required_set:
        return 0

    matched_skills = candidate_set.intersection(required_set)

    match_percentage = (
                               len(matched_skills) / len(required_set)
                       ) * 100

    return round(match_percentage, 2)