from Person import Person
import json

nutritions_values = [
    "Calories",
    "FatContent",
    "SaturatedFatContent",
    "CholesterolContent",
    "SodiumContent",
    "CarbohydrateContent",
    "FiberContent",
    "SugarContent",
    "ProteinContent",
]
age = 22
height = 165
weight = 55
gender = "Male"
activity = "Light exercise"
# option = "Maintain weight"
weight_loss = 1
number_of_meals = 3
if number_of_meals == 3:
    meals_calories_perc = {"breakfast": 0.35, "lunch": 0.40, "dinner": 0.25}
elif number_of_meals == 4:
    meals_calories_perc = {
        "breakfast": 0.30,
        "morning snack": 0.05,
        "lunch": 0.40,
        "dinner": 0.25,
    }
else:
    meals_calories_perc = {
        "breakfast": 0.30,
        "morning snack": 0.05,
        "lunch": 0.40,
        "afternoon snack": 0.05,
        "dinner": 0.20,
    }
generated = True
if generated:
    person = Person(
        age, height, weight, gender, activity, meals_calories_perc, weight_loss
    )
    recommendations = person.generate_recommendations()
    meal_of_day = []
    index = 0
    for meal in recommendations:
        values_subsets = []
        for re in meal:
            list_key = list(re.keys())
            values_subset = {key: re[key] for key in list_key[0:2] + list_key[16:25]}
            values_subsets.append(values_subset)
        meal_of_day.append(values_subsets)
    for i in meal_of_day:
        print("")
        print("--------", list(meals_calories_perc.keys())[index], "--------------")
        index = index + 1
        for j in i:
            print("")
            print(j)
