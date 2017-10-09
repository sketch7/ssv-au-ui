[projectUri]: https://github.com/sketch7/ssv-au-ui
[projectGit]: https://github.com/sketch7/ssv-au-ui.git
[changeLog]: ./doc/CHANGELOG.md

[contribWiki]: ./doc/CONTRIBUTION.md
[releaseWorkflowWiki]: ./doc/RELEASE-WORKFLOW.md

[npm]: https://www.npmjs.com

# ssv-au-ui
[![CircleCI](https://circleci.com/gh/sketch7/ssv-au-ui.svg?style=shield)](https://circleci.com/gh/sketch7/ssv-au-ui)
[![bitHound Overall Score](https://www.bithound.io/github/sketch7/ssv-au-ui/badges/score.svg)](https://www.bithound.io/github/sketch7/ssv-au-ui)
[![npm version](https://badge.fury.io/js/%40ssv%2Fau-ui.svg)](https://badge.fury.io/js/%40ssv%2Fau-ui)

UI components library for Aurelia by Sketch7.

*NOTE: This project is under development and is not intended for general production use yet.*

In order to contribute please read the [Contribution guidelines][contribWiki].

**Quick links**

[Change logs][changeLog] | [Project Repository][projectUri] | [Contribution guidelines][contribWiki]

## Installation

Get library via [npm]
```bash
npm install @ssv/au-ui --save

# install peers
npm install normalize-scss node-waves @ssv/core @ssv/au-core aurelia-dependency-injection aurelia-logging --save

```

### Setup Plugin
Register `au-ui` plugin with optional global configuration and bootstrap.

```ts
import { UiConfig, UiBootstrapper, buttonType } from "@ssv/au-ui";

const uiConfig: UiConfig = {
    button: { type: buttonType.raised }
};
// register plugin with aurelia + configure
aurelia.use.plugin("@ssv/au-ui", uiConfig);

aurelia.start().then(() => {
    // invoke bootstrapper to initialize
    const uiBootstrapper = aurelia.container.get(UiBootstrapper) as UiBootstrapper;
    uiBootstrapper.init();
});
```

### Styling

Register sass `includePaths` with the following naming.

```js
"./node_modules/@ssv/au-ui/dist/sass",
"./node_modules/normalize-scss/sass",
"./node_modules/node-waves/src/scss",
```

Configure and import sass.

```scss
// configure/override
$ssv-primary-color: red;

// import all (vendors, core and components)
@import "@ssv/au-ui/all";

// import only vendors
@import "@ssv/au-ui/vendors";

// import only core
@import "@ssv/au-ui/core";

// import only components
@import "@ssv/au-ui/components";
```

Import fonts

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet">
```

## Features

| Feature          | Status                              | Docs              | Issue          |
|------------------|-------------------------------------|-------------------|----------------|
| input            |                             Preview | [README][input]   |              - |
| button           |                             Preview | [README][button]  |              - |
| waves            |                             Preview | [README][waves]   |              - |
| badge            |                             Preview | [README][badge]   |              - |
| icon             |                             Preview | [README][icon]    |              - |
| checkbox         |                             Preview | [README][checkbox]|              - |
| snackbar         |                             Preview | [README][snackbar]|              - |
| select           |                             Preview | [README][select]  |              - |
| chips            |                             Preview | [README][chips]   |              - |
| datepicker       |                         Not Started |                   |              - |
| switch           |                         Not Started |                   |              - |
| radio            |                         Not Started |                   |              - |
| alert            |                         Not Started |                   |              - |
| modal            |                         Not Started |                   |              - |
| collection       |                         Not Started |                   |              - |
| tabs             |                         Not Started |                   |              - |
| progress-bar     |                         Not Started |                   |              - |
| progress-spinner |                         Not Started |                   |              - |
| tooltip          |                         Not Started |                   |              - |
| card             |                         Not Started |                   |              - |
| button toggle    |                         Not Started |                   |              - |

[input]: ./src/input/README.md
[button]: ./src/button/README.md
[waves]: ./src/waves/README.md
[badge]: ./src/badge/README.md
[icon]: ./src/icon/README.md
[checkbox]: ./src/checkbox/README.md
[snackbar]: ./src/snackbar/README.md
[select]: ./src/select/README.md
[chips]: ./src/chips/README.md

## Value Converters

| Value Converters | Status  | Docs                | Issue |
|------------------|---------|---------------------|-------|
| highlight        | Preview | [README][highlight] | -     |

[highlight]: ./src/highlight/README.md

## Getting Started

### Setup Machine for Development
Install/setup the following:

- NodeJS v8+
- Visual Studio Code or similar code editor
- TypeScript 2.5+
- Git + SourceTree, SmartGit or similar (optional)
- Ensure to install **global NPM modules** using the following:


```bash
npm install -g git gulp yarn karma-cli
```


#### Cloning Repo

- Run `git clone https://github.com/sketch7/ssv-au-ui.git`
- Switch to `develop` branch


### Project Setup
The following process need to be executed in order to get started.

```bash
npm install
```


### Building the code

```
gulp build
// or
npm run build
```
In order to view all other tasks invoke `gulp` or check the gulp tasks directly.

### Running the tests

```
gulp test
// or
npm test
```


### Development utils

#### Trigger gulp watch
Handles compiling of changes.
```
gulp watch
// or
npm start
```


#### Running Continuous Tests
Spawns test runner and keep watching for changes.
```
gulp tdd
// or
npm run tdd
```


### Preparation for Release

```
gulp prepare-release --bump major|minor|patch|prerelease (default: patch)
```
Check out the [release workflow guide][releaseWorkflowWiki] in order to guide you creating a release and publishing it.

### Library Size
Will be adding library file sizes once it will be completed.