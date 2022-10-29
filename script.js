const inquirer = require("inquirer")
// ^ to install packages
const mysql = require("mysql2")
const cTable = require("console.table");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employees', password: 'password'
  });

function inquire() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "options",
                message: "What do you want to view?",
                choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],

            }

        ])
        .then((answers) => {
            if (answers.options === "view all departments"){
                console.log("view all departments")
            } else if (answers.options === "view all roles"){
                console.log("view all roles")
            } else if (answers.options === "view all employees"){
                console.log("view all employees")
                
            } else if (answers.options === "add a department"){
                console.log("add a department")
            } else if (answers.options === "add a role"){
                console.log("add a role")
            } else if (answers.options === "add an employee"){
                console.log("add an employee")
            } else {
                console.log("update an employee role")

            }

        
    } ) 
} 
inquire() 
