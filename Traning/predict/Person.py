from random import uniform as rnd
from Gennerator import Generator
import pandas as pd


class Person:

    def __init__(self, age, height, weight, gender, name_diseases, meals_calories_perc):
        self.age = age
        self.height = height
        self.weight = weight
        self.gender = gender
        self.name_diseases = name_diseases
        self.meals_calories_perc = meals_calories_perc

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
        df = pd.read_csv("final_diseases.csv")
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
        df = df[nutritions_values]
        data = df.loc[df["Disease"] == name]
        values_init = data.iloc[0, 1:].tolist()
        return values_init

    def generate_recommendations(self):
        total_calories = self.calories_calculator()
        recommendations = []
        for meal in self.meals_calories_perc:
            meal_calories = self.meals_calories_perc[meal] * total_calories
            print(self.name_diseases)
            recommended_nutrition = [meal_calories] + self.init_nutrition_base_disease(
                self.name_diseases
            )
            generator = Generator(recommended_nutrition)
            recommended_recipes = generator.generate()["output"]
            recommendations.append(recommended_recipes)
        return recommendations
