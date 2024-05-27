from flask import Flask, request, jsonify
from datetime import datetime, timedelta
import uuid
import time
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
)
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

        if fullname == "":
            return jsonify({"error": VALIDATE_SIGNUP_FORM["full_name"]}), 400
        if email == "":
            return jsonify({"error": VALIDATE_SIGNUP_FORM["email"]}), 400
        if password == "":
            return jsonify({"error": VALIDATE_SIGNUP_FORM["pass_word"]}), 400

        user_exists = User.query.filter_by(Email=email).first()
        if user_exists:
            return jsonify({"error": VALIDATE_SIGNUP_FORM["email_exists"]}), 400

        new_user = User(
            UserId=str(uuid.uuid4()),
            Username=username,
            Password=password,
            Email=email,
            Name=fullname,
            Type="user",
            CreateAt=datetime.now(),
            UpdateAt=datetime.now(),
        )
        if new_user:
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"success": REGISTER_SUCCESSFUL}), 200
        else:
            return jsonify({"error": "error"}), 500

    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({"error": str(e)}), 500


@app.route("/user/profile", methods=["GET", "POST"])
@jwt_required()
def get_user_profile():
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()
    if request.method == "GET":
        if user is None:
            return (
                jsonify({"error": USER_NOTFOULD}),
                404,
            )

        personal_info = PersonalInformation.query.filter_by(UserId=user.UserId).first()
        if personal_info is None:
            return jsonify({"error": PER_INFOR_NOTFOULD}), 404
        profile_data = {
            "email": user.Email,
            "fullname": user.Username,
            "personal_info": {
                "age": personal_info.Age,
                "height": personal_info.Height,
                "weight": personal_info.Weight,
                "gender": personal_info.Gender,
                "disease": personal_info.Disease,
            },
        }

        return jsonify(profile_data), 200
    if request.method == "POST":
        info = request.json.get("Info", {})
        if user is None:
            return jsonify({"error": UN_AUTHORIZED}), 404
        personal_info = PersonalInformation.query.filter_by(UserId=user.UserId).first()
        if personal_info is None:
            personal_info = PersonalInformation(
                UserId=user.UserId,
                Age=info.get("age"),
                Height=info.get("height"),
                Weight=info.get("weight"),
                Gender=info.get("gender"),
                Disease=info.get("disease"),
            )
            db.session.add(personal_info)
        else:
            personal_info.Age = info.get("age")
            personal_info.Height = info.get("height")
            personal_info.Weight = info.get("weight")
            personal_info.Gender = info.get("gender")
            personal_info.Disease = info.get("disease")

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

    return jsonify({"a_consume": a_consume}), 200


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
    date_to = request.args.get("date_to", None)
    email = get_jwt_identity()
    user = User.query.filter_by(Email=email).first()

    if not (date_from and date_to):
        return jsonify({"error": ERROR_RANGE_DATE}), 400
    date_from = parse_date(date_from)
    date_to = parse_date(date_to)

    if not (date_from and date_to):
        return jsonify({"error": INVALID_DATE_FORMAT}), 400
    consumes = get_stage_consume(user.UserId, date_from, date_to)

    if not consumes:
        return jsonify({"message": NO_RECORD_FOUND}), 404

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
    # serving_size = request.json.get("servingsize", None)
    # print(date, "type:", meal_type, "id:", food_id, "size:", serving_size)
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
    return jsonify({"message": "Add food to diary successfully"}), 201


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
        return jsonify({"message": "Added exercise to diary successfully"}), 201


if __name__ == "__main__":
    app.run()
