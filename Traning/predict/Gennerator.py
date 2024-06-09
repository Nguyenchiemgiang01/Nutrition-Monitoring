from model import recommend, output_recommended_recipes
import pandas as pd

dataset = pd.read_csv("recipes.csv")

values = [
    "RecipeId",
    "Calories",
    "FatContent",
    "CholesterolContent",
    "SodiumContent",
    "CarbohydrateContent",
    "FiberContent",
    "SugarContent",
    "ProteinContent",
]
dataset = dataset[values]


class Generator:
    def __init__(
        self,
        nutrition_input: list,
        params: dict = {"n_neighbors": 5, "return_distance": False},
    ):
        self.nutrition_input = nutrition_input
        self.params = params

    def generate(
        self,
    ):
        recommendation_dataframe = recommend(
            dataset,
            self.nutrition_input,
            self.params,
        )
        output = output_recommended_recipes(recommendation_dataframe)
        if output is None:
            return {"output": None}
        else:
            return {"output": output}
