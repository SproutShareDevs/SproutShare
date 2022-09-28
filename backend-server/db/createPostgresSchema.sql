CREATE TYPE "SoilType" AS ENUM (
  'sandy',
  'silt',
  'clay',
  'loamy'
);

CREATE TYPE "NutrientLevel" AS ENUM (
  'depleted',
  'deficient',
  'adequate',
  'sufficient',
  'surplus'
);

CREATE TYPE "phLevel" AS ENUM (
  'basic',
  'neutral',
  'Acidic'
);

CREATE TYPE "ThreatLevel" AS ENUM (
  'No_Threat',
  'Partial_Threat',
  'Threatened'
);

CREATE TABLE "User" (
  "user_ID" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "email_address" varchar,
  "language" varchar,
  "zip_code" int
);

CREATE TABLE "Plant" (
  "plant_ID" SERIAL PRIMARY KEY,
  "common_name" varchar,
  "latin_name" varchar,
  "light_level" varchar,
  "min_temp" int,
  "max_temp" int,
  "rec_temp" int,
  "hardiness_zone" varchar,
  "soil_type" SoilType,
  "image" varchar
);

CREATE TABLE "UserPlant" (
  "user_plant_ID" SERIAL PRIMARY KEY,
  "user_ID" user_ID,
  "plant_ID" plant_ID,
  "garden_ID" garden_ID,
  "current_disease" disease_ID,
  "current_pest" pest_ID,
  "plant_qty" int,
  "planting_date" date,
  "plant_difficulty" int,
  "plant_quality" int
);

CREATE TABLE "PlantDisease" (
  "plant_ID" plant_ID,
  "disease_ID" disease_ID
);

CREATE TABLE "PlantPest" (
  "plant_ID" plant_ID,
  "pest_ID" pest_ID
);

CREATE TABLE "Soil" (
  "soil_ID" SERIAL PRIMARY KEY,
  "soil_type" SoilType,
  "ph_level" phLevel,
  "nitrogen_level" NutrientLevel,
  "phosp_level" NutrientLevel,
  "potas_level" NutrientLevel
);

CREATE TABLE "Disease" (
  "disease_ID" SERIAL PRIMARY KEY,
  "disease_name" varchar,
  "threat_level" ThreatLevel,
  "care_tips" varchar
);

CREATE TABLE "Pest" (
  "pest_ID" SERIAL PRIMARY KEY,
  "pest_name" varchar,
  "threat_level" ThreatLevel,
  "care_tips" varchar
);

CREATE TABLE "Garden" (
  "garden_ID" SERIAL PRIMARY KEY,
  "user_ID" user_ID,
  "light_level" varchar,
  "soil" soil_ID
);

ALTER TABLE "UserPlant" ADD FOREIGN KEY ("user_ID") REFERENCES "User" ("user_ID");

ALTER TABLE "Soil" ADD FOREIGN KEY ("soil_ID") REFERENCES "Garden" ("soil");

ALTER TABLE "Plant" ADD FOREIGN KEY ("soil_type") REFERENCES "Soil" ("soil_ID");

ALTER TABLE "Disease" ADD FOREIGN KEY ("disease_ID") REFERENCES "UserPlant" ("current_disease");

ALTER TABLE "Pest" ADD FOREIGN KEY ("pest_ID") REFERENCES "UserPlant" ("current_pest");

ALTER TABLE "Plant" ADD FOREIGN KEY ("plant_ID") REFERENCES "UserPlant" ("plant_ID");

ALTER TABLE "Garden" ADD FOREIGN KEY ("garden_ID") REFERENCES "UserPlant" ("garden_ID");

ALTER TABLE "User" ADD FOREIGN KEY ("user_ID") REFERENCES "Garden" ("user_ID");

ALTER TABLE "Plant" ADD FOREIGN KEY ("plant_ID") REFERENCES "PlantDisease" ("plant_ID");

ALTER TABLE "Disease" ADD FOREIGN KEY ("disease_ID") REFERENCES "PlantDisease" ("disease_ID");

ALTER TABLE "Plant" ADD FOREIGN KEY ("plant_ID") REFERENCES "PlantPest" ("plant_ID");

ALTER TABLE "Pest" ADD FOREIGN KEY ("pest_ID") REFERENCES "PlantPest" ("pest_ID");
