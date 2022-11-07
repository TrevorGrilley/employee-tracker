INSERT INTO department (department_name)
VALUES ("Transportation"),
       ("Hazmat"),
       ("Security"),
       ("HR");

INSERT INTO role (title, salary, department_id)
VALUES
('Transportation Manager', 100000, 1),
('Transportation Supervisor', 50000, 1),

('Hazmat Team Leader', 125000, 2),
('Hazmat Specialist', 100000, 2),

('Head of Security', 115000, 3),
('Security Guard', 75000, 3),

('HR Manager', 180000, 4),
('HR Assistant', 130000, 4);

INSERT into employee (id, first_name, last_name, role_id, manager_id)
VALUES
("Keith", "Urban", 1, NULL),
("Blake", "Shelton", 2, 1),
("Troy", "Mclovin", 3, NULL), 
("Eric", "Spence", 4, 3),
("Michael", "Scott",5, NULL),
("Ryan", "Newman", 6, 5),
("Steve", "Jobs", 7, NULL),
("Bill", "Gates",8, 7);