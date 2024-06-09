use  nutrition_monitoring;
-- Create Table User(
-- UserId Varchar(50) PRIMARY KEY,
-- Username Varchar(30) Unique,
-- Password Varchar(100),
-- Email Varchar(50),
-- Name Varchar(50),
-- Type Varchar(10),
-- CreateAt timestamp Default Current_timestamp,
-- UpdateAt timestamp Default current_timestamp on update current_timestamp
-- );
-- Create Table Exercise(
-- ExerciseId INT AUTO_INCREMENT PRIMARY KEY,
-- Name Varchar(30),
-- CaloriesPerHour Float
-- );
-- CREATE TABLE DoExercise (
--     DoExerciseId INT AUTO_INCREMENT PRIMARY KEY,
--     ExerciseId INT,
--     Time Float,
--     FOREIGN KEY (ExerciseId) REFERENCES Exercise(ExerciseId)
-- );

-- Create Table Consume(
-- ConsumeId int AUTO_INCREMENT Primary key,
-- UserId varchar(50) ,
-- Date DATE,
-- Calories Float,
-- Fat FLOAT,
-- Cholesterol Float,
-- Sodium Float,
-- Carbohydrate FLOAT,
-- Fiber Float,
-- Sugar Float,
-- Protein FLOAT,
-- Water FLOAT,
-- DoExerciseId Int,
-- FOREIGN KEY (UserId) REFERENCES User(UserId),
-- FOREIGN KEY (DoExerciseId) REFERENCES DoExercise(DoExerciseId)
-- );

-- CREATE TABLE Personal_Information (
-- PerId INT AUTO_INCREMENT PRIMARY KEY,
-- UserId varchar(50),
-- Age INT,
-- Height FLOAT,
-- Weight FLOAT,
-- Gender VARCHAR(10),
-- Disease VARCHAR(100),
-- FOREIGN KEY (UserId) REFERENCES User(UserId)
-- );


-- CREATE TABLE Food (
--     FoodId INT PRIMARY KEY ,
--     Name VARCHAR(100),
--     Description Varchar(2000),
--     RecipeCategory Varchar(50),
--     Keywords Varchar(500),
--     Calories Float,
-- 	Fat FLOAT,
--     Cholesterol Float,
--     Sodium Float,
--     Carbohydrate  FLOAT,
--     Fiber Float,
--     Sugar Float,
--     Protein FLOAT
-- );
-- CREATE TABLE Recipe(
-- RecipeId INT  Primary key auto_increment,
-- FoodId int ,
-- RecipeIngredientQuantities Varchar(1000),
-- RecipeIngredientParts varchar(1000),
-- RecipeInstructions  varchar(1000),
-- Foreign key (FoodId) references Food(FoodId)
-- );

-- Create table Meal_Diary(
-- DiaryId Int Auto_increment Primary key,
-- UserId Varchar(50),
-- Date Date,
-- Type Varchar(20),
-- ConsumeId Int,
-- Foreign key (UserId) references User(UserId)
-- );

Create table Food_In_Meal(
FiMId Int Auto_increment Primary key,
DiaryId Int ,
FoodId Int,
Foreign key (FoodId) references Food(FoodId),
Foreign Key (DiaryId) references  Meal_Diary(DiaryId)
);

-- Create table Personnal_Meal(
-- PerMealId Int auto_increment Primary key,
-- UserId Varchar(50),
-- Name Varchar(50),
-- IsPublic Boolean,
-- CreateAt timestamp Default Current_timestamp,
-- UpdateAt timestamp Default current_timestamp on update current_timestamp,
-- Foreign Key (UserId) References User(UserId)
-- );

-- Create table Food_In_PerMeal(
-- FPId Int Auto_increment Primary key,
-- PermealId Int,
-- FoodId int,
-- Foreign key (PermealId) References Personnal_Meal(PermealId),
-- Foreign key (FoodId) references Food(FoodId)
-- );
-- Create table Review(
-- ReviewId Int Auto_increment Primary key,
-- UserId Varchar(50),
-- FoodId int,
-- Rating float,
-- ReviewAt timestamp Default Current_timestamp,
-- Foreign key (UserId) References User(UserId),
-- Foreign key (FoodId) references Food(FoodId)
-- );
-- Create table Food_Personal(
-- FperId Int Auto_increment Primary key,
-- FoodId Int,
-- UserId Varchar(50),
-- IsPublic boolean,
-- CreateAt timestamp Default Current_timestamp,
-- UpdateAt timestamp Default current_timestamp on update current_timestamp,
-- Foreign key (UserId) References User(UserId),
-- Foreign key (FoodId) references Food(FoodId)
-- );
