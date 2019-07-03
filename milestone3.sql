CREATE DATABASE vacation_db;

\c vacation_db;

CREATE TABLE IF NOT EXISTS destinations(Destination_Name text, Cost_Destination text, Activity_Destination text, Climate_Destination text);
CREATE TABLE IF NOT EXISTS users(user_id text, email text, password text);
CREATE TABLE IF NOT EXISTS trips_booked(trip_id SMALLINT NOT NULL, destination_name text, user_id text);

INSERT INTO destinations(Destination_Name, Cost_Destination, Activity_Destination, Climate_Destination)
VALUES('London','high','museum','temperate'),('Munich', 'medium','Oktoberfest', 'temperate'),('Fiji', 'high','beach','tropical'),('Cabo','low','beach','sub_tropical'),('Juneau','medium','whale watching', 'cold');

INSERT INTO users(user_id,email,password)
VALUES('alec','albo9014@colorado.edu','123password'),('ryho8890', 'ryho8890@colorado.edu', '567password'),('johnny','johnny.appleseed@gmail.com','apples_1'),('jbc', 'jimbeam@colorado.edu', 'osdupper998');

INSERT into trips_booked(trip_id, destination_name, user_id)
values(1,'London','alec'),(2,'Fiji','johnny'),(3,'Munich','jbc');