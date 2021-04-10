# semantic-release-commitlint

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![GitHub license](https://img.shields.io/github/license/XC-/semantic-release-commitlint)](https://github.com/XC-/semantic-release-commitlint/blob/main/LICENSE)

This plugin is a thin layer on top of conventional-changelog/commitlint packages allowing it to be
used together with semantic-release tool to enforce conventional commits style guide. The reasoning 
to this is, that it is more beneficial to automate the enforcing than having it as a manual part of
code review process. This takes some load away from developers and allows them to prevent merges to
release branches when commits do not follow the convention.

## Installation

`npm install --save-dev semantic-release-commitlint`

Add `semantic-release-commitlint` to semantic-release configuration after `@semantic-release/commit-analyzer`.
The plugin is run in `analyzeCommits` -lifecycle and will throw an error with linting results if linting fails.


## Configuration

Currently the plugin has only one configuration setting:

* `failOnWarning`
    * Type: **Boolean**
    * Default: `false`
    * Description: Normally commitlint warnings are considered as valid, but by setting this to true
      the plugin will throw an error if any warnings have been found.
      