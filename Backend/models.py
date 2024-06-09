from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


# Model cho bảng User
class User(db.Model):
    __tablename__ = "User"
    UserId = db.Column(db.String(50), primary_key=True)
    Username = db.Column(db.String(30), unique=True)
    Password = db.Column(db.String(100))
    Email = db.Column(db.String(50))
    Name = db.Column(db.String(50))
    Type = db.Column(db.String(10))
    CreateAt = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    UpdateAt = db.Column(
        db.DATETIME,
        server_default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp(),
    )

    def to_dict(self):
        return {
            "UserId": self.UserId,
            "Username": self.Username,
            "Email": self.Email,
            "Name": self.Name,
            "Type": self.Type,
            "CreateAt": self.CreateAt.strftime("%Y-%m-%d %H:%M:%S"),
            "UpdateAt": self.UpdateAt.strftime("%Y-%m-%d %H:%M:%S"),
        }


# Model cho bảng Exercise
class Exercise(db.Model):
    __tablename__ = "Exercise"
    ExerciseId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Name = db.Column(db.String(30))
    CaloriesPerHour = db.Column(db.Float)

    def to_dict(self):
        consume_dict = {
            "ExerciseId": self.ExerciseId,
            "Name": self.Name,
            "CaloriesPerHour": self.CaloriesPerHour,
        }
        return consume_dict


# Model cho bảng DoExercise
class DoExercise(db.Model):
    __tablename__ = "DoExercise"
    DoExerciseId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ExerciseId = db.Column(db.Integer, db.ForeignKey("Exercise.ExerciseId"))
    Time = db.Column(db.Float)
    Date = db.Column(db.Date)
    UserId = db.Column(db.String(50), db.ForeignKey("User.UserId"))
    ConsumeId = db.Column(db.Integer, db.ForeignKey("Consume.ConsumeId"))

    exercise = db.relationship("Exercise", backref="do_exercise")
    user = db.relationship("User", backref="personal_do_exercise")
    consume = db.relationship("Consume", backref="consume_do_exercise")

    def to_dict(self):
        doexercise_dict = {
            "DoExerciseId": self.DoExerciseId,
            "ExerciseId": self.ExerciseId,
            "Time": self.Time,
            "Date": self.Date,
            "UserId": self.UserId,
        }
        return doexercise_dict


# Model cho bảng Consume
class Consume(db.Model):
    __tablename__ = "Consume"
    ConsumeId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserId = db.Column(db.String(50), db.ForeignKey("User.UserId"))
    Date = db.Column(db.Date)
    Calories = db.Column(db.Float, default=0.0)
    Fat = db.Column(db.Float, default=0.0)
    Cholesterol = db.Column(db.Float, default=0.0)
    Sodium = db.Column(db.Float, default=0.0)
    Carbohydrate = db.Column(db.Float, default=0.0)
    Fiber = db.Column(db.Float, default=0.0)
    Sugar = db.Column(db.Float, default=0.0)
    Protein = db.Column(db.Float, default=0.0)
    Water = db.Column(db.Float, default=0.0)

    user = db.relationship("User", backref="consumes")

    def to_dict(self):

        consume_dict = {
            "ConsumeId": self.ConsumeId,
            "UserId": self.UserId,
            "Date": str(self.Date),
            "Calories": self.Calories,
            "Fat": self.Fat,
            "Cholesterol": self.Cholesterol,
            "Sodium": self.Sodium,
            "Carbohydrate": self.Carbohydrate,
            "Fiber": self.Fiber,
            "Sugar": self.Sugar,
            "Protein": self.Protein,
            "Water": self.Water,
        }
        return consume_dict


# Model cho bảng Personal_Information
class PersonalInformation(db.Model):
    __tablename__ = "Personal_Information"
    PerId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserId = db.Column(db.String(50), db.ForeignKey("User.UserId"))
    Age = db.Column(db.Integer)
    Height = db.Column(db.Float)
    Weight = db.Column(db.Float)
    Gender = db.Column(db.String(10))
    Disease = db.Column(db.String(100))
    CaloriesGoal = db.Column(db.Float)

    user = db.relationship("User", backref="personal_info")

    def to_dict(self):
        return {
            "PerId": self.PerId,
            "UserId": self.UserId,
            "Age": self.Age,
            "Height": self.Height,
            "Weight": self.Weight,
            "Gender": self.Gender,
            "Disease": self.Disease,
            "CaloriesGoal": self.CaloriesGoal,
        }


# Model cho bảng Food
class Food(db.Model):
    __tablename__ = "Food"
    FoodId = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100))
    Description = db.Column(db.String(2000))
    RecipeCategory = db.Column(db.String(50))
    Keywords = db.Column(db.String(500))
    Calories = db.Column(db.Float)
    Fat = db.Column(db.Float)
    Cholesterol = db.Column(db.Float)
    Sodium = db.Column(db.Float)
    Carbohydrate = db.Column(db.Float)
    Fiber = db.Column(db.Float)
    Sugar = db.Column(db.Float)
    Protein = db.Column(db.Float)

    def to_dict(self):
        return {
            "FoodId": self.FoodId,
            "Name": self.Name,
            "Description": self.Description,
            "RecipeCategory": self.RecipeCategory,
            "Keywords": self.Keywords,
            "Calories": self.Calories,
            "Fat": self.Fat,
            "Cholesterol": self.Cholesterol,
            "Sodium": self.Sodium,
            "Carbohydrate": self.Carbohydrate,
            "Fiber": self.Fiber,
            "Sugar": self.Sugar,
            "Protein": self.Protein,
        }


# Model cho bảng Recipe
class Recipe(db.Model):
    __tablename__ = "Recipe"
    RecipeId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    FoodId = db.Column(db.Integer, db.ForeignKey("Food.FoodId"))
    RecipeIngredientQuantities = db.Column(db.String(1000))
    RecipeIngredientParts = db.Column(db.String(1000))
    RecipeInstructions = db.Column(db.String(1000))

    food = db.relationship("Food", backref="recipes")

    def to_dict(self):
        return {
            "RecipeId": self.RecipeId,
            "FoodId": self.FoodId,
            "RecipeIngredientQuantities": self.RecipeIngredientQuantities,
            "RecipeIngredientParts": self.RecipeIngredientParts,
            "RecipeInstructions": self.RecipeInstructions,
        }


# Model cho bảng Meal_Diary
class MealDiary(db.Model):
    __tablename__ = "Meal_Diary"
    DiaryId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserId = db.Column(db.String(50), db.ForeignKey("User.UserId"))
    Date = db.Column(db.Date)
    Type = db.Column(db.String(20))
    ConsumeId = db.Column(db.Integer)
    user = db.relationship("User", backref="meal_diaries")


# Model cho bảng Food_In_Meal
class FoodInMeal(db.Model):
    __tablename__ = "Food_In_Meal"
    FiMId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    DiaryId = db.Column(db.Integer, db.ForeignKey("Meal_Diary.DiaryId"))
    FoodId = db.Column(db.Integer, db.ForeignKey("Food.FoodId"))
    meal_diary = db.relationship("MealDiary", backref="food_in_meals")
    food = db.relationship("Food", backref="food_in_meals")


class FoodPersonal(db.Model):
    __tablename__ = "Food_Personal"

    FperId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    FoodId = db.Column(db.Integer, db.ForeignKey("Food.FoodId"), nullable=False)
    UserId = db.Column(db.String(50), db.ForeignKey("User.UserId"), nullable=False)
    IsPublic = db.Column(
        db.Boolean, default=False
    )  # Default cho phép công khai hoặc không
    CreateAt = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    UpdateAt = db.Column(
        db.DATETIME,
        server_default=db.func.current_timestamp(),
        onupdate=db.func.current_timestamp(),
    )
    # Mối quan hệ với bảng Food và User
    food = db.relationship("Food", backref="food_personals")
    user = db.relationship("User", backref="food_personals")


# Model cho bảng Personnal_Meal
class PersonalMeal(db.Model):
    __tablename__ = "Personnal_Meal"
    PerMealId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserId = db.Column(db.String(50), db.ForeignKey("User.UserId"))
    Name = db.Column(db.String(50))
    IsPublic = db.Column(db.Boolean)
    CreateAt = db.Column(db.DateTime, default=datetime.utcnow)
    UpdateAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship("User", backref="personal_meals")

    def to_dict(self):
        return {
            "PerMealId": self.PerMealId,
            "UserId": self.UserId,
            "Name": self.Name,
            "IsPublic": self.IsPublic,
            "CreateAt": self.CreateAt.strftime("%d-%m-%Y") if self.CreateAt else None,
            "UpdateAt": self.UpdateAt.strftime("%d-%m-%Y") if self.UpdateAt else None,
        }


# Model cho bảng Food_In_PerMeal
class FoodInPerMeal(db.Model):
    __tablename__ = "Food_In_PerMeal"
    FPId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    PerMealId = db.Column(db.Integer, db.ForeignKey("Personnal_Meal.PerMealId"))
    FoodId = db.Column(db.Integer, db.ForeignKey("Food.FoodId"))

    personal_meal = db.relationship("PersonalMeal", backref="food_in_per_meals")
    food = db.relationship("Food", backref="food_in_per_meals")

    def to_dict(self):
        return {
            "FPId": self.FPId,
            "PerMealId": self.PerMealId,
            "FoodId": self.FoodId,
            "personal_meal": (
                self.personal_meal.to_dict() if self.personal_meal else None
            ),
            "food": self.food.to_dict() if self.food else None,
        }


# Model cho bảng Review
class Review(db.Model):
    __tablename__ = "Review"
    ReviewId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserId = db.Column(db.String(50), db.ForeignKey("User.UserId"))
    FoodId = db.Column(db.Integer, db.ForeignKey("Food.FoodId"))
    Rating = db.Column(db.Float)
    ReviewAt = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", backref="reviews")
    food = db.relationship("Food", backref="reviews")
