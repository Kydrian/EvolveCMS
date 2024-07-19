const inquirer = require('inquirer');
const { Pool } = require('pg'); // installing pg with variable named "Pool"
const express = require('express'); // installing express with variable named "express"

const PORT = 3001;
const app = express();

app.use(express.json());

const pool = new Pool( // creating new pool object with input values to connect to database
  {
    user: 'postgres',
    password: 'ktg',
    host: 'localhost',
    database: 'business_db',
  },
  console.log('connected to business_db!')
);
pool.connect(); // this connects to the database!

const starter = () => { // starter function that allows user to choose what they want to do
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    })
    .then(answer => { // switch statement is used to move to different functions based on user input
      switch (answer.action) {
        case 'View all departments':// calls viewAllDepartments function if user chooses "View all departments"
          viewAllDepartments();
          break;
        case 'View all roles': // calls viewAllRoles function if user chooses "View all roles"
          viewAllRoles();
          break;
        case 'View all employees': // calls viewAllEmployees function if user chooses "View all employees"
          viewAllEmployees();
          break;
        case 'Add a department': // calls addDepartment function if user chooses "Add a department"
          addDepartment();
          break;
        case 'Add a role': // calls addRole function if user chooses "Add a role"
          addRole();
          break;
        case 'Add an employee': // calls addEmployee function if user chooses "Add an employee"
          addEmployee();
          break;
        case 'Update an employee role': // calls updateEmployeeRole function if user chooses "Update an employee role"
          updateEmployeeRole();
          break;
        case 'Exit':// exits program if user chooses "Exit"
          pool.end();
          break;
      }
    });
};
const viewAllDepartments = () => {
  pool.query('SELECT * FROM departments', (err, res) => { //hardcoded query to view all departments
    if (err) throw err;
    console.table(res.rows);
    starter();
  });
};

const viewAllRoles = () => {
  pool.query('SELECT * FROM role', (err, res) => { //hardcoded query to view all roles
    if (err) throw err;
    console.table(res.rows);//displays query results in a table
    starter();
  });
};

const viewAllEmployees = () => {
  pool.query('SELECT * FROM employee', (err, res) => { //hardcoded query to view all employees
    if (err) throw err;
    console.table(res.rows);//displays query results in a table
    starter();
  });
};

const addDepartment = () => { //inquirer prompt to add a new department
  inquirer
    .prompt({
      name: 'department',
      type: 'input',
      message: 'What department would you like to add?',
    })
    .then(answer => { //hardcoded query to insert new department based on user input
      pool.query(`INSERT INTO departments(name) VALUES('${answer.department}')`, (err, res) => {
        if (err) throw err;
        console.log('Department added successfully!');
        viewAllDepartments(); //displays query results in a table
      });
    });
};

const addRole = () => { //inquirer prompt to add a new role
  inquirer
    .prompt([{
      name: 'role',
      type: 'input',
      message: 'Please enter the name of the role?',

    },
    {
      name: 'salary',
      type: 'input',
      message: 'Please enter the salary for this role?',
    },
    {
      name: 'department',
      type: 'input',
      message: 'What department (id) does this role belong to?',
    },
    ])

    .then(answer => { //hardcoded query to insert new role based on user input
      pool.query(`INSERT INTO role(title, salary, department_id) VALUES('${answer.role}', ${answer.salary}, ${answer.department})`, (err, res) => {
        if (err) throw err;
        console.log('Role added successfully!');
        viewAllRoles(); //displays query results in a table
      });
    });
};
const updateEmployeeRole = () => { //inquirer prompt to update an employee
  inquirer
    .prompt([{
      name: 'employeeID',
      type: 'input',
      message: 'What is the ID of the employee you would like to update?',

    },
    {
      name: 'newRole',
      type: 'input',
      message: 'What is the new role of the employee you want to add?(enter id)',
    },
    {
      name: 'newManager',
      type: 'input',
      message: 'What is the employee ID of the new manager?',
    }
    ])

    .then(answer => { //hardcoded query to update an employee based on user input
      pool.query(`UPDATE employee SET role_id = ${answer.newRole}, manager_id = ${answer.newManager} WHERE id = ${answer.employeeID}`, (err, res) => {
        if (err) throw err;
        console.log('Employee added successfully!');
        viewAllEmployees();//displays query results in a table
      });
    });
};

const addEmployee = () => { //inquirer prompt to add an employee
  inquirer
    .prompt([{
      name: 'firstName',
      type: 'input',
      message: 'Please enter the first name of the employee.',

    },
    {
      name: 'lastName',
      type: 'input',
      message: 'Please enter the last name of the employee.',
    },
    {
      name: 'role',
      type: 'input',
      message: 'What is the role id of the employee?',
    },
    {
      name: 'manager',
      type: 'input',
      message: 'What is the manager id?',
    }
    ])

    .then(answer => { //hardcoded query to insert new employee based on user input
      pool.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('${answer.firstName}', '${answer.lastName}', ${answer.role}, ${answer.manager})`, (err, res) => {
        if (err) throw err;
        console.log('Employee updated!');
        viewAllEmployees(); //displays query results in a table
      });
    });
};

starter();


app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
})