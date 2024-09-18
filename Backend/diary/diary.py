from models import Consume, MealDiary, FoodInMeal, Food, DoExercise, Exercise
from sqlalchemy import and_, or_, desc


def get_meal_diary(UserIds, date):
    meals_in_date = {}
    print(UserIds)
    mealdiarys = MealDiary.query.filter(
        and_(MealDiary.UserId == UserIds, MealDiary.Date == date)
    ).all()
    if mealdiarys:
        for meal in mealdiarys:
            foodinmeals = FoodInMeal.query.filter(
                FoodInMeal.DiaryId == meal.DiaryId
            ).all()
            print(foodinmeals)
            fooddetails = []
            for food in foodinmeals:
                fooddetail = Food.query.filter(Food.FoodId == food.FoodId).all()
                for fooddel in fooddetail:
                    fooddetails.append(fooddel.to_dict())
            meals_in_date[meal.Type] = fooddetails
        return meals_in_date
    else:
        return {}


def get_exercise(UserIds, date):
    exercise_in_date = []
    exercises = DoExercise.query.filter(
        and_(DoExercise.UserId == UserIds, DoExercise.Date == date)
    ).all()
    if exercises:
        for do_ex in exercises:
            exercise = Exercise.query.filter(
                Exercise.ExerciseId == do_ex.ExerciseId
            ).first()
            if exercise:
                exer_dict = exercise.to_dict()
                do_ex_dict = do_ex.to_dict()
                exercise_dict = {**exer_dict, **do_ex_dict}  # Merging dictionaries
                exercise_in_date.append(exercise_dict)
        return exercise_in_date
    else:
        return []


def create_new_consume(UserId, date):
    consume = Consume(
        UserId=UserId,
        Date=date,
        Calories=0,
        Fat=0,
        Cholesterol=0,
        Sodium=0,
        Carbohydrate=0,
        Fiber=0,
        Sugar=0,
        Protein=0,
        Water=0,
        DoExerciseId=None,
    )
    return consume


def get_a_consume(UserId, date):
    a_consume = Consume.query.filter(
        and_(Consume.UserId == UserId, Consume.Date == date)
    ).first()
    return a_consume


def get_all_consume(UserId):
    all_consume = Consume.query.filter_by(UserId=UserId).all()
    return all_consume


def get_stage_consume(UserId, datefrom, dateto):
    print(datefrom)
    consumes = (
        Consume.query.filter(
            and_(Consume.UserId == UserId, Consume.Date.between(datefrom, dateto))
        )
        .order_by(desc(Consume.Date))
        .all()
    )

    return consumes


def get_consume_id(UserId, date):
    consume = Consume.query.filter(
        and_(Consume.UserId == UserId, Consume.Date == date)
    ).first()
    if consume:
        consume_id = consume.ConsumeId
        return consume_id
    else:
        return None
