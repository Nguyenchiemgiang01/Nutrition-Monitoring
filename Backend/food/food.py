from models import Food, Recipe
from flask import jsonify


def getrecipefood(foodid):
    recipe = Recipe.query.filter_by(FoodId=foodid).first()
    if recipe is None:
        return None
    else:
        return recipe


def getfood(foodid):
    food = Food.query.filter_by(FoodId=foodid).first()
    if food is None:
        return None
    else:
        return food


def getfoodidlast():
    latest_food = Food.query.order_by(Food.FoodId.desc()).first()
    return latest_food.FoodId


def create_newfood(foodinfo):
    return Food(
        FoodId=getfoodidlast() + 1,
        Name=foodinfo["Name"],
        Description=foodinfo["Description"],
        RecipeCategory=foodinfo["RecipeCategory"],
        Keywords=foodinfo["Keywords"],
        Calories=foodinfo["Calories"],
        Fat=foodinfo["Fat"],
        Cholesterol=foodinfo["Cholesterol"],
        Sodium=foodinfo["Sodium"],
        Carbohydrate=foodinfo["Carbohydrate"],
        Fiber=foodinfo["Fiber"],
        Sugar=foodinfo["Sugar"],
        Protein=foodinfo["Protein"],
    )


def update_foodinfo(food, foodinfo):
    for key in foodinfo.keys():
        if hasattr(food, key):
            setattr(food, key, foodinfo[key])


def update_recipeinfo(recipe, recipeinfo):
    for key in recipeinfo.keys():
        if hasattr(recipe, key):
            setattr(recipe, key, recipeinfo[key])
