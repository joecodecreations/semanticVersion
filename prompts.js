module.exports = {
  call: function (i, inquirer, questions, cb) {
    console.log("\n\n");
    inquirer.prompt(questions[i]).then(function (data) {
      cb(data.value);
    });
  }
};
