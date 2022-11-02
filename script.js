const inquirer = require("inquirer")
const mysql = require("mysql2/promise")
const cTable = require("console.table");
// ^  allows script.js to use the package.
let connection = null
 mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employees', password: 'password'
  }).then(result=>connection=result).catch(error=>console.log(error))
//   creates connection to database ^

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
                // console.log("view all departments")
                connection.query("select * from department")
                .then(([rows])=>console.table(rows))
                .catch((error)=> console.log(error))
            } else if (answers.options === "view all roles"){
                // console.log("view all roles")
                connection.query("select * from role")
                .then(([rows])=>console.table(rows))
                .catch((error)=> console.log(error))
            } else if (answers.options === "view all employees"){
                // console.log("view all employees")
                connection.query("select * from employee")
                .then(([rows])=>console.table(rows))
                .catch((error)=> console.log(error))
                
                
            } else if (answers.options === "add a department"){
                // console.log("add a department")
                inquirer
                .prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "name",
                        // choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        
                    }
        
                ]) .then(answers=>{
                    // const name = "Throckmorton"
                connection.query(`insert into department (name) values ("${answers.name}")`)
                .then(([rows])=>console.log("added a department"))
                .catch((error)=> console.log(error))
                // query to create a new department^

                })
                
            } else if (answers.options === "add a role"){
                // console.log("add a role")
                inquirer
                .prompt([
                    {
                        type: "input",
                        name: "title",
                        message: "title",
                        // choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "salary",
                        // choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        
                    },
                    {
                        type: "input",
                        name: "department",
                        message: "department",
                        // choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        
                    }
        
        
        
                ]) .then(answers=>{
                    // const name = "Throckmorton"
                connection.query(`insert into role (title, salary, department_id) values ("${answers.title}", ${answers.salary}, (select id from department where name = "${answers.department}"))`)
                // creates a new role within a specific department^
            
                .then(([rows])=>console.log("added a role"))
                .catch((error)=> console.log(error))

                })
            } else if (answers.options === "add an employee"){
                // console.log("add an employee")
                inquirer
                .prompt([
                    {
                        type: "input",
                        name: "first_name",
                        message: "first_name",
                        // choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        
                    },
                    {
                        type: "input",
                        name: "last_name",
                        message: "last_name",
                        // choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        
                    },
                    {
                        type: "input",
                        name: "role",
                        message: "role",
                        // choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        
                    },
                    {
                        type: "input",
                        name: "manager",
                        message: "manager",
                        // choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        
                    }
        
        
        
                ]) .then(answers=>{
                    // const name = "Throckmorton"
                    connection.query(`select id from employee where first_name = "${answers.manager}"`)
                    // getting the id of the employee's manager (if it exists) ^

                    .then (([rows])=>{
                        console.log("rows", rows)
                        const managerId = rows [0] ?.id || null
                        connection.query(`insert into employee (first_name, last_name, role_id, manager_id) values ("${answers.first_name}", "${answers.last_name}", (select id from role where title = "${answers.role}"), ${managerId})`)
                        // creates the employee with a specific role/ and their manager if they have one ^
            
                        .then(([rows])=>console.log("added an employee"))
                        .catch((error)=> console.log(error))

                    })
           

                })
            } else {
                // console.log("update an employee role")
                inquirer
                .prompt([
                    {
                        type: "input",
                        name: "first_name",
                        message: "first_name",
                        // choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        
                    },
                    {
                        type: "input",
                        name: "role",
                        message: "role",
                        // choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        
                    }
        

        
                ]) .then(answers=>{
                    // const name = "Throckmorton"
                connection.query(`update employee set role_id = (select id from role where title = "${answers.role}") where first_name = "${answers.first_name}"`)
                .then(([rows])=>console.log("updated employee"))
                .catch((error)=> console.log(error))
                // query to update an employee and change their role ^

                })

            }

        
    } ) 
} 
inquire() 
