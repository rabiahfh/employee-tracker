DROP DATABASE IF EXISTS employeetracker_db;

CREATE DATABASE employeetracker_db;

USE employeetracker_db;

  CREATE TABLE department (
id INT(10) AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL,
 PRIMARY KEY (id)
 ) ;

  CREATE TABLE role (
  id INT (10) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT(10) NOT NULL,
  PRIMARY KEY (id)
  );
    CREATE TABLE employee (
  id INT(10) AUTO_INCREMENT NOT NULL, 
  first_name VARCHAR(30) NOT NULL,
  last_name  VARCHAR(30) NOT NULL,
  role_id INT (10) NOT NULL,
  manager_id INT (10),
	PRIMARY KEY (id)
);

INSERT INTO department (id, name)
VALUES (1, "rabiah");
INSERT INTO role (id, title, salary, department_id )
VALUES (2, " manager",50000.00, 2);

INSERT INTO employee (id, first_name, last_name,
  role_id,  manager_id)
VALUES (3,"Ahmed", "Rockington", 2, 7);


