module.exports = {
  call: function (i, inquirer, questions, cb) {
    inquirer.prompt(questions[i]).then(function (data) {
      cb(data.value);
    });
  }
};
