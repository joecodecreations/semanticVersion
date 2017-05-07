
<img src="https://raw.githubusercontent.com/joecodecreations/semanticVersion/master/resources/images/semantic_header.jpg" />

[![CircleCI](https://circleci.com/gh/joecodecreations/semanticVersion/tree/master.svg?style=svg)](https://circleci.com/gh/joecodecreations/semanticVersion/tree/master) [![NSP Status](https://nodesecurity.io/orgs/joecodecreations/projects/3edb22ec-7826-41de-a099-f2057a3b8e63/badge)](https://nodesecurity.io/orgs/joecodecreations/projects/3edb22ec-7826-41de-a099-f2057a3b8e63) ![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)[![npm](https://img.shields.io/npm/dw/localeval.svg)](https://www.npmjs.com/package/semanticversion)


**semanticversion** is a global [NPM Module](https://www.npmjs.com/package/semanticversion) and command line tool that helps you easily change your semantic version in your `package.json` file and push the new tag to git.




## Installation
Install globally by running `npm install semanticversion -g`

## Details
A semantic version is divided into several categories including: major, minor and patch. [Read more about semantic versioning](http://semver.org/)

<img src="https://raw.githubusercontent.com/joecodecreations/semanticVersion/master/resources/images/diagram.jpg" />

## Usage

While in the project root, and on the same level where `package.json` is located, you can run **semanticversion** by entering `semanticversion` in the CLI or simply `sv` as a shortcut.  


## Options
Select from the following options:

* Select the semantic version you want to bump:
  * Major
  * Minor
  * Patch


* Commit to Git?
  * Yes
  * No


* Select which branch you wish to push to:
  * Master
  * Dev
  * Other


The system will prompt you for a commit message if you are wanting to push your tags and code using Git.
