const mysql = require("mysql")
const inquirer = require("inquirer")
const cTable = require('console.table');

// connect to the database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "8128",
    port: 3306,
    database: "employeetracker_db"
});

connection.connect((err) => {
    if (err) throw err;
    askFirstQuestions();
});

const askFirstQuestions = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: ["ADD DEPT. ROLES, EMPLOYEES", "VIEW DEPARTMENTS, ROLES, OR EMPLOYEES", "UPDATE EMPLOYEE ROLES"]

        }
    ]
    )
        .then(answers => {
            const { choice } = answers;
            if (choice === "ADD DEPT. ROLES, EMPLOYEES") {
                inquirer.prompt([
                    {
                        type: "list",
                        message: "What would you like to add?",
                        name: "choice",
                        choices: ["Department", "Role", "Employee"]

                    }
                ])
                    .then(answers => {
                        const { choice } = answers;
                        if (choice == "Department") {
                            inquirer.prompt([
                                {
                                    type: "input",
                                    message: "Enter the name of the department: ",
                                    name: "department_name",
                                }
                            ])
                                .then(answers => {
                                    const { department_name } = answers;
                                    connection.query('INSERT INTO department (name) VALUES (?)', [department_name], function (error, results, fields) {
                                        if (error) throw error;
                                        askFirstQuestions();
                                    });
                                })

                        } else if (choice == 'Role') {
                            
                            connection.query('SELECT * FROM department', function (error, results, fields) {
    
                                const departments = [];
                                for (let i = 0; i < results.length; i++) {
                                    departments.push(results[i].name);
                                }

                                if (error) throw error;
                                inquirer.prompt([
                                    {
                                        type: "input",
                                        message: "Enter title of role: ",
                                        name: "role_name",
                                    },
                                    {
                                        type: "input",
                                        message: "Enter salary of role: ",
                                        name: "role_salary",
                                    },
                                    {
                                        type: "list",
                                        message: "Select the department you belong to ",
                                        name: "department_name",
                                        choices: departments
                                    
                                    }
                                ])
                                .then(answers => {
                                    const {role_name, role_salary, department_name} = answers;
                                    const department = results.find(department => {
                                        return department.name = department_name;
                                    })
                                    const departmentId = department.id;
                                    connection.query('INSERT INTO role (title, salary, department_id) VALUES(?,?,?)', [role_name, role_salary, departmentId], function (error, results, fields) {
                                        console.log('Role has been added.');
                                        askFirstQuestions();
                                    })
                                })
                            })
                        } else {
                            

                        }
                    })
            }
                            // QUestion to ask which table they want to view

            else if (choice === "VIEW DEPARTMENTS, ROLES, OR EMPLOYEES") {
                inquirer.prompt([

                    {
                        type: "list",
                        message: "What would you like to view?",
                        name: "choice",
                        choices: ["Departments", "Roles", "Employees"]

                    }
                ])
                    .then(answers => {
                        const { choice } = answers;
                        console.log(choice)
                        if (choice === "Departments") {
                            // Tell mysql to go and grab the departments
                            console.log("here")
                            connection.query('SELECT * FROM department', function (error, results) {
                                console.table(results);
                                askFirstQuestions()
                            })
                        } else if (choice == "Roles") {
                            connection.query('SELECT * FROM role', function (error, results) {
                                console.table(results);
                                askFirstQuestions()
                            })


                        } else {
                            connection.query('SELECT * FROM employee', function (error, results) {
                                console.table(results);
                                askFirstQuestions()
                            })

                        }
                    });



                // Depending on what table they want to view, tell your mySQL database to SELECT from that table 
            }
            else if (choice === "UPDATE EMPLOYEE ROLES") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your employee id: ",
                        name: "employeeId"
                    },
                    {
                        type: "input",
                        message: "What is your new role id:",      
                        name: "roleId"
                    },
                ]).then(answers=>{
                    const {employeeId, roleId}= answers
                    connection.query("UPDATE employee set role_id = ? WHERE id = ?", [roleId, employeeId],function(err, results){
                        console.log("employees role has been updated")
                        askFirstQuestions()
                    })
                })
            }
            else {
                connection.end();
                console.log("Goodbye");
            }
        });

}
