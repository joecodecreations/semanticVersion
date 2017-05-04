module.exports = {
  call: function (i, inquirer, questions, cb) {
    console.log("\n");
    inquirer.prompt(questions[i]).then(function (data) {
      cb(data.value);
    });
  }
};
