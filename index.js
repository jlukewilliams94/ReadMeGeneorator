const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt([
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
        message: "Why did you build this projcet?"
    },
    {
        type: "input",
        name: "what",
        message: "What problems does this project overcome?"
    },
    {
        type: "list",
        name: "contributers",
        message: "Did anyone else contribute to this project?",
        choices: ["Yes", "No"]
    }
  ]).then((response) => {
    console.log(response.github)
    const deployedApp = (`https://${response.github}.github.io/${response.githubrepo}/`)
    if (`${response.contributers}` === "Yes"){
        inquirer.prompt ([{
            type: "input",
            name: "contnames",
            message: "What is/are the other contributers Usernames?"
        }]).then((subresp) => {
            console.log(subresp.contnames)
            const contributers = subresp.contnames
        })
    }
    axios.get(`https://api.github.com/users/${response.github}`)
      .then(data => {
        const username = data.data.login
        const profilePic = data.data.avatar_url
        const email = data.data.email
        
    
        // Add badges
      
        //fs.writeFile("README.md", function(err) {
        //})
      })
  })