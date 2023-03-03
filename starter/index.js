const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
// console.log(OUTPUT_DIR)
const outputPath = path.join(OUTPUT_DIR, "team.html");
// console.log(outputPath)

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const mainQuestions = [
    {
        type: "input",
        name: "managerName",
        message: "Enter team manager's name"

    },

    {
        type: "input",
        name: "ID",
        message: "Enter employee ID"
    },

    {
        type: "input",
        name: "email",
        message: "Enter email address"
    },

    {
        type: "number",
        name: "officeNumber",
        message: "Enter office number"
    },

    // {
    //     type: "list",
    //     name: "submenu",
    //     choices: ["add an engineer", "add an intern", "Finish building the team"]
           
    // }
];

const option1questions = [

    {
        type: "list",
        name: "submenu",
        choices: ["add an engineer", "add an intern", "Finish building the team"]
           
    },

]

const engineerquestions = [
    
    {
        type: "input",
        name: "engineerName",
        message: "enter engineer name",

    },

    {
        type: "number",
        name: "engId",
        message: "engineer id"
    },

    {
        type: "input",
        name: "engEmail",
        message: "enter engineer email",

    },

    {
        type: "input",
        name: "github",
        message: "enter github username"
    },
  
]

const internQuestions = [ 
    {
        type: "input",
        name: "name",
        message: "Enter your name"
    },

    {

        type: "number",
        name: "id",
        message: "Enter your ID number"

    },

    {
        type: "input",
        name: "email",
        message: "Enter your email address"
    },

    {
        type: "input",
        name: "school",
        message: "Enter your school name"
    }
]



// const writeTofile = (filename, data) => {

//     fs.writeFile(filename, data, err => {
//         err? console.log(err) : console.log("succcess");
//     })
// }

const employees = []

const init = () => {
    inquirer.prompt(mainQuestions).then((data) => {
        
        const manager = new Manager(
            data.managerName,
            data.id,
            data.email,
            data.officeNumber
        )
        employees.push(manager)
        option1()
    



        // writeTofile(outputPath, render(data))

    })
}

const engineerFunc = () => {
    inquirer.prompt(engineerquestions).then((data) => {
        const engineer = new Engineer(
            data.engineerName,
            data.engId,
            data.engEmail,
            data.github
        )
        employees.push(engineer)
        option1();
    })
};

const internFunc = () => {
    inquirer.prompt(internQuestions).then((data) => {
        const intern = new Intern(
            data.name,
            data.id,
            data.email,
            data.school
        )
        employees.push(intern)
        option1()
    })
}


const option1 = () => {
    inquirer.prompt(option1questions).then((data) => {

        if(data.submenu === "add an engineer") {
            engineerFunc();
        } else if(data.submenu === "add an intern"){
            internFunc();
        } else {
        let html = render(employees)
        // console.log(html)

        fs.writeFile(outputPath, html, err => {
            err ? console.error(err) : console.log("sucess!")
        })

        }

        // if(!option1questions.length) {
        //     init()
        // } else {
        //     option1questions()
        // }
        // option1questions()
    })
}

// const option2 = () => {
//     inquirer.prompt(question2questions).then((data) => {
//         console.log(data);
//     })
// }

init()
 