#!/usr/bin/env node

const program = require('commander'),
  shell = require('shelljs'),
  fs = require('fs'),
  chalk = require('chalk'),
  packageJSON = require('./package.json'),
  app = require('./app/app.js');


console.log(chalk.green('\nWELCOME TO ') + chalk.white.bold('SEMANTIC VERSION') + chalk.green(' !'));
/* Let's make sure they are in the right place */
if (fs.existsSync('./package.json')) {
  /* Show Current Package Information */
  app.showPackageInformation()
    .then(app.whichBump) // Ask what we are bumping (Major, Minor, Build)
    .then(app.checkGitPush) //Are we pushing to Git (Yes, No)
    .then(app.branchSelection) //Select branch (Master, Dev, Custom)
    .then(app.chooseCustomBranch) //If Custom, enter branch name
    .then(app.enterCommitMessage) //If Git, Show prompt for commit
    .then(app.final); //Wrap up finish

} else {
  console.log(chalk.red.bold('\n [WARNING] ') + chalk.green(' There does not appear to be a package.json file located in this directory'));
  console.log(chalk.yellow('            Please navigate to your application root and try again'));
}
