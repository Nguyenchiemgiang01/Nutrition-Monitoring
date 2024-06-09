from random import uniform as rnd
from .Gennerator import Generator
import pandas as pd


class Person:

    def __init__(
        self,
        age,
        height,
        weight,
        gender,
        name_diseases,
        meals_calories_perc,
        df_diseases,
        goal,
        dataset,
    ):
        self.age = age
        self.height = height
        self.weight = weight
        self.gender = gender
        self.name_diseases = name_diseases if name_diseases is not None else None
        self.meals_calories_perc = meals_calories_perc
        self.df = df_diseases
        self.goal = goal if goal is not None else 0
        self.dataset = dataset

    def calculate_bmi(
        self,
    ):
        bmi = round(self.weight / ((self.height / 100) ** 2), 2)
        return bmi

    def calculate_bmr(self):
        if self.gender == "Male":
            bmr = 10 * self.weight + 6.25 * self.height - 5 * self.age + 5
        else:
            bmr = 10 * self.weight + 6.25 * self.height - 5 * self.age - 161
        return bmr

    def calories_calculator(self):
        maintain_calories = self.calculate_bmr()
        return maintain_calories

    def init_nutrition_base_disease(self, name):
        nutritions_values = [
            "Disease",
            "Total Fat",
            "Cholesterol",
            "Sodium",
            "Carbs",
            "Fiber",
            "Sugar",
            "Protein",
        ]
        dataframe = self.df[nutritions_values]
        data = dataframe.loc[dataframe["Disease"] == name]
        values_init = data.iloc[0, 1:].tolist()
        return values_init

    def generate_recommendations(self):
        total_calories = self.goal if self.goal != 0 else self.calories_calculator()
        rands = [
            rnd(10, 30),
            rnd(0, 30),
            rnd(0, 400),
            rnd(40, 75),
            rnd(4, 10),
            rnd(0, 10),
            rnd(30, 100),
        ]
        recommendations = []
        for meal in self.meals_calories_perc:
            meal_calories = self.meals_calories_perc[meal] * total_calories
            if self.name_diseases != "":
                init = self.init_nutrition_base_disease(self.name_diseases)
            else:
                init = rands
            recommended_nutrition = [meal_calories] + init
            generator = Generator(self.dataset, recommended_nutrition)
            recommended_recipes = generator.generate()["output"]
            recommendations.append(recommended_recipes)
        return recommendations
