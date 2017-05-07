const mocha = require('mocha'),
  expect = require('chai').expect,
  Promise = require('bluebird'),
  prompt = require('../app/prompts.js'),
  questions = require('../app/questions.js'),
  grab = require('../app/grab.js');

describe('Questions', function () {
  it('Questions should return array', function () {
    var question = questions.gather(function () {
      expect(question).to.be.a('array');
      done()
    });
  });
});
