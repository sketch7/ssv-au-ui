[projectUri]: https://github.com/sketch7/ssv-au-ui
[projectGit]: https://github.com/sketch7/ssv-au-ui.git
[changeLog]: ./doc/CHANGELOG.md

[contribWiki]: ./doc/CONTRIBUTION.md
[releaseWorkflowWiki]: ./doc/RELEASE-WORKFLOW.md

[npm]: https://www.npmjs.com

# ssv-au-ui
[![Build status](https://ci.appveyor.com/api/projects/status/2e0an5hvxtfs08mf?svg=true)](https://ci.appveyor.com/project/chiko/ssv-au-ui)
[![Build status](https://ci.appveyor.com/api/projects/status/2e0an5hvxtfs08mf/branch/master?svg=true)](https://ci.appveyor.com/project/chiko/ssv-au-ui/branch/master)
[![bitHound Overall Score](https://www.bithound.io/github/sketch7/ssv-au-ui/badges/score.svg)](https://www.bithound.io/github/sketch7/ssv-au-ui)
[![npm version](https://badge.fury.io/js/ssv-au-ui.svg)](https://badge.fury.io/js/ssv-au-ui)

Aurelia web UI components

In order to contribute please read the [Contribution guidelines][contribWiki].

**Quick links**

[Change logs][changeLog] | [Project Repository][projectUri] | [Contribution guidelines][contribWiki]

# Installation

Get library via [npm]
```bash
npm install @ssv/au-ui --save
```

```ts
// register plugin with aurelia.
aurelia.use.plugin("@ssv/au-ui");
```

# Usage

| Feature          | Status                              | Docs              | Issue          |
|------------------|-------------------------------------|-------------------|----------------|
| input            |                         Development | [README][input]   |              - |
| select           |                         Not Started |                   |              - |
| icon             |                         Not Started |                   |              - |
| datepicker       |                         Not Started |                   |              - |
| checkbox         |                         Not Started |                   |              - |
| radio            |                         Not Started |                   |              - |
| alert            |                         Not Started |                   |              - |
| toast            |                         Not Started |                   |              - |
| modal            |                         Not Started |                   |              - |
| badge            |                         Not Started |                   |              - |
| collection       |                         Not Started |                   |              - |
| tab              |                         Not Started |                   |              - |
| progress-bar     |                         Not Started |                   |              - |
| progress-spinner |                         Not Started |                   |              - |

[input]: ./src/input/README.md

# Getting Started

## Setup Machine for Development
Install/setup the following:

- NodeJS v6+
- Visual Studio Code or similar code editor
- TypeScript 2.0+
- Git + SourceTree, SmartGit or similar (optional)
- Ensure to install **global NPM modules** using the following:


```bash
npm install -g git gulp karma-cli
```


### Cloning Repo

- Run `git clone https://github.com/sketch7/ssv-au-ui.git`
- Switch to `develop` branch


## Project Setup
The following process need to be executed in order to get started.

```bash
npm install
```


## Building the code

```
gulp build
```
In order to view all other tasks invoke `gulp` or check the gulp tasks directly.

## Running the tests

```
gulp test
```


## Development utils

### Trigger gulp watch
Handles compiling of changes.
```
gulp watch
```


### Running Continuous Tests
Spawns test runner and keep watching for changes.
```
gulp tdd
```


## Preparation for Release

```
gulp prepare-release --bump major|minor|patch|prerelease (default: patch)
```
Check out the [release workflow guide][releaseWorkflowWiki] in order to guide you creating a release and publishing it.