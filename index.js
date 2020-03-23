const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const prompts = [
    {
        type: "input",
        name: "github",
        message: "What is your GitHub username?"
    },
    {
        type: "input",
        name: "title",
        message: "What is the title of your Project?"
    },
    {
        type: "input", 
        name: "githubrepo",
        message: "What is the exact name of this Projects Github Repo?"
    }, 
    {
        type: "input",
        name: "why",
        message: "Why did you build this project?"
    },
    {
        type: "input",
        name: "what",
        message: "What problems does this project overcome?"
    },
    {
        type: "input",
        name: "learn",
        message: "What new skills did you learn?"
    },
    {
        type: "list",
        name: "license",
        message: "What licenses are you using?",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
    },
    {
        type: "list",
        name: "install",
        choices: ["npm", "yarn"],
        message: "How would someone install your application?",
        default: "npm"
    },
    {
        type: "list",
        name: "requirements",
        message: "Does this project require Axios and/or Inquire to run?",
        choices: ["Yes","No"]
    },
    {
        type: "input", 
        name: "contributing",
        message: "Who else contributed on this project? [if none press enter to skip]"
}]

inquirer
  .prompt(prompts
).then((response) => {
    console.log(response.github)
    const deployedApp = (`https://${response.github}.github.io/${response.githubrepo}/`)
    let requirements = "";
        if(response.requirements === "Yes") {
            requirements = `* In your terminal please install Inquire and/or Axios using ${response.install} i ..`
            console.log(requirements)
        }
    axios.get(`https://api.github.com/users/${response.github}`)
      .then(data => {
        const username = data.data.login
        const profilePic = data.data.avatar_url
        const email = data.data.email
        
        let readMe = 
        ` # ${response.title} 
        ## Project Description
        ### Why did I build this project?
        * ${response.why}
        ### What problems does this project overcome?
        * ${response.what}
        ### What new skills did I learn?
        * ${response.learn}
        ## Table of Contents
        * Installation
        * Usage
        * License
        * Contributing
        * 


        
        `
    
        // Add badges
      
        //fs.writeFile("README.md", function(err) {
        //})
      })
  })