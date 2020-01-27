![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg) [![Netlify Status](https://api.netlify.com/api/v1/badges/8c065a2a-b94a-48b5-83ec-55a863c635d5/deploy-status)](https://app.netlify.com/sites/communitycalendar/deploys) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Community Calendar Front End

We create incredible neighborhoods and community spaces through meaningful shared events. You can find the deployed project at [Community Calendar](https://www.communitycalendar.xyz)

## Contributors

| [Skyler Dowdy](https://github.com/skylerwebdev) | [Louis Gelinas](https://github.com/gelinas) | [Lowell Jacobs](https://github.com/lowell1) | [Mark King](https://github.com/markpkng) | [Ben Rogers](https://github.com/thisbenrogers) | [Westley Strellis](https://github.com/wstrellis) |

## Project Overview

[Product Vision](https://www.notion.so/Community-Calendar-Labs-19-25c4624fa8fe46e49361d73215459050)

[UX Design files](https://www.figma.com/file/rMUTr0Y5UBkm7AhAVCMrfW/Community-Calendar)

[Planned Releases](https://www.notion.so/06de41bdd6124a459140e0b943b648a1)

Community Calendar is a single web application built with React and styled using SASS and the Bulma framework. Our data is stored and served by an [Apollo GraphQL server](https://github.com/Lambda-School-Labs/community-calendar-be). Mobile versions of the Community Calendar are under developments simultaneously for [Adroid](https://github.com/Lambda-School-Labs/community-calendar-android) and [iOS](https://github.com/Lambda-School-Labs/community-calendar-ios).

Community Calendar uses the apollo-client library to conduct GraphQL queries and store data in local cache for state management purposes. Authentication of users is accomplished through the Auth0 API.

### Key Features

- View a list of local events (deployed)
- Sort events by how close they are to your neighborhood (RC 2)
- Create new events and manage your events (RC 3)
- RSVP to events (RC 4)
- View events in an interactive map (RC 5)

## Build and Installation

### Scripts

| npm run    | Description                                                                                                                                                                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dev        | Starts a webpack-dev-server for development. Opens in default browser. Automatically updates on save.                                                                                                                                                 |
| build      | Create a minified production build. Files are output to /public. The complete contents of /public are overwritten each time this script is executed. /public is ignored by git. To inspect the output of the build command view the files in /public. |  |
| format     | Recursively format all .js and .jsx files in the /src directory.                                                                                                                                                                                      |
| lint       | Run Eslint and report errors found by recursively searching and analyzing all javascript files in the /src directory.                                                                                                                                 |
| test       | Run the Jest test suite once.                                                                                                                                                                                                                         |
| test:watch | Run the Jest test suite in `watch` mode. The test suite will run when a file used in tests is updated.                                                                                                                                                |

### Environment Variables

Create a file for environment variables: `.env` .

#### Required env variables:

- REACT_APP_AUTH0_DOMAIN
- REACT_APP_AUTH0_CLIENT_ID
- REACT_APP_AUTH0_API_AUDIENCE
- REACT_APP_APOLLO_SERVER
- REACT_APP_MAPBOX

### For developing in VS Code

Install the ESLint extension: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension. Add the following configuration parameters to VS Code settings.json:

```
{
  "prettier.requireConfig": true
}
```

## Styling

This project use Sass for stying. The Bulma library was incorporated to speed up development.

Webpack will convert kabob-case class names in modules to camelCase.

So '.best-class-ever' in App.module.scss must be used in App.jsx as '.bestClassEver'.

Kabob-case class names are not altered for classes created in non-module style sheets.

`src/styles/` - contains classes, mixins, and variables that are used throughout the application.

`src/styles/_variables.scss` - contains variables such as colors, padding, and border radius that can be used within classes and mixins. To override a Bulma variable add a variable with the same name to this file. To use the variables in a component module this file file must be imported.

`src/styles/_mixins.scss` - styles that can be added to classes with `@include mixin_name`. To use the variables in a component module this file file must be imported.

`src/styles/_helper_classes.scss` - utility classes created by the CC devs. These classes are available globally.

`src/styles/_bulma_overrides.scss` - this is used to override the implementation of classes from Bulma. The class will retain any styles that are not altered in this file.

`src/components/**/*.module.scss` - contains styles for a component or group of components.

## Testing

Jest is use for snapshot, unit, and integration tests.

The Testing-Library/React library is used to help test React components. It includes many utilities that simplify setting up and testing React components. '@testing-library/jest-dom' provides additional assertion methods. '@testing-library/user-event' has utilities for simulating user events such as clicking on a button.

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).
