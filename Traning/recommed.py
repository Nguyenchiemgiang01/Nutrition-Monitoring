from Person import Person
import json
import pandas as pd


def init_nutrion_base_meal(number_meal):
    if number_meal == 3:
        meals_calories_perc = {"breakfast": 0.35, "lunch": 0.40, "dinner": 0.25}
    elif number_meal == 4:
        meals_calories_perc = {
            "breakfast": 0.30,
            "snack": 0.05,
            "lunch": 0.40,
            "dinner": 0.25,
        }
    else:
        meals_calories_perc = {
            "uncategory": 0.05,
            "breakfast": 0.30,
            "snack": 0.05,
            "lunch": 0.40,
            "dinner": 0.20,
        }
    return meals_calories_perc


def gennerate(info, number_meal):
    meals_calories_perc = init_nutrion_base_meal(number_meal)
    person = Person(
        info["age"],
        info["height"],
        info["weight"],
        info["gender"],
        info["name_diseases"],
        meals_calories_perc,
    )
    recommendations = person.generate_recommendations()
    return recommendations


info = {
    "age": 19,
    "height": 165,
    "weight": 55,
    "gender": "Male",
    "name_diseases": "Hypothyroidism",
}

data_info = DataInfo.load("/content/drive/MyDrive/model_path", model_name="ncf_model")

recommendations = gennerate(info, 4)
print(recommendations)


# meal_of_day = []
# index = 0
# for meal in recommendations:
#     values_subsets = []
#     for re in meal:
#         list_key = list(re.keys())
#         values_subset = {key: re[key] for key in list_key[0:2] + list_key[16:25]}
#         values_subsets.append(values_subset)
#     meal_of_day.append(values_subsets)
# for i in meal_of_day:
#     print("")
#     print("--------", list(meals_calories_perc.keys())[index], "--------------")
#     index = index + 1
#     for j in i:
#         print("")
#         print(j)
