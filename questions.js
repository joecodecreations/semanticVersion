module.exports = {
  gather: function () {

    var list = [{
      type: 'list',
      name: 'value',
      message: 'What kind of a version update will this be?',
      choices: ['Major', 'Minor', 'Patch', 'Exit/Cancel'],
      filter: function (val) {
        return val.toLowerCase();
      }
    }, {
      type: 'list',
      name: 'value',
      message: 'Commit Changes to Github?',
      choices: ['Yes', 'No'],
      filter: function (val) {
        return val.toLowerCase();
      }
    }, {
      type: 'list',
      name: 'value',
      message: 'Select which repo you wish to push to;',
      choices: ['Master', 'Dev', 'Other'],
      filter: function (val) {
        return val.toLowerCase();
      }
    }, {
      type: 'input',
      name: 'value',
      message: 'Enter your custom repository name:'
    }, {
      type: 'input',
      name: 'value',
      message: 'Enter your commit message for your push:'
    }];

    return list;
  }
};
