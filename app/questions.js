module.exports = {
  gather: function () {

    var list = [{
      type: 'list',
      name: 'value',
      message: 'Select which version you want to bump:',
      choices: ['Major', 'Minor', 'Patch', 'Exit/Cancel'],
      filter: function (val) {
        return val.toLowerCase();
      }
    }, {
      type: 'list',
      name: 'value',
      message: 'Commit changes via Git?',
      choices: ['Yes', 'No'],
      filter: function (val) {
        return val.toLowerCase();
      }
    }, {
      type: 'list',
      name: 'value',
      message: 'Select which branch you wish to push to:',
      choices: ['Master', 'Dev', 'Other'],
      filter: function (val) {
        return val.toLowerCase();
      }
    }, {
      type: 'input',
      name: 'value',
      message: 'Enter the name of your branch you wish to push to:'
    }, {
      type: 'input',
      name: 'value',
      message: 'Enter your commit message for your push:'
    }];

    return list;
  }
};
