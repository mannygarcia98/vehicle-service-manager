DROP DATABASE IF EXISTS  vehicle_manager;

CREATE DATABASE  vehicle_manager;

USE vehicle_manager;

CREATE TABLE IF NOT EXISTS `owner` (`id` INTEGER NOT NULL auto_increment , `first_name` VARCHAR(50) NOT NULL, `last_name` VARCHAR(50) NOT NULL, `email` VARCHAR(255) NOT NULL UNIQUE, `password` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS 
`vehicle` (`id` INTEGER NOT NULL auto_increment , 
`year` INTEGER NOT NULL, 
`make` VARCHAR(30) NOT NULL, 
`model` VARCHAR(30) NOT NULL, 
`license_plate` VARCHAR(10) NOT NULL, `owner_id` INTEGER NOT NULL, 
PRIMARY KEY (`id`), FOREIGN KEY (`owner_id`) 
REFERENCES 
`owner` 
(`id`));
