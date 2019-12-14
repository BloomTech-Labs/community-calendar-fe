## Community Calendar Front End

### Scripts

dev - run the on your local device in development mode.
build - create a minified production build. Files are output to /dist. The complete contents of /dist are overwritten each time this script is executed. /dist is ignored by git. To inspect the output of the build command and test the production build use a library such as 'http-server' or 'live-server ' and use it to run the /dist folder. Example : `http-server -o dist`
format - recursively format all .js and .jsx files in the /src directory.
lint - Run Eslint and report errors found by recursively searching and analyzing all javascript files in the /src directory.

Install the Prettier extension by Esben Peterson for VS Code. Add the following configuration parameters to VS Code settings.json:

```
{
"editor.defaultFormatter":"esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "prettier.requireConfig": true
```
