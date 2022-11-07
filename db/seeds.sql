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