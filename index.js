#!/usr/bin/env node

const options = require('commander'),
  shell = require('shelljs'),
  fs = require('fs'),
  chalk = require('chalk'),
  packageJSON = require('./package.json'),
  app = require('./app/app.js');

options
  .version('1.2.0')
  .usage('[options] <file ...>')
  .option('-i, --type [value]', 'Increment Type(Major, Minor, Patch)')
  .option('-b, --branch [value]', 'Enter the git branch name to push to')
  .option('-m, --message [value]', 'Enter a commit message')
  .parse(process.argv);

let information = {},
  type, branch, message,
  cli = false,
  cliValidateError = false;

if (typeof options.type === 'string') {
  type = options.type.toLowerCase();
}
if (typeof options.branch === 'string') {
  branch = options.branch.toLowerCase();
}
if (typeof options.message === 'string') {
  message = options.message.toLowerCase();
}
if (type) {
  if (type === 'major' || type === 'minor' || type === 'patch') {
    cli = true;
    information.type = type;

    if (branch && !message) {
      cliValidateError = true;
      console.log(chalk.red.bold('[ERROR] ') + chalk.green('Please enter a commit message if you want to push to git using the -m flag'));
    } else {
      if (branch && message) {
        information.repoType = 'other';
        information.github = 'yes';
        information.customBrANCH = branch;
        information.message = message;
      } else {
        information.github = 'no';
      }
    }


  } else {
    cliValidateError = true;
    console.log(chalk.red.bold('[ERROR] ') + chalk.green('You can only select from Major, Minor, Patch using the -t flag'));
  }

}


/* Let's make sure they are in the right place */
if (fs.existsSync('./package.json')) {

  if (cli) {
    /* using CLI flags */
    if (cliValidateError) {
      console.log(chalk.white('Please check errors and try again'));
    } else {
      //no validation errors
      app.introMessage();
      app.showPackageInformation().then(function () {
        app.final(information);
      });


    }

  } else {
    /* No CLI flags, prompt with questions */
    /* Show Current Package Information */
    app.introMessage()
      .then(app.showPackageInformation)
      .then(app.whichBump) // Ask what we are bumping (Major, Minor, Build)
      .then(app.checkGitPush) //Are we pushing to Git (Yes, No)
      .then(app.branchSelection) //Select branch (Master, Dev, Custom)
      .then(app.chooseCustomBranch) //If Custom, enter branch name
      .then(app.enterCommitMessage) //If Git, Show prompt for commit
      .then(app.final); //Wrap up finish
  }
} else {
  console.log(chalk.red.bold('\n [ERROR] ') + chalk.green(' There does not appear to be a package.json file located in this directory'));
  console.log(chalk.yellow('            Please navigate to your application root and try again'));
}
