/*

You do not need to run this script if you have not run the TableAndMockData_loader.sql script yet

1. This script alters the table columns for all of the tables
   - creates the username field in sproutshareuser
   - changes xxx_id to xxx_key, to prevent confusion and stick to SQL norms

2. (optional) Before running the script go to your PostgreSQL\14\bin folder and run the following in the terminal
Fill out the command below

   pg_dump -U $username -W -F p $dbname > 'abs\path\to\file.sql'

this will backup your schema and data 

3. This script can be run in the same manner as TableAndMockData_loader.sql
   
   psql -U $username -d $dbname -a -f SproutShare\backend-server\db\AlterTables.sql

Feel free to ignore or look into errors such as

"ERROR:  column "garden_id" does not exist"
or
"column "pest_key" referenced in foreign key constraint does not exist"

this seems to be an issue with postgres when altering tables, but works out fine usually

4. the last SQL statement should output two rows on the screen

If this breaks your database for some reason, load from backup or the TableAndMockData_loader.sql script
*/

ALTER TABLE sproutshareuser
   RENAME COLUMN user_id TO user_key;

ALTER TABLE sproutshareuser
   ADD username varchar;

ALTER TABLE plant
   RENAME COLUMN plant_id TO plant_key;

ALTER TABLE soil
   RENAME COLUMN soil_id TO soil_key;

ALTER TABLE disease
   RENAME COLUMN disease_id TO disease_key;

ALTER TABLE pest
   RENAME COLUMN pest_id TO pest_key;

ALTER TABLE plantdisease
   RENAME COLUMN plant_disease_id TO plant_disease_key;

ALTER TABLE plantdisease
   RENAME COLUMN plant_id TO plant_key;

ALTER TABLE plantdisease
   RENAME COLUMN disease_id TO disease_key;

ALTER TABLE plantdisease
   DROP CONSTRAINT fk_plant,
   DROP CONSTRAINT fk_disease,
   ADD CONSTRAINT fk_plant FOREIGN KEY(plant_key) REFERENCES plant(plant_key),
   ADD CONSTRAINT fk_disease FOREIGN KEY(disease_key) REFERENCES disease(disease_key);

ALTER TABLE plantpest
   RENAME COLUMN plant_pest_id TO plant_pest_key;

ALTER TABLE plantpest
   RENAME COLUMN plant_id TO plant_key;

ALTER TABLE plantpest
   RENAME COLUMN pest_id TO pest_key;

ALTER TABLE plantpest
   DROP CONSTRAINT fk_plant,
   DROP CONSTRAINT fk_pest,
   ADD CONSTRAINT fk_plant FOREIGN KEY(plant_key) REFERENCES plant(plant_key),
   ADD CONSTRAINT fk_pest FOREIGN KEY(pest_key) REFERENCES disease(pest_key);

ALTER TABLE garden
   RENAME COLUMN garden_id TO garden_key;

ALTER TABLE garden
   RENAME COLUMN user_id TO user_key;

ALTER TABLE garden
   RENAME COLUMN soil_id TO soil_key;

ALTER TABLE garden
   DROP CONSTRAINT fk_user,
   DROP CONSTRAINT fk_soil,
   ADD CONSTRAINT fk_user FOREIGN KEY(user_key) REFERENCES sproutshareuser(user_key),
   ADD CONSTRAINT fk_soil FOREIGN KEY(soil_key) REFERENCES soil(soil_key);

ALTER TABLE userplant
   RENAME COLUMN user_plant_id TO user_plant_key;

ALTER TABLE userplant
   RENAME COLUMN user_id TO user_key;

ALTER TABLE userplant
   RENAME COLUMN plant_id TO plant_key;

ALTER TABLE userplant
   RENAME COLUMN garden_id TO garden_key;

ALTER TABLE userplant
   RENAME COLUMN garden_id TO garden_key;

ALTER TABLE userplant
   RENAME COLUMN plant_disease_id TO plant_disease_key;

ALTER TABLE userplant
   RENAME COLUMN plant_pest_id TO plant_pest_key;

ALTER TABLE userplant
   DROP CONSTRAINT fk_user,
   DROP CONSTRAINT fk_plant,  
   DROP CONSTRAINT fk_garden,
   DROP CONSTRAINT fk_disease,
   DROP CONSTRAINT fk_pest,
   ADD CONSTRAINT fk_user FOREIGN KEY(user_key) REFERENCES sproutshareuser(user_key),
   ADD CONSTRAINT fk_plant FOREIGN KEY(plant_key) REFERENCES plant(plant_key),  
   ADD CONSTRAINT fk_garden FOREIGN KEY(garden_key) REFERENCES garden(garden_key),
   ADD CONSTRAINT fk_disease FOREIGN KEY(plant_disease_key) REFERENCES plantdisease(plant_disease_key),
   ADD CONSTRAINT fk_pest FOREIGN KEY(plant_pest_key) REFERENCES plantpest(plant_pest_key);


SELECT * FROM garden;

SELECT * FROM userplant WHERE garden_key IN (1,2); 