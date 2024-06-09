from flask import Flask, request, jsonify
from datetime import datetime, timedelta
import uuid
import time
import pandas as pd
import numpy as np
from libreco.data import DataInfo
from libreco.algorithms import NCF
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    unset_jwt_cookies,
    jwt_required,
    JWTManager,
)
from models import (
    db,
    User,
    PersonalInformation,
    Recipe,
    FoodPersonal,
    Food,
    Consume,
    Exercise,
    DoExercise,
    PersonalMeal,
    FoodInPerMeal,
)
from model.predict.recommed import *
from food.food import *
from diary.diary import *
from sqlalchemy import desc
from flask_cors import CORS
from config import *
from jwts.refresh_jwts import refresh_jwts

sqlstring = SQL_STRING
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "python"
app.config["SQLALCHEMY_DATABASE_URI"] = sqlstring
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
db.init_app(app)
jwt = JWTManager(app)
CORS(app)

data_info = DataInfo.load(
    "./model/model_path",
    model_name="ncf_model",
)
model = NCF.load(
    path="./model/model_path",
    model_name="ncf_model",
    data_info=data_info,
    manual=True,
)

dataset = pd.read_csv("./common/recipes.csv")
df_diseases = pd.read_csv("./common/final_diseases.csv")
time.sleep(2)
print("df_diseases", df_diseases.head(5))
values = [
    "Name",
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


def parse_date(date_str):
    try:
        return datetime.strptime(date_str, "%Y-%m-%d")  # Định dạng YYYY-MM-DD
    except ValueError:
        return None


@app.after_request
def refresh_expiring_jwts(response):
    return refresh_jwts(response)


@app.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(Email=email).first()
    if user is None:
        return jsonify({"error": UN_AUTHORIZED_ACCESS}), 401
    if email != user.Email or password != user.Password:
        return {"message": INCORRECT_LOGIN}, 401
    access_token = create_access_token(identity=email)
    response = {"access_token": access_token}
    return jsonify(response), 200


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"message": LOGOUT_SUCCESSFUL})
    unset_jwt_cookies(response)
    return response


@app.route("/signup", methods=["POST"])
def signup():
    try:
        fullname = request.json.get("fullname", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        username = request.json.get("username", None)
        age = request.json.get("age", None)
        height = request.json.get("height", None)
        weight = request.json.get("weight", None)
        gender = request.json.get("gender", None)
        disease = request.json.get("disease", None)

        if fullname == "":
            return jsonify({"error": VALIDATE_SIGNUP_FORM["full_name"]}), 400
        if email == "":
            return jsonify({"error": VALIDATE_SIGNUP_FORM["email"]}), 400
        if password == "":
            return jsonify({"error": VALIDATE_SIGNUP_FORM["pass_word"]}), 400

        user_exists = User.query.filter_by(Email=email).first()
        if user_exists:
            return jsonify({"error": VALIDATE_SIGNUP_FORM["email_exists"]}), 400
        userid = (str(uuid.uuid4()),)
        new_user = User(
            UserId=userid,
            Username=username,
            Password=password,
            Email=email,
            Name=fullname,
            Type="user",
            CreateAt=datetime.now(),
            UpdateAt=datetime.now(),
        )
        new_perinfo = PersonalInformation(
            UserId=userid,
            Age=age,
            Height=height,
            Weight=weight,
            Gender=gender,
            Disease=disease,
        )
        if new_user:
            db.session.add(new_user)
            db.session.add(new_perinfo)
            db.session.commit()
            return (
                jsonify({"message": REGISTER_SUCCESSFUL, "user": new_user.to_dict()}),
                200,
            )

        else:
            return jsonify({"error": "error"}), 500

    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({"error": str(e)}), 500


@app.route("/user/profile/update", methods=["POST"])
@jwt_required()
def update_account():
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    data = request.json

    user.Username = data["Username"]
    user.Password = data["Password"]
    user.Email = data["Email"]
    user.Name = data["Name"]

    try:
        db.session.commit()
        return jsonify({"message": "User profile updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/user/persional/update", methods=["POST"])
@jwt_required()
def update_persional():
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    personal_info = PersonalInformation.query.filter_by(UserId=user.UserId).first()
    data = request.json

    personal_info.Age = data["Age"]
    personal_info.Height = data["Height"]
    personal_info.Weight = data["Weight"]
    personal_info.Gender = data["Gender"]
    personal_info.Disease = data["Disease"]
    personal_info.Disease = data["CaloriesGoal"]

    try:
        db.session.commit()
        return jsonify({"message": "Personal Information updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/user/profile", methods=["GET", "POST"])
@jwt_required()
def get_user_profile():
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    print(user.UserId)
    if request.method == "GET":
        if user is None:
            return (
                jsonify({"error": USER_NOTFOULD}),
                404,
            )
        personal_info = PersonalInformation.query.filter_by(UserId=user.UserId).first()
        print(personal_info)
        if personal_info is None:
            return jsonify({"error": PER_INFOR_NOTFOULD}), 404
        profile_data = {
            "email": user.Email,
            "username": user.Username,
            "fullname": user.Name,
            "password": user.Password,
            "personal_info": {
                "age": personal_info.Age,
                "height": personal_info.Height,
                "weight": personal_info.Weight,
                "gender": personal_info.Gender,
                "disease": personal_info.Disease,
                "caloriesgoal": personal_info.CaloriesGoal,
            },
        }

        return jsonify(profile_data), 200
    if request.method == "POST":
        info = request.json.get("Info", {})
        if info is None:
            return jsonify({"error": UN_AUTHORIZED}), 404
        if info.get("userid") is None:
            personal_info = PersonalInformation.query.filter_by(
                UserId=user.UserId
            ).first()

            if personal_info is None:
                personal_info = PersonalInformation(
                    UserId=user.UserId,
                    Age=info.get("age"),
                    Height=info.get("height"),
                    Weight=info.get("weight"),
                    Gender=info.get("gender"),
                    Disease=info.get("disease"),
                    CaloriesGoal=info.get("CaloriesGoal"),
                )
                db.session.add(personal_info)
                db.session.commit()
            else:
                personal_info.Age = info.get("age")
                personal_info.Height = info.get("height")
                personal_info.Weight = info.get("weight")
                personal_info.Gender = info.get("gender")
                personal_info.Disease = info.get("disease")
                personal_info.CaloriesGoal = info.get("CaloriesGoal")
                db.session.commit()

        else:
            personal_info = PersonalInformation(
                UserId=info.get("userid"),
                Age=info.get("age"),
                Height=info.get("height"),
                Weight=info.get("weight"),
                Gender=info.get("gender"),
                Disease=info.get("disease"),
            )
            db.session.add(personal_info)
            db.session.commit()
        return jsonify({"message": UPDATE_PER_INFOR_SUCCESSFULL}), 201


@app.route("/food/search", methods=["GET"])
def search():
    foodname = request.args.get("foodname", None)
    if foodname:
        results = Food.query.filter(Food.Name.ilike(f"%{foodname}%")).limit(50).all()

        ress = jsonify([food.to_dict() for food in results])
        print(food.to_dict() for food in results)
        return ress
    return jsonify([]), 200


@app.route("/exercise/search", methods=["GET"])
def exercisearch():
    exercisename = request.args.get("exercisename", None)
    if exercisename:
        results = (
            Exercise.query.filter(Exercise.Name.ilike(f"%{exercisename}%"))
            .limit(9)
            .all()
        )

        ress = jsonify([exercise.to_dict() for exercise in results])
        print(ress)
        return ress
    return jsonify([]), 200


@app.route("/food", methods=["GET", "POST", "PUT"])
@jwt_required()
def queryfood():
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()

    if request.method == "GET":
        foodid = request.json.get("foodid", None)
        food = getfood(foodid).to_dict()
        if food is None:
            return jsonify({"message": FOOD_NOT_UPDATED}), 401
        else:
            return jsonify({"food": food}), 200
    if request.method == "POST":
        foodinfo = request.json.get("foodinfo", {})
        if foodinfo:
            food_new = create_newfood(foodinfo)
            db.session.add(food_new)
            if user.Type != "admin":
                food_personal = FoodPersonal(
                    FoodId=getfoodidlast(),
                    UserId=user.UserId,
                    IsPublic=False,
                    CreateAt=datetime.now(),
                    UpdateAt=datetime.now(),
                )
                db.session.add(food_personal)
            db.session.commit()
        else:
            return jsonify({"message": FOOD_NOT_UPDATED}), 401

        return jsonify({"message": FOOD_UPDATED}), 200
    if request.method == "PUT":
        foodid = request.json.get("foodid", {})
        food_personnal = FoodPersonal.query.filter_by(FoodId=foodid).first()
        food = getfood(foodid)
        foodinfo = request.json.get("foodinfo", {})
        if food_personnal is None:
            if user.Type == "admin":
                update_foodinfo(food, foodinfo)

            else:
                return jsonify({"message": UN_AUTHORIZED}), 404
        elif food_personnal.UserId == user.UserId:
            update_foodinfo(food, foodinfo)

        else:
            return jsonify({"message": UN_AUTHORIZED}), 404
        db.session.commit()
        return jsonify({"message": FOOD_UPDATED}), 200


@app.route("/recipe", methods=["GET", "POST", "PUT"])
@jwt_required()
def getrecipe():
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    foodid = request.json.get("foodid", None)
    food = Food.query.filter_by(FoodId=foodid).first()
    print(foodid)
    if food is not None:
        if request.method == "GET":
            recipe = getrecipefood(foodid).to_dict()
            if recipe is None:
                return jsonify({"message": RECIPE_NOT_UPDATED}), 401
            else:
                return jsonify({"recipe": recipe}), 200
        if request.method == "POST":
            recipeinfo = request.json.get("recipeinfo", {})
            food = Food.query.filter_by(FoodId=foodid)
            food_personnal = FoodPersonal.query.filter_by(FoodId=foodid).first()

            if food_personnal is None:
                if user.Type == "admin":
                    recipe = recipe(foodid)
                    if recipe is None:
                        recipe_obj = Recipe(
                            Foodid=foodid,
                            RecipeIngredientQuantities=recipeinfo.get(
                                "RecipeIngredientQuantities"
                            ),
                            RecipeIngredientParts=recipeinfo.get(
                                "RecipeIngredientParts"
                            ),
                            RecipeInstructions=recipeinfo.get("RecipeInstructions"),
                        )
                        db.session.add(recipe_obj)
                    else:
                        update_recipeinfo(recipe, recipeinfo)

                    db.session.commit()
                else:
                    return jsonify({"message": UN_AUTHORIZED}), 404
            elif food_personnal.UserId == user.UserId:
                recipe = getrecipefood(foodid)
                if recipe is None:
                    recipe_obj = Recipe(
                        FoodId=foodid,
                        RecipeIngredientQuantities=recipeinfo.get(
                            "RecipeIngredientQuantities"
                        ),
                        RecipeIngredientParts=recipeinfo.get("RecipeIngredientParts"),
                        RecipeInstructions=recipeinfo.get("RecipeInstructions"),
                    )
                    db.session.add(recipe_obj)
                else:
                    update_recipeinfo(recipe, recipeinfo)

                db.session.commit()
            else:
                return jsonify({"message": UN_AUTHORIZED}), 404

            return jsonify({"message": RECIPE_UPDATED})
    else:
        return jsonify({"message": FOOD_NOT_UPDATED})


@app.route("/consume/update/<date>", methods=["POST"])
@jwt_required()
def updateconsume(date):
    query_date = parse_date(date)
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()

    if not query_date:
        return (
            jsonify({"error": INVALID_DATE_FORMAT}),
            400,
        )
    if user:
        a_consume = get_a_consume(user.UserId, query_date)
    if a_consume:
        calorexercise = 0
        calormeal = 0
        fat = 0
        cholesterol = 0
        sodium = 0
        carb = 0
        fiber = 0
        sugar = 0
        protein = 0
        water = 0
        doexercise = DoExercise.query.filter_by(ConsumeId=a_consume.ConsumeId).all()
        for do in doexercise:
            exercise = Exercise.query.filter_by(ExerciseId=do.ExerciseId).first()
            calorexercise += exercise.CaloriesPerHour * do.Time / 60

        mealdiary = MealDiary.query.filter_by(ConsumeId=a_consume.ConsumeId).all()

        for meal in mealdiary:
            foodinmeals = FoodInMeal.query.filter_by(DiaryId=meal.DiaryId).all()
            for foodinmeal in foodinmeals:
                food = Food.query.filter_by(FoodId=foodinmeal.FoodId).first()
                calormeal += food.Calories
                fat += food.Fat
                cholesterol += food.Cholesterol
                sodium += food.Sodium
                carb += food.Carbohydrate
                fiber += food.Fiber
                sugar += food.Sugar
                protein += food.Protein

        a_consume.Calories = calormeal - calorexercise
        a_consume.Fat = fat
        a_consume.Cholesterol = cholesterol
        a_consume.Sodium = sodium
        a_consume.Carbohydrate = carb
        a_consume.Fiber = fiber
        a_consume.Sugar = sugar
        a_consume.Protein = protein
        a_consume.Water = water
        db.session.commit()
    return (
        jsonify(
            {"message": "Consume updated successfully", "consume": a_consume.to_dict()}
        ),
        200,
    )


@app.route("/consume/<date>", methods=["GET"])
@jwt_required()
def query_consume(date):
    query_date = parse_date(date)
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    if not query_date:
        return (
            jsonify({"error": INVALID_DATE_FORMAT}),
            400,
        )
    a_consume = get_a_consume(user.UserId, query_date)
    if not a_consume:
        return jsonify({"message": "No records found"}), 404

    return jsonify({"a_consume": a_consume.to_dict()}), 200


@app.route("/consume", methods=["POST"])
@jwt_required()
def consume():
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    date = request.json.get("date", None)
    consumes = create_new_consume(user.UserId, date)
    db.session.add(consumes)
    db.session.commit()
    return jsonify({"message": "Consume created"}), 201


@app.route("/consume", methods=["GET"])
@jwt_required()
def query_consume_by_date_range():
    date_from = request.args.get("date_from", None)
    print("datefrom", date_from)
    date_to = request.args.get("date_to", None)

    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()

    if not (date_from and date_to):
        return jsonify({"error": "ERROR_RANGE_DATE"}), 400
    date_from = parse_date(date_from)
    date_to = parse_date(date_to)
    if not (date_from and date_to):
        return jsonify({"error": "INVALID_DATE_FORMAT"}), 400
    if date_from == date_to:
        print("1 day")
        consume_list = get_a_consume(user.UserId, date_from).to_dict()
        return jsonify(consume_list), 200
    else:
        consumes = get_stage_consume(user.UserId, date_from, date_to)
        consume_list = [consume.to_dict() for consume in consumes]
        return jsonify(consume_list), 200


@app.route("/consume/all", methods=["GET"])
@jwt_required()
def query_all_consume():
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    consumes = get_all_consume(user.UserId)
    if not consumes:
        return jsonify({"message": NO_RECORD_FOUND}), 404
    consume_list = [consume.to_dict() for consume in consumes]
    return jsonify(consume_list), 200


@app.route("/mealdiary/<date>", methods=["GET"])
@jwt_required()
def get_mealdiary(date):
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    query_date = parse_date(date)
    if not query_date:
        return (
            jsonify({"error": INVALID_DATE_FORMAT}),
            400,
        )

    mealdiarys = get_meal_diary(user.UserId, query_date)
    if not mealdiarys:
        return jsonify({"mealdiarys": []}), 404
    else:

        return jsonify({"mealdiarys": mealdiarys}), 201


@app.route("/exercise/<date>", methods=["GET"])
@jwt_required()
def get_exercise_date(date):
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    query_date = parse_date(date)
    if not query_date:
        return jsonify({"error": "INVALID_DATE_FORMAT"}), 400

    exercises = get_exercise(user.UserId, query_date)
    print(exercises)
    if not exercises:
        return jsonify({"exercises": []}), 404
    else:
        return jsonify({"exercises": exercises}), 200


@app.route("/mealdiary", methods=["POST"])
@jwt_required()
def create_meal_diary():
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    date = request.json.get("Date", None)
    meal_type = request.json.get("Type", None)
    food_id = request.json.get("foodid", None)
    if not (date and meal_type):
        return jsonify({"error": "Missing required data"}), 400
    consume_id = get_consume_id(user.UserId, date)
    if consume_id is None:
        consume = Consume(
            UserId=user.UserId,
            Date=date,
        )
        db.session.add(consume)
        db.session.commit()
        consume_id = get_consume_id(user.UserId, date)
    isinmeal = MealDiary.query.filter(
        MealDiary.UserId == user.UserId,
        MealDiary.Date == date,
        MealDiary.Type == meal_type,
    ).first()
    if isinmeal:
        food_in_meal = FoodInMeal(DiaryId=isinmeal.DiaryId, FoodId=food_id)
        db.session.add(food_in_meal)
    else:
        meal_diary = MealDiary(
            UserId=user.UserId, Date=date, Type=meal_type, ConsumeId=consume_id
        )
        db.session.add(meal_diary)
        db.session.commit()

        food_in_meal = FoodInMeal(DiaryId=meal_diary.DiaryId, FoodId=food_id)
        db.session.add(food_in_meal)

    db.session.commit()
    updateconsume(date)
    return jsonify({"message": "Add food to diary successfully"}), 201


@app.route("/mealdiary", methods=["DELETE"])
@jwt_required()
def remove_meal_diary():
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    date = request.json.get("Date", None)
    meal_type = request.json.get("Type", None)
    food_id = request.json.get("foodid", None)
    print("inf", date, meal_type, food_id)
    if not (date and meal_type and food_id):
        return jsonify({"error": "Missing required data"}), 400

    # Tìm nhật ký bữa ăn cụ thể
    meal_diary = MealDiary.query.filter_by(
        UserId=user.UserId, Date=date, Type=meal_type
    ).first()

    if not meal_diary:
        return jsonify({"error": "Meal diary entry not found"}), 404

    # Tìm món ăn cụ thể trong nhật ký bữa ăn
    food_in_meal = FoodInMeal.query.filter_by(
        DiaryId=meal_diary.DiaryId, FoodId=food_id
    ).first()

    if not food_in_meal:
        return jsonify({"error": "Food item not found in meal diary"}), 404

    # Xóa món ăn khỏi nhật ký bữa ăn
    db.session.delete(food_in_meal)
    db.session.commit()

    # Cập nhật consume nếu cần thiết
    updateconsume(date)

    return jsonify({"message": "Removed food from diary successfully"}), 200


@app.route("/exercise", methods=["POST"])
@jwt_required()
def add_or_update_exercise():
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    date = request.json.get("Date", None)
    time = request.json.get("Time", None)
    exercise_id = request.json.get("ExerciseId", None)

    if not (date and time and exercise_id):
        return jsonify({"error": "Missing required data"}), 400

    # Tìm consume_id
    consume_id = get_consume_id(user.UserId, date)
    if consume_id is None:
        consume = Consume(
            UserId=user.UserId,
            Date=date,
        )
        db.session.add(consume)
        db.session.commit()
        consume_id = get_consume_id(user.UserId, date)

    # Kiểm tra nếu đã có bản ghi DoExercise cho UserId, Date, ExerciseId này hay chưa
    do_exercise = DoExercise.query.filter_by(
        UserId=user.UserId, Date=date, ExerciseId=exercise_id
    ).first()

    if do_exercise:
        # Nếu đã có thì cập nhật bản ghi hiện có
        do_exercise.Time = time
        db.session.commit()
        return jsonify({"message": "Updated exercise in diary successfully"}), 200
    else:
        # Nếu chưa có thì tạo mới bản ghi
        new_do_exercise = DoExercise(
            UserId=user.UserId,
            Date=date,
            Time=time,
            ConsumeId=consume_id,
            ExerciseId=exercise_id,
        )
        db.session.add(new_do_exercise)
        db.session.commit()
        updateconsume(date)
        return jsonify({"message": "Added exercise to diary successfully"}), 201


@app.route("/diary/recommend", methods=["POST"])
@jwt_required()
def recommend():

    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()

    per_infor = (
        PersonalInformation.query.filter_by(UserId=user.UserId).first().to_dict()
    )
    info = {
        "age": per_infor["Age"],
        "height": per_infor["Height"],
        "weight": per_infor["Weight"],
        "gender": per_infor["Gender"],
        "name_diseases": per_infor["Disease"],  # lưu ý trường hợp trống
    }
    number_meal = request.json.get("number_meal", None)
    isDiet = request.json.get("is_diet", None)
    goal = per_infor["CaloriesGoal"]
    if isDiet == "true":
        recommend_result = None
        recommend_result = gennerate(info, number_meal, df_diseases, goal, dataset)
        time.sleep(1)
        if recommend_result:
            return jsonify({"recommend_result": recommend_result}), 201
        else:
            return jsonify({"recommend_result": None}), 201
        # kết hợp  với NFC
    else:
        recommend_result = None
        result = model.recommend_user(user=user.UserId, n_rec=10)
        time.sleep(1)
        id_results = [
            value.tolist() if isinstance(value, np.ndarray) else value
            for key, value in result.items()
        ]
        recommend_results = []
        for foodid in id_results[0]:
            food = Food.query.filter_by(FoodId=foodid).first()
            recommend_results.append(food)
        recommend_result = [[food.to_dict() for food in recommend_results]]
        if recommend_result:
            return jsonify({"recommend_result": recommend_result}), 201
        else:
            return jsonify({"recommend_result": None}), 201


@app.route("/personalmeal", methods=["POST"])
@jwt_required()
def add_personal_meal():
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    food_ids = request.json.get("listfoodid", None)
    name = request.json.get("name", None)
    if food_ids is not None:
        personal_meal = PersonalMeal(UserId=user.UserId, Name=name)
        db.session.add(personal_meal)
        db.session.commit()
    personal_meal_ = (
        PersonalMeal.query.filter_by(UserId=user.UserId)
        .order_by(PersonalMeal.CreateAt.desc())
        .first()
    )
    permeal_id = personal_meal_.PerMealId
    for foodid in food_ids:
        perinmeal = FoodInPerMeal(PerMealId=permeal_id, FoodId=foodid)
        db.session.add(perinmeal)
    db.session.commit()

    return jsonify({"message": "Create meal successfully"}), 201


@app.route("/personalmeal", methods=["DELETE"])
@jwt_required()
def delete_personal_meal():
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    permeal_id = request.json.get("permealid", None)

    if permeal_id is None:
        return jsonify({"error": "Missing permealid"}), 400

    personal_meal = PersonalMeal.query.filter_by(
        UserId=user.UserId, PerMealId=permeal_id
    ).first()

    if personal_meal is None:
        return jsonify({"error": "Personal meal not found"}), 404

    FoodInPerMeal.query.filter_by(PerMealId=permeal_id).delete()
    db.session.delete(personal_meal)
    db.session.commit()

    return jsonify({"message": "Deleted meal successfully"}), 200


@app.route("/personalmeal", methods=["GET"])
@jwt_required()
def get_personal_meal():
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    per_meal = PersonalMeal.query.filter_by(UserId=user.UserId).all()
    permeals = [item.to_dict() for item in per_meal]
    return jsonify({"per_meal": permeals}), 201


@app.route("/foodinmeal", methods=["GET"])
@jwt_required()
def get_food_meal():
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    permealid = request.args.get("permealid", None)
    print(permealid)
    per_meal = FoodInPerMeal.query.filter_by(PerMealId=permealid).all()
    perfoodmeal = [item.to_dict() for item in per_meal]
    print(perfoodmeal)
    return jsonify({"perfoodmeal": perfoodmeal}), 201


if __name__ == "__main__":
    app.run()
