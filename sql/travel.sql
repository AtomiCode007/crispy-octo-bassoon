create database if not exists crispy_travel;
use crispy_travel;

drop table if exists locations;
create table locations
(
locname varchar(20) NOT NULL,
cost int NOT NULL,
climate int NOT NULL,
activity_level int NOT NULL,
region varchar(20) NOT NULL,
activities varchar(255),
primary key (locname)
);

insert into locations values ('Berlin',3,2,2,'Europe','museum,nightlife');
insert into locations values ('Bahamas',4,4,2,'Island','beach');
insert into locations values ('Cabo',1,3,2,'North America','beach,nightlife');
insert into locations values ('Colorado',1,2,5,'North America','hiking');
insert into locations values ('Kenya',3,3,4,'Africa','hiking');
insert into locations values ('Japan',4,3,3,'Asia','nightlife');
insert into locations values ('Switzerland',3,1,5,'Europe','hiking,skiing,nightlife');
insert into locations values ('Chile',2,3,4,'South America','hiking');
insert into locations values ('Alaska',2,1,5,'North America','hiking,skiing');
insert into locations values ('France',4,2,2,'Europe','nightlife,skiing,hiking');
insert into locations values ('Vietnam',2,4,2,'Asia','hiking');
insert into locations values ('Dubai',5,4,1,'Middle East','nightlife');
insert into locations values ('Egypt',3,4,2,'Africa','museum');
insert into locations values ('Iceland',3,1,5,'Europe','hiking');
insert into locations values ('Hawaii',4,4,2,'Island','beach,hiking');

select * from locations;


drop table if exists users;
create table users
(
lastname varchar(20) NOT NULL,
firstname varchar(20) NOT NULL,
email varchar(30) NOT NULL,
phone varchar(20) NOT NULL,
passwd varchar(20),
primary key (email)
);


drop table if exists trips;
create table trips
(
tripID int NOT NULL,
locname varchar(20) NOT NULL,
email varchar(20) NOT NULL,
primary key (tripID)
);