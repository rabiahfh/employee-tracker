const mysql = require("mysql")
const inquirer = require("inquirer")

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
            choices: ["ADD DEPT. ROLES, EMPLOYEES", "VIEW DEPT., ROLES", "UPDATE EMPLOYEE ROLES"]

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
                ]
                )
                .then(answers => {
                    const { choice } = answers;
                        inquirer.prompt([
                            {
                                type: "list",
                                message: "What would you like to add?",
                                name: "choice",
                                choices: ["Department", "Role", "Employee"]
        
                            }
                        ]
                        )
                     }
        
             })
            }
            else if (choice === "VIEW DEPT., ROLE") {
                // ...
            }
            else {
                connection.end();
                console.log("Goodbye");
            }
        });

}
