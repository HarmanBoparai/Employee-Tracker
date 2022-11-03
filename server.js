//Packages required for the application
const inquirer = require('inquirer');
const cTable = require('console.table');


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
   return db.query("select * from employee_role",(err,res)=>{
    console.table(res)
    })
}
function viewallemployees(){
  db.query("select employee.id,employee.first_name,employee.last_name,employee_role.title,employee_role.salary,department.departmentname,m.first_name as 'manager_name' FROM employee LEFT JOIN employee_role ON employee.role_id=employee_role.id LEFT JOIN department ON department.id =employee_role.department_id LEFT OUTER JOIN employee m ON employee.manager_id= m.id",(err,res)=>{
    console.table(res)
  })
}

function viewalldepartments(){
  db.query("select * from department",(err,res)=>{
    console.table(res)
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
console.table(answers)
db.query(`INSERT INTO EMPLOYEE (first_name,last_name,role_id,manager_id) VALUES ('${answers.first_name}','${answers.last_name}','${answers.employee_role}','${answers.manager_id}')`,(err,result)=>{
  if(err) console.table(err)
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
        console.table(result)
      })
    })

      })
    })
  
  }

  function addrole(){
    db.query("select * from employee_role",(err,res)=>{
      let department_id =res.map((role)=> {
        return role.id
      })

      let addroleQuestions =[{
        type: 'input',
        name: 'title',
        message: 'What is the name of the role?',
      },
      {
        type: 'input',
        name: 'salary',
        message:'What is the salary of the employee?',
    },

      {
        type: 'list',
        name: 'department_id',
        message:'Which department does employee work for ?',
        choices:department_id,
    },
  ]
  
  inquirer.prompt(addroleQuestions).then((answers)=>{
  console.table(answers)
  db.query(`INSERT INTO EMPLOYEE_ROLE (title,salary,department_id) VALUES ('${answers.title}','${answers.salary}','${answers.department_id}')`,(err,result)=>{
    if(err) console.table(err)
    console.table(result)
  })
  })
    })
  
    }    
      
    function adddepartment(){
        let adddeptQuestion =[{
          type: 'input',
          name: 'departmentname',
          message: 'What is the name of the department?',
        },
      ]
 
      inquirer.prompt(adddeptQuestion).then((answers)=>{
        console.table(answers)
        db.query(`INSERT INTO department (departmentname) VALUES ('${answers.departmentname}')`,(err,result)=>{
          if(err) console.table(err)
          console.table(result)
        })
        })
          }
        
              
            



generatePrompt();