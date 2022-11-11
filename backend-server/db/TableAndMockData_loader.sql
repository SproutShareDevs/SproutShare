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
  zip_code int
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
  user_key int,
  soil_key int,
  light_level varchar,
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
  yesterdaysRain int,
  CONSTRAINT fk_user FOREIGN KEY(user_key) REFERENCES sproutshareuser(user_key),
  CONSTRAINT fk_plant FOREIGN KEY(plant_key) REFERENCES plant(plant_key),  
  CONSTRAINT fk_garden FOREIGN KEY(garden_key) REFERENCES garden(garden_key),
  CONSTRAINT fk_disease FOREIGN KEY(plant_disease_key) REFERENCES plantdisease(plant_disease_key),
  CONSTRAINT fk_pest FOREIGN KEY(plant_pest_key) REFERENCES plantpest(plant_pest_key)
);


/*
Script to create tables in database
*/

INSERT INTO sproutshareuser(first_name, last_name, email_address, username, password, accessToken, lang, zip_code)
VALUES
   ('George', 'Romero', 'george.romero@dotld.com', 'george123', 'password', '0', 'en', '90710'),
   ('Jiminy', 'Cricket', 'jiminy.cricket@gmail.com', 'thecricket', 'password', '0', 'en', '24061');

\COPY plant(common_name, latin_name, light_level, min_temp, max_temp, rec_temp, hardiness_zone, soil_type, img, water_need) FROM 'plants.csv' WITH DELIMITER ',' HEADER CSV;

INSERT INTO soil (soil_type, ph_level, nitrogen_level, phosp_level, potas_level)
VALUES
   ('silt', 'neutral', 'adequate', 'sufficient', 'surplus'),
   ('clay', 'basic', 'deficient', 'adequate', 'sufficient');

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

INSERT INTO garden (user_key, soil_key, light_level)
VALUES
   (1, 1, 10),
   (2, 1, 5);

INSERT INTO userplant(user_key, plant_key, garden_key, plant_disease_key, 
plant_pest_key, plant_qty, plant_difficulty, plant_quality, yesterdaysRain)
VALUES
   (1, 1, 1, null, null, 10, 5, 4, 1),
   (2, 3, 2, 3, null, 1, 10, 10, 2);



/*
select statements to see if tables are created
*/

SELECT * FROM sproutshareuser;

SELECT * FROM plant;

SELECT * FROM userplant WHERE garden_key = 1;

SELECT * FROM disease WHERE disease_name LIKE 'lycan%';