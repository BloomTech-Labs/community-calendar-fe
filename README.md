# Community Calendar Front End

### Scripts

dev - run the on your local device in development mode.  
build - create a minified production build. Files are output to /dist. The complete contents of /dist are overwritten each time this script is executed. /dist is ignored by git. To inspect the output of the build command and test the production build use a library such as 'http-server' or 'live-server ' and use it to run the /dist folder. Example : `http-server -o dist`  
format - recursively format all .js and .jsx files in the /src directory.  
lint - Run Eslint and report errors found by recursively searching and analyzing all javascript files in the /src directory.

### For VS Code

Install the ESLint extension: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension. Add the following configuration parameters to VS Code settings.json:

```
{
  "prettier.requireConfig": true
}
```
#### Required env variables:
- AUTH0_DOMAIN
- AUTH0_CLIENT_ID
- API_AUDIENCE
- APOLLO_SERVER