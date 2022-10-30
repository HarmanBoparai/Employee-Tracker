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
        choices:["View All Employees","Add Employee","Update Employee Role","View All Roles","Add Role","View All Departments","Add Department","Exit"]
    },
  
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
   return db.query("select * from employee_role",function(data){
        console.table(data)
        return data
    })
}
function viewallemployees(){
  db.query("select * from employee",(err,res)=>{
    console.log(res)
  })
}

function viewalldepartments(){
  db.query("select * from department",(err,res)=>{
    console.log(res)
  })
}

function addemployee(){
  db.query("select * from employee_role",(err,res)=>{
    let role_id =res.map((role)=> {
      return role.id
    })

    
    let addemployeeQuestions =[{
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of the employee?',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of the employee?',
    },
    {
      type: 'list',
      name: 'employee_role',
      message:'Please select employee role?',
      choices:role_id,
  },
  {
      type: 'input',
      name: 'manager_id',
      message: 'What is the id of the manager?',
    },
  
]

inquirer.prompt(addemployeeQuestions).then((answers)=>{
console.log(answers)
db.query(`INSERT INTO EMPLOYEE ( first_name,last_name, role_id,manager_id) VALUES ('${answers.first_name}','${answers.last_name}','${answers.employee_role}','${answers.manager_id}')`,(err,result)=>{
  if(err) console.log(err)
  console.log(result)
})
})
  })

  }
  function updateemployeerole(){
    db.query("select * from employee_role",(err,res)=>{
      let role_id =res.map((role)=> {
        return role.id
      })

      db.query("select * from employee",(err,res)=>{
        let employee_name=res.map((employee)=>{
          return employee.first_name
        })
        let updateemployeeQuestions =[{
          type: 'list',
          name: 'emp_name',
          message: 'Select the employee from below?',
          choices:employee_name,
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Select the role to assign to the employee?',
          choices:role_id,
        },
    
    ]
    inquirer.prompt(updateemployeeQuestions).then((answers)=>{
      db.query(`UPDATE employee SET role_id=${answers.role_id} WHERE first_name='${answers.emp_name}'`,(err,result)=>{
        if(err) console.log(err);
        console.log(result)
      })
    })

      })
  
      
      
  
 
    })
  
    }




generatePrompt();