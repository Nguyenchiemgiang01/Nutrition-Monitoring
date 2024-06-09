import numpy as np
import re
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import FunctionTransformer


def scaling(dataframe):
    scaler = StandardScaler()
    values = [
        "Calories",
        "FatContent",
        "CholesterolContent",
        "SodiumContent",
        "CarbohydrateContent",
        "FiberContent",
        "SugarContent",
        "ProteinContent",
    ]
    prep_data = scaler.fit_transform(dataframe[values].to_numpy())
    return prep_data, scaler


def nn_predictor(prep_data):
    neigh = NearestNeighbors(metric="cosine", algorithm="brute")
    neigh.fit(prep_data)
    return neigh


def build_pipeline(neigh, scaler, params):
    transformer = FunctionTransformer(neigh.kneighbors, kw_args=params)
    pipeline = Pipeline([("std_scaler", scaler), ("NN", transformer)])
    return pipeline


def apply_pipeline(pipeline, _input, extracted_data):
    _input = np.array(_input).reshape(1, -1)
    return extracted_data.iloc[pipeline.transform(_input)[0]]


def recommend(
    dataframe,
    _input,
    params={"n_neighbors": 5, "return_distance": False},
):
    if dataframe.shape[0] >= params["n_neighbors"]:
        prep_data, scaler = scaling(dataframe)
        neigh = nn_predictor(prep_data)
        pipeline = build_pipeline(neigh, scaler, params)
        return apply_pipeline(pipeline, _input, dataframe)
    else:
        return None


def extract_quoted_strings(s):
    strings = re.findall(r'"([^"]*)"', s)
    return strings


def output_recommended_recipes(dataframe):
    if dataframe is not None:
        output = dataframe.copy()
        output = output.to_dict("records")
    else:
        output = None
    return output
