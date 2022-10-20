//Packages required for the application
const inquirer = require('inquirer');

// Import and require mysql2
const mysql = require('mysql2');

//Creating Connection to database

const db = mysql.createConnection(
    {
      host: 'localhost',
      user:'root',
      password:'amanjots30',
      database:'employee_db',
    },
);

const generatePrompt = () => {
    inquirer
    .prompt([
      {
        type: 'list',
        name: 'options',
        message:'What would you like to do?',
        choices:["View All Employees","Add Employee","Update Employee Role","View All Roles","Add Role","View All Departments","Add Department"]
    },
    // //{
    //     type: 'input',
    //     name: 'first_name',
    //     message: 'What is the first name of the employee?',
    //   },
    //   {
    //     type: 'input',
    //     name: 'last_name',
    //     message: 'What is the last name of the employee?',
    //   },
    //   {
    //     type: 'list',
    //     name: 'employee_role',
    //     message:'Please select employee role?',
    //     choices:["Product Manager","Sales Person","Software Engineer","Finance Manager","Lawyer"]
    // },
    // {
    //     type: 'input',
    //     name: ' Manager_name',
    //     message: 'What is the last name of the manager?',
    //   },
    ]
    ).then(function(answers){
      if(answers.options==="View All Employees"){
    viewallemployees()
      }
      else if(answers.options==="Add Employee"){
    addemployee()
      }
      else if(answers.options==="Update Employee Role"){
        updateemployeerole()
      }
      else if(answers.options==="View All Roles"){
        viewallroles()
      }
      else if(answers.options==="Add Role"){
        addrole()
      }
      else if(answers.options==="View All Departments"){
        viewalldepartments()
      }
      else if(answers.options==="Add Department"){
        adddepartment()
      }
     

    })
}
function viewallroles(){
    db.query("select * from employee_role",function(data){
        console.table(data)
    })
}