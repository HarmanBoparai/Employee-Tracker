INSERT INTO department(departmentname)
VALUES ("Management"),
       ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO employee_role(title,salary,department_id) VALUES ("Product Manager",100000,1),
                                                             ("Sales Person",40000,2),
                                                             ("Software Engineer",80000,3),
                                                             ("Finance Manager",90000,4),
                                                             ("Lawyer",75000,2);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Harman", "Boparai", 3, null),
                                                                        ("Jeff", "Bezoz", 4, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Will","Smith",1,1),
                                                                         ("Ashley","Brown",2,2),
                                                                         ("John","Doe",4,1);


        

       

       
