from .person import Person


def init_nutrion_base_meal(number_meal):
    if number_meal == "3":
        meals_calories_perc = {"breakfast": 0.35, "lunch": 0.40, "dinner": 0.25}
    elif number_meal == "4":
        meals_calories_perc = {
            "breakfast": 0.30,
            "lunch": 0.40,
            "dinner": 0.25,
            "snack": 0.05,
        }
    else:
        meals_calories_perc = {
            "breakfast": 0.30,
            "snack": 0.05,
            "lunch": 0.40,
            "dinner": 0.20,
            "snack": 0.05,
            "uncategory": 0.05,
        }
    return meals_calories_perc


def gennerate(info, number_meal, df_diseases, goal, dataset):
    meals_calories_perc = init_nutrion_base_meal(number_meal)
    person = Person(
        info["age"],
        info["height"],
        info["weight"],
        info["gender"],
        info["name_diseases"],
        meals_calories_perc,
        df_diseases,
        goal,
        dataset,
    )
    recommendations = person.generate_recommendations()
    print("rec", recommendations)
    return recommendations
