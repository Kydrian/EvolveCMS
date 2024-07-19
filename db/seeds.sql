INSERT INTO departments(name)
VALUES
('Engineering'), -- 1
('Finance'); -- 2

INSERT INTO role(title, salary, department_id) 
VALUES
('Lead Engineer', 150000, 1), 
('Software Engineer', 120000, 2);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('kydrian', 'Green', 1, null),
('Kevin', 'Tupik', 2, 1);


