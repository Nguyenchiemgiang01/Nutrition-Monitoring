from .model import recommend, output_recommended_recipes
import pandas as pd


class Generator:
    def __init__(
        self,
        dataset,
        nutrition_input: list,
        params: dict = {"n_neighbors": 5, "return_distance": False},
    ):
        self.dataset = dataset
        self.nutrition_input = nutrition_input
        self.params = params

    def generate(
        self,
    ):
        recommendation_dataframe = recommend(
            self.dataset,
            self.nutrition_input,
            self.params,
        )
        output = output_recommended_recipes(recommendation_dataframe)
        if output is None:
            return {"output": None}
        else:
            return {"output": output}
