const inquirer = require('inquirer');
const { Pool } = require('pg');
const express = require('express');

const PORT = 3001;
const app = express();

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
    {
        user: 'postgres',
        password: 'ktg',
        host: 'localhost',
        database: 'business_db',
    },
    console.log('connected to business_db!')
);
pool.connect(); 

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
      .then(answer => {
        switch (answer.action) {
          case 'View all departments':
            viewAllDepartments();
            break;
            case'View all roles':
            viewAllRoles();
            break;
            case'View all employees':
            viewAllEmployees();
            break;
            case'Add a department':
            addDepartment();
            break;
            case'Add a role':
            addRole();
            break;
            case'Add an employee':
            addEmployee();
            break;
            case'Update an employee role':
            updateEmployeeRole();
            break;
            case'Exit':
            exit();
            break;
        }
      });
  
  const viewAllDepartments = () => {
    pool.query('SELECT * FROM departments', (err, res) => {
      if (err) throw err;
      console.table(res.rows);
    });
  };

  const viewAllRoles = () => {
    pool.query('SELECT * FROM role', (err, res) => {
      if (err) throw err;
      console.table(res.rows);
    });
  };

  const viewAllEmployees = () => {
    pool.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
      console.table(res.rows);
    });
  };

  const addDepartment = () => {
    inquirer
      .prompt({
        name: 'department',
        type: 'input',
        message: 'What department would you like to add?',
      })
      .then(answer => {
        pool.query(`INSERT INTO departments(name) VALUES(${answer.department})`, (err, res) => {
          if (err) throw err;
          console.log('Department added successfully!');
          viewAllDepartments();
        });
      });
  };

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
})