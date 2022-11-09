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

const db = require('./db/connection');

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

const contActions = () => {
    inquirer.prompt([{
        type: 'confirm',
        message: 'Would you like to make any further selections?',
        name: 'contActions',
        default: false
    }]).then(({contActions}) => {
        if (contActions) {
            return promptUser()
        } db.end()
    })
};

// Option to further view departments
const showDepts = () => {
    const query = db.query('SELECT role.title, role.salary, department.department_name as department_name FROM role LEFT JOIN department on role.department_id = department.id;', (err, res) => {
        if (err) {throw err;}
        console.log('\n');
        console.table(res);
        console.log('----------')

        contActions();
    });
};

//Employees
const showEmployees = () => {
    const query = db.query('SELECT employee.first_name, employee.last_name, role.title as job_title, role.salary, department.department_name as deparment, employee.manager_id FROM employee LEFT JOIN role on employee.role_id = role.id INNER JOIN department on role.department_id = department.id', (err, res) => {
        if (err) {
            throw err;
        } console.table(res)
        console.log('----------')
        contActions();
    });
};

// add a department
const addDept = () => {
    return inquirer.prompt([{
        type: 'input',
        name: 'department_name',
        message: 'Please select a department you would like to add'
    },
    ])
    .then((answer) => {
        console.log(answer.department_name);
        db.query(
            `add into existing departments`,
            {department_name: answer.department_name},
            (err, res) => {
                if (err) {
                    throw err
                }
                console.table(res);
                contActions();
            }
        )
    })
};

//add roles
const addRole = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;

        let deptChoice = res.map(department => ({
            name: department.name, value: department.id
        }));
        //ask question
        inquirer.prompt([{
            type: 'input',
            name: 'title',
            message: 'Please enter a role you would like to add'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter a salary for the role you added'
        },
        {
            type: 'list',
            name: 'department',
            choices: deptChoice,
            message: 'Please enter a department you would like to add the role to'
        }
        ]).then((answer) => {
            console.log(answer.title)
            connection.query(
                'INSERT INTO roles SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department
                },
                function (err, res) {
                    if (err) {
                        throw err
                    }
                    console.table(res);
                    contActions();
                }
            )
        })
    })
};


// add employees
const addEmployee = () => {
    db.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;

        let roleSelection = res.map(role => ({
            name: role.title, value: role.id
        }));
        
        //Questions
        inquirer.prompt([{
            type: 'input',
            name: 'firstName',
            message: 'Please enter the employees first name'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Please enter the employees last name'
        },
        {
            type: 'list',
            name: 'role',
            choices: roleSelection,
            message: 'Please enter the employees title'
        }
        ])
        .then((answer) => {
            db.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role
                },
                (err, res) => {
                    if (err) {
                        throw err
                    }
                    console.table(res);
                    contActions();
                }
            )
        })
    });
};
