let questions = require('./questions.js'),
  inquirer = require('inquirer'),
  question = questions.gather();
module.exports = {
  output: function (i, cb) {
    console.log('\n');
    inquirer.prompt(question[i]).then(function (data) {
      cb(data.value);
    });
  }
};
