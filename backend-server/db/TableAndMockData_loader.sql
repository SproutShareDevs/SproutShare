/*

Script to create tables in database
psql -U $username -d $dbname -a -f SproutShare\backend-server\db\TableAndMockData_loader.sql

where username is the $username you chose when installing postgres and $db name is the name of the database
that you already created in postgres 

Running this script drops all tables and resets all data

Check the output at the end (the four SELECT statements) in the terminal window
to make sure that the data is loaded into the tables.

Please document any errors while running this script

*/

/* Remove Tables if they exist */
DROP TABLE IF EXISTS userplant;
DROP TABLE IF EXISTS plantdisease;
DROP TABLE IF EXISTS plantpest;
DROP TABLE IF EXISTS plant;
DROP TABLE IF EXISTS garden;
DROP TABLE IF EXISTS sproutshareuser;
DROP TABLE IF EXISTS soil;
DROP TABLE IF EXISTS disease;
DROP TABLE IF EXISTS pest;

CREATE TYPE soil_type AS ENUM (
  'sandy',
  'silt',
  'clay',
  'loamy'
);

CREATE TYPE nutrient_level AS ENUM (
  'depleted',
  'deficient',
  'adequate',
  'sufficient',
  'surplus'
);

CREATE TYPE ph_level AS ENUM (
  'basic',
  'neutral',
  'Acidic'
);

CREATE TYPE threat_level AS ENUM (
  'No_Threat',
  'Partial_Threat',
  'Threatened'
);

CREATE TABLE sproutshareuser(
  user_key SERIAL PRIMARY KEY,
  username varchar,
  password varchar,
  accesstoken varchar,
  first_name varchar,
  last_name varchar,
  email_address varchar,
  lang varchar,
  zip_code int,
  user_lat double precision NOT NULL DEFAULT 1.00,
  user_long double precision NOT NULL DEFAULT 1.00
);

CREATE TABLE plant(
  plant_key SERIAL PRIMARY KEY,
  common_name varchar,
  latin_name varchar,
  light_level varchar,
  min_temp int,
  max_temp int,
  rec_temp int,
  hardiness_zone varchar,
  soil_type soil_type,
  img varchar,
  water_need int
);


CREATE TABLE soil(
  soil_key SERIAL PRIMARY KEY,
  soil_type soil_type,
  ph_level ph_level,
  nitrogen_level nutrient_level,
  phosp_level nutrient_level,
  potas_level nutrient_level
);

CREATE TABLE disease(
  disease_key SERIAL PRIMARY KEY,
  disease_name varchar,
  threat_level threat_level,
  care_tips varchar
);

CREATE TABLE plantdisease(
  plant_disease_key SERIAL PRIMARY KEY,
  plant_key int, 
  disease_key int,
  CONSTRAINT fk_plant FOREIGN KEY(plant_key) REFERENCES plant(plant_key),
  CONSTRAINT fk_disease FOREIGN KEY(disease_key) REFERENCES disease(disease_key)
);

CREATE TABLE pest(
  pest_key SERIAL PRIMARY KEY,
  pest_name varchar,
  threat_level threat_level,
  care_tips varchar
);

CREATE TABLE plantpest(
  plant_pest_key SERIAL PRIMARY KEY,
  plant_key int, 
  pest_key int,
  CONSTRAINT fk_plant FOREIGN KEY(plant_key) REFERENCES plant(plant_key),
  CONSTRAINT fk_pest FOREIGN KEY(pest_key) REFERENCES pest(pest_key)
);

CREATE TABLE garden(
  garden_key SERIAL PRIMARY KEY,
  garden_name varchar,
  user_key int,
  soil_key int,
  light_level varchar,
  yesterdaysRain int,
  is_archived boolean,
  CONSTRAINT fk_user FOREIGN KEY(user_key) REFERENCES sproutshareuser(user_key),
  CONSTRAINT fk_soil FOREIGN KEY(soil_key) REFERENCES soil(soil_key)
);


/* No way to edit watering date/planting date at the moment */
CREATE TABLE userplant(
  user_plant_key SERIAL PRIMARY KEY,
  user_key int,
  plant_key int,
  garden_key int, 
  plant_disease_key int, 
  plant_pest_key int,
  plant_qty int,
  planting_date date NOT NULL DEFAULT CURRENT_DATE,
  plant_difficulty int,
  plant_quality int,
  last_watering_date date NOT NULL DEFAULT CURRENT_DATE,
  water_amount float NOT NULL DEFAULT 1.00,
  CONSTRAINT fk_user FOREIGN KEY(user_key) REFERENCES sproutshareuser(user_key),
  CONSTRAINT fk_plant FOREIGN KEY(plant_key) REFERENCES plant(plant_key),  
  CONSTRAINT fk_garden FOREIGN KEY(garden_key) REFERENCES garden(garden_key),
  CONSTRAINT fk_disease FOREIGN KEY(plant_disease_key) REFERENCES plantdisease(plant_disease_key),
  CONSTRAINT fk_pest FOREIGN KEY(plant_pest_key) REFERENCES plantpest(plant_pest_key)
);


/*
Script to create tables in database
*/

INSERT INTO sproutshareuser(first_name, last_name, email_address, username, password, accessToken, lang, zip_code, user_lat, user_long)
VALUES
   ('George', 'Romero', 'george.romero@dotld.com', 'george123', 'password', '0', 'en', '90710', '33.7958', '-118.2965'),
   ('Jiminy', 'Cricket', 'jiminy.cricket@gmail.com', 'thecricket', 'password', '0', 'en', '24061', '37.2209', '-80.4228'),
   ('Albert', 'Albertson', 'al@gmail.com', 'BigAl', 'password', '0', 'en', '23529', '36.8861', '-76.3081'),
   ('Bob', 'Bobertson', 'bob@gmail.com', 'Bobby', 'password', '0', 'en', '23529', '36.8861', '-76.3081'),
   ('Carol', 'Carolson', 'carol@gmail.com', 'Carolina', 'password', '0', 'en', '23529', '36.8861', '-76.3081'),
   ('David', 'Davidson', 'david@gmail.com', 'BigDave', 'password', '0', 'en', '90001', '33.9698', '-118.2468');

\COPY plant(common_name, latin_name, light_level, min_temp, max_temp, rec_temp, hardiness_zone, soil_type, img, water_need) FROM 'plants.csv' WITH DELIMITER ',' HEADER CSV;

INSERT INTO soil (soil_type, ph_level, nitrogen_level, phosp_level, potas_level)
VALUES
   ('silt', 'neutral', 'adequate', 'sufficient', 'surplus'),
   ('clay', 'basic', 'deficient', 'adequate', 'sufficient'),
   ('loamy', 'basic', 'deficient', 'adequate', 'sufficient'),
   ('sandy', 'basic', 'deficient', 'adequate', 'sufficient');

INSERT INTO disease(disease_name, threat_level, care_tips)
VALUES
   ('lycanthropy', 'Threatened', 'Apply Silver Concentrate Vigorously');

INSERT INTO pest(pest_name, threat_level, care_tips)
VALUES
   ('Mite', 'Threatened', 'Apply Chemical Spray');

INSERT INTO plantdisease(plant_key, disease_key)
VALUES 
   (1,1), 
   (2,1), 
   (3,1);

INSERT INTO plantpest(plant_key, pest_key)
VALUES 
   (1,1), 
   (2,1), 
   (3,1);

INSERT INTO garden (user_key, soil_key, light_level, yesterdaysRain, garden_name, is_archived)
VALUES
   (1, 1, 10, 5, 'test garden 1', false),
   (2, 1, 5, 2, 'test garden 2', false), 
   (3, 1, 6, 2, 'test garden 3', false),
   (3, 1, 2, 2, 'test garden 4', false),
   (4, 1, 3, 2, 'test garden 5', false),
   (5, 1, 2, 2, 'test', false),
   (6, 1, 2, 2, 'test garden 6', false);

/*
There are 15 plants, keys are 1-15
*/

INSERT INTO userplant(user_key, plant_key, garden_key, plant_disease_key, 
plant_pest_key, plant_qty, plant_difficulty, plant_quality)
VALUES
  (1, 1, 1, null, null, 10, 5, 4),
  (2, 3, 2, 3, null, 1, 10, 10),
  (3, 12, 3, null, null, 1, 1, 4),
	(3, 10, 4, null, null, 1, 4, 3),
	(3, 15, 3, null, null, 5, 2, 2),
	(4, 1, 5, null, null, 1, 4, 5),
	(4, 4, 5, null, null, 3, 2, 4),
	(3, 7, 3, null, null, 5, 2, 2),
	(3, 11, 4, null, null, 3, 1, 2),
	(5, 11, 6, null, null, 3, 5, 2),
	(5, 6, 6, null, null, 1, 1, 4),
	(5, 15, 6, null, null, 4, 3, 2),
	(5, 11, 6, null, null, 2, 3, 3),
	(5, 1, 6, null, null, 4, 3, 2),
	(3, 13, 3, null, null, 5, 4, 5),
	(3, 2, 4, null, null, 2, 1, 5),
	(5, 15, 6, null, null, 3, 3, 4),
	(4, 10, 5, null, null, 4, 2, 4),
	(5, 3, 6, null, null, 2, 1, 3),
	(3, 14, 3, null, null, 4, 2, 2),
	(5, 12, 6, null, null, 5, 1, 5),
	(4, 4, 5, null, null, 2, 3, 1),
	(5, 14, 6, null, null, 1, 3, 4),
	(3, 11, 4, null, null, 5, 1, 5),
	(4, 15, 5, null, null, 3, 3, 3),
	(4, 8, 5, null, null, 4, 1, 5),
	(4, 15, 5, null, null, 3, 1, 5),
	(4, 1, 5, null, null, 1, 2, 2),
	(5, 7, 6, null, null, 4, 5, 1),
	(5, 14, 6, null, null, 4, 4, 1),
	(3, 14, 3, null, null, 2, 4, 5),
	(3, 2, 4, null, null, 4, 1, 1),
	(5, 14, 6, null, null, 1, 5, 4),
	(5, 6, 6, null, null, 1, 5, 2),
	(3, 12, 3, null, null, 1, 5, 3),
	(3, 10, 4, null, null, 3, 5, 5),
	(5, 7, 6, null, null, 3, 5, 4),
	(4, 10, 5, null, null, 5, 3, 5),
	(3, 2, 3, null, null, 2, 1, 3),
	(4, 3, 5, null, null, 1, 4, 3),
	(3, 9, 4, null, null, 1, 5, 4),
	(5, 15, 6, null, null, 3, 2, 2),
	(3, 3, 3, null, null, 1, 1, 3),
	(5, 13, 6, null, null, 2, 2, 3),
	(3, 12, 4, null, null, 2, 2, 5),
	(5, 9, 6, null, null, 2, 2, 5),
	(4, 4, 5, null, null, 3, 4, 4),
	(4, 3, 5, null, null, 4, 3, 4),
	(4, 8, 5, null, null, 3, 2, 2),
	(4, 2, 5, null, null, 1, 1, 3),
	(5, 8, 6, null, null, 4, 4, 4),
	(3, 12, 3, null, null, 5, 1, 1),
	(4, 1, 5, null, null, 3, 2, 5),
	(3, 1, 4, null, null, 3, 4, 5),
	(5, 7, 6, null, null, 5, 2, 3),
	(4, 1, 5, null, null, 3, 2, 1),
	(3, 3, 3, null, null, 1, 5, 3),
	(5, 13, 4, null, null, 5, 4, 5),
	(3, 14, 3, null, null, 5, 1, 4),
	(3, 5, 4, null, null, 4, 5, 1),
	(5, 3, 6, null, null, 5, 4, 3),
	(3, 11, 3, null, null, 1, 4, 1),
	(6, 13, 7, null, null, 1, 4, 1),
	(6, 11, 7, null, null, 1, 4, 1),
	(6, 14, 7, null, null, 1, 4, 1);


/*
select statements to see if tables are created
*/

SELECT * FROM sproutshareuser;

SELECT * FROM plant;

SELECT * FROM userplant WHERE garden_key = 1;

SELECT * FROM garden;
