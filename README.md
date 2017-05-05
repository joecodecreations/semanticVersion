
<img src="https://raw.githubusercontent.com/joecodecreations/semanticVersion/master/resources/images/semantic_header.jpg" />


Semanticversion is a global [NPM Module](https://www.npmjs.com/package/semanticversion) and command line tool that helps you easily change your semantic version in your `package.json` file and push the new tag to git.




## Installation
Install globally by running `npm install semanticversion -g`

## Details
A semantic version is divided into several categories including: major, minor and patch. [Read more about semantic versioning](http://semver.org/)

<img src="https://raw.githubusercontent.com/joecodecreations/semanticVersion/master/resources/images/diagram.jpg" />

## Usage

While in the project root, and on the same level where `package.json` is located, you can access **semanticversion** by entering `semanticversion` in the CLI or for a shortcut, use `sv`.


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
