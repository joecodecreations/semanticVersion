const program = require('commander'),
  Promise = require('bluebird'),
  shell = require('shelljs'),
  //actual prompts
  prompt = require('./prompts.js'),
  chalk = require('chalk'),
  //grab current version
  grab = require('./grab.js');

module.exports = {

  showPackageInformation: function () {
    return new Promise(function (resolve, reject) {
      let information = grab.packageInformation();
      console.log(chalk.green('\nYour package, ') + chalk.yellow.bold(information.packageName) + chalk.green(', is currently on version ') + chalk.yellow.bold(information.version));
      resolve();

    });
  },
  whichBump: function () {
    return new Promise(function (resolve, reject) {
      prompt.output(0, function (data) {
        var information = {
          'type': data
        };
        resolve(information);
      });
    });
  },
  checkGitPush: function (information) {
    return new Promise(function (resolve, reject) {
      if (information.type !== 'exit/cancel') {
        prompt.output(1, function (data) {
          information.github = data;
          resolve(information);
        });
      } else {
        resolve(information);
      }
    });
  },
  branchSelection: function (information) {
    return new Promise(function (resolve, reject) {
      if (information.github === 'yes') {
        prompt.output(2, function (data) {
          information.repoType = data;
          resolve(information);
        });
      } else {
        resolve(information);
      }
    });
  },
  chooseCustomBranch: function (information) {
    return new Promise(function (resolve, reject) {
      if (information.repoType === 'other') {
        prompt.output(3, function (data) {
          information.customRepo = data;
          resolve(information);
        });
      } else {
        resolve(information);
      }
    });
  },
  enterCommitMessage: function (information) {
    return new Promise(function (resolve, reject) {
      if (information.github === 'yes') {
        prompt.output(4, function (data) {
          information.message = data;
          resolve(information);
        });
      } else {
        resolve(information);
      }
    });
  },
  final: function (information) {

    //if we are not cancelling....
    if (information.type !== 'exit/cancel') {

      //Increase our version number
      var execute = 'npm version ' + information.type + ' -m "' + information.type + ' version incremented ';
      if (information.message !== 'cancel/exit') {
        execute += ('Updated:' + information.message);
      }
      console.log(chalk.green('\nIncremented package to:'));
      shell.exec(execute + '"');

      //if we are sending to github
      if (information.github === 'yes') {
        console.log(chalk.green('\n\nAttempting to push to git...\n'));
        let repository = (information.repoType === 'other' ? information.customRepo : information.repoType);
        execute = 'git add . && git push origin ' + repository + ' && git push origin ' + repository + ' --tags';
        shell.exec(execute);
      }

      var finalMessage = '\n Semantic version successfully updated';
      if (information.github === 'yes') {
        finalMessage += ' and pushed via Git';
      }
      console.log(chalk.white.bold(finalMessage + '! \n'));

      //exit gracefully...
    } else {
      console.log(chalk.white('\nExiting Program\n'));
    }
  }
};
