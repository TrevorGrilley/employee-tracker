const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const db = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'sqlpassword',
    database: 'employees_db'
});

connection.connect(function (err) {
    if (err) throw err;
    menu();
  });

  actions = [
    'View Departments',
    'View Roles',
    'View Employees',
    'Add Department',
    'Add Role',
    'Add Employee',
    'Update Employee Role',
    'Remove Employee'
]

const promptUser = () => {
    return inquirer
        .prompt(
            [
                 {
                    type: 'list',
                    name: 'answer',
                    message: 'Please make a selection',
                    choices: actions

                }
            ]
        )
        .then(({ answer }) => {
            if (answer === actions[0]) {
                viewDepartments();
            }
            if (answer === actions[1]) {
                viewRoles();
            }
            if (answer === actions[2]) {
                viewEmployees();
            }
            if (answer === actions[3]) {
                addDepartment();
            }
            if (answer === actions[4]) {
                addRole();
            }
            if (answer === actions[5]) {
                addEmployee();
            }
            if (answer === actions[6]) {
                updateEmployee();
            }
            if (answer === actions[7]) {
                deleteEmployee();
            }
        })
};

