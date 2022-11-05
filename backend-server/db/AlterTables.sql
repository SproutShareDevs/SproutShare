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
   ADD password varchar;

ALTER TABLE sproutshareuser
   ADD accessToken varchar;

SELECT * FROM sproutshareuser;
SELECT * FROM userplant WHERE garden_key IN (1,2); 