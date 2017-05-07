const fs = require('fs-extra');

module.exports = {
  packageInformation: function (cb) {
    fs.readJson('./package.json')
      .then(jsonObject => {

        let information = {
          version: 'v' + jsonObject.version,
          packageName: jsonObject.name.toUpperCase()
        }
        cb(information);
      })
      .catch(err => {
        console.error(err);
        cb('error');
      });
  }
};
