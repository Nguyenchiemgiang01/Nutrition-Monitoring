from model import recommend, output_recommended_recipes
import pandas as pd

dataset = pd.read_csv("recipes.csv")


class Generator:
    def __init__(
        self,
        nutrition_input: list,
        ingredients: list = [],
        params: dict = {"n_neighbors": 5, "return_distance": False},
    ):
        self.nutrition_input = nutrition_input
        self.ingredients = ingredients
        self.params = params

    def set_request(self, nutrition_input: list, ingredients: list, params: dict):
        self.nutrition_input = nutrition_input
        self.ingredients = ingredients
        self.params = params

    def generate(
        self,
    ):
        recommendation_dataframe = recommend(
            dataset,
            self.nutrition_input,
            self.ingredients,
            self.params,
        )
        output = output_recommended_recipes(recommendation_dataframe)
        if output is None:
            return {"output": None}
        else:
            return {"output": output}
