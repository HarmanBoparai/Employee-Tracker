DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE  department (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     departmentname VARCHAR(30) NOT NULL
     );

CREATE TABLE employee_role (
     id INT auto_increment PRIMARY KEY NOT NULL,
      title VARCHAR(30) NOT NULL,
      salary DECIMAL NOT NULL,
      department_id INT,
        FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT auto_increment PRIMARY KEY NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
   role_id INT NOT NULL,
   manager_id INT,
  FOREIGN KEY (role_id) References employee_role(id)
   ON DELETE SET NULL
);
