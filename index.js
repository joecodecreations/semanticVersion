#!/usr/bin/env node

let program = require('commander'),
  inquirer = require('inquirer'),
  Promise = require('bluebird'),
  shell = require('shelljs'),
  fs = require('fs'),
  packageJSON = require('./package.json'),
  //actual prompts
  prompt = require('./prompts.js'),
  //List of questions
  questions = require('./questions.js');

console.log('\n');
shell.exec('echo "Welcome to SemanticVersion ' + packageJSON.version + ' !!!"');

// What is changing on the version (Major, minor, patch)?
let gatherType = function () {
  return new Promise(function (resolve, reject) {
    prompt.call(0, inquirer, questions.gather(), function (data) {
      var information = {};
      information.type = data;
      resolve(information);
    });
  });
};

// Are we pushing to Github ?
let gatherGithub = function (information) {
  return new Promise(function (resolve, reject) {
    if (information.type !== 'exit/cancel') {
      prompt.call(1, inquirer, questions.gather(), function (data) {
        information.github = data;
        resolve(information);
      });
    } else {
      resolve(information);
    }
  });
};

//select repo name
let selectRepo = function (information) {
  return new Promise(function (resolve, reject) {
    if (information.github === 'yes') {
      prompt.call(2, inquirer, questions.gather(), function (data) {
        information.repoType = data;
        resolve(information);
      });
    } else {
      resolve(information);
    }
  });
};

//chose custom repo name if selected
let chooseCustom = function (information) {
  return new Promise(function (resolve, reject) {
    if (information.repoType === 'other') {
      prompt.call(3, inquirer, questions.gather(), function (data) {
        information.customRepo = data;
        resolve(information);
      });
    } else {
      resolve(information);
    }
  });
};

//Gather Commit Message
let gatherMessage = function (information) {
  return new Promise(function (resolve, reject) {
    if (information.github === 'yes') {
      prompt.call(4, inquirer, questions.gather(), function (data) {
        information.message = data;
        resolve(information);
      });
    } else {
      resolve(information);
    }
  });
};

if (fs.existsSync('./package.json')) {
  gatherType()
    .then(gatherGithub)
    .then(selectRepo)
    .then(chooseCustom)
    .then(gatherMessage)
    .then(function (information) {

      //if we are not cancelling....
      if (information.type !== 'exit/cancel') {

        //Increase our version number
        var execute = 'npm version ' + information.type + ' -m "' + information.type + ' tag added ';
        if (information.message !== 'cancel/exit') {
          execute += ('Updated:' + information.message);
        }
        console.log("\nIncrementing package to:");
        shell.exec(execute + '"');

        //if we are sending to github
        if (information.github === 'yes') {
          console.log('\n\nAttempting to push to git...');
          let repository = (information.repoType === 'other' ? information.customRepo : information.repoType);
          execute = 'git add . && git push origin ' + repository + ' && git push origin ' + repository + ' --tags';
          shell.exec(execute);
        }

        //Wrap things up
        var finalMessage = '\n Semantic Verson Successfully Incremented';
        if (information.github === 'yes') {
          finalMessage += ' and pushed via git to ' + repository;
        }
        console.log(finalMessage);

        //exit gracefully...
      } else {
        console.log('\nExiting Program');
      }

    });

} else {
  console.log('There does not appear to be a package.json file located in this directory');
  console.log('Please navigate to your application root and try again.');
}
