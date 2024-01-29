--The following seeds are used to popular the database 


--  Sample seeds for 'department' 
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Human Resources');
INSERT INTO department (name) VALUES ('Marketing');

-- Sample seeds for 'role' 
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 70000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Senior Engineer', 90000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('HR Manager', 75000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Recruiter', 50000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Coordinator', 60000, 3);

--  Sample seeds for 'employee'
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Max', 'Doe', 1, 1,90000);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Kat', 'Smith', 2, NULL, 75000);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Len', 'Jones', 2, NULL, 50000);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Tay', 'Doe', 3, NULL, 60000);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Jabocs', 1, NULL, 70000);




-- the rest of the seeds are not neccessary in here, but i did it for me 



-- Sample seeds for UPDATE manager_id of a employee 
UPDATE employee SET manager_id = ? WHERE id = ?;


-- sample seed for getsupervisor 
SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS name 
FROM employee e 
WHERE e.manager_id = ?;
