// Require fs to create new file
const fs = require("fs");
// Require Axios to call the API
const axios = require("axios");
// Require Inquirer to promt the user
const inquirer = require("inquirer");

// Stored the promted questions as a constant to make it global. 
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
        name: "node",
        message: "Does this project require node.js to install?",
        choices: ["Yes", "No"],
        default: "Yes"
    },
    {
        type: "list",
        name: "install",
        choices: ["npm", "yarn"],
        message: "If 'Yes', How would someone install your application?",
        default: "npm"
    },
    {
        type: "list",
        name: "requirements",
        message: "Does this project require Axios, Inquire and/or other JSON package to run?",
        choices: ["Yes","No"]
    },
    {
        type: "input", 
        name: "contributing",
        message: "Who else contributed on this project? [if none press enter to skip]",
        default: "None"
}]

// inquirer prompts through the above questions then stores the answer. 
inquirer
  .prompt(prompts
).then((response) => {
    // Stored the deployed application URL
    const deployedApp = (`https://${response.github}.github.io/${response.githubrepo}/`)
    // If the user requires Node and NPM packages then the below information will populate the Installation, Usage and Test section of the Read Me. 
    let requirements = "";
    let usage = "";
    let test = "";
        if(response.requirements === "Yes" && response.node === "Yes") {
            requirements = `* In your terminal please install package.JSON by entering 'npm init' and completing the prompts in your terminal.`
            usage = `Then install Inquirer, Axios and/or other using ${response.install} i [Inquirer, Axios, etc]`
            test = `* In your terminal please run node index.js to run the file`
        }
    // Axios cal to retrieve GitHub information
    axios.get(`https://api.github.com/users/${response.github}`)
      .then(data => {
        // Github Username
        const username = data.data.login
        // Github ProfilePic URL
        const profilePic = data.data.avatar_url
        //Github Email Address
        const email = data.data.email
        
        // Dynamically build the read me section by section by inputing data as needed. 
        let readMe = 
`# ${response.title} 
## Link to Deployed Project
* ${deployedApp}
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
* Tests
* Questions
## Installation
${requirements}
## Usage
${usage}
## License
![license image](https://img.shields.io/badge/License-${response.license}-brightgreen)
## Contributing
* Project Owner
${username}
* Project Contributers
${response.contributing}
## Tests
${test}
## Questions
* What is my profile picture?
![profile image](${profilePic})
* What is my email address?
${email}
`

        // Function to create new file (GENREADME.md), with store readMe infomation written to file. If there is an error an error will be thrown to user. 
        fs.writeFile("GENREADME.md",readMe ,function(err) {
            if (err) {
                console.log(err);
                throw err;
            } else {
                console.log("Congrats you have generated your read me file")
            }
        })
      })
  })