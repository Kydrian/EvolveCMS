INSERT INTO departments(name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO role(title, salary, department_id) 
VALUES
('Lead Engineer', 150000, 1),  
('Software Engineer', 120000, 1),
('Account Manager', 160000, 2),
('Accountant', 125000, 2);


INSERT INTO employess(first_name, last_name, role_id, manager_id)
VALUES
('kydrian', 'Green', 1, null),
('Kevin', 'Tupik', 2, 1),
('Destiny', 'Brown', 3, null),
('Terri', 'Blue', 4, 3);

