# Community Calendar Front End

### Scripts

| npm run    | Description                                                                                                                                                                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dev        | Starts a webpack-dev-server for development. Opens in default browser. Automatically updates on save.                                                                                                                                                 |
| build      | Create a minified production build. Files are output to /public. The complete contents of /public are overwritten each time this script is executed. /public is ignored by git. To inspect the output of the build command view the files in /public. |  |
| format     | Recursively format all .js and .jsx files in the /src directory.                                                                                                                                                                                      |
| lint       | Run Eslint and report errors found by recursively searching and analyzing all javascript files in the /src directory.                                                                                                                                 |
| test       | Run the Jest test suite once.                                                                                                                                                                                                                         |
| test:watch | Run the Jest test suite in `watch` mode. The test suite will run when a file used in tests is updated.                                                                                                                                                |

### For VS Code

Install the ESLint extension: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension. Add the following configuration parameters to VS Code settings.json:

```
{
  "prettier.requireConfig": true
}
```

### Environment Variables

Create two files for environment variables: `.env` and `.env.development`.
Use the .env.development file to store secrets for local development.
Use '.env' to test the production build locally.

#### Required env variables:

- REACT_APP_AUTH0_DOMAIN
- REACT_APP_AUTH0_CLIENT_ID
- REACT_APP_AUTH0_API_AUDIENCE
- REACT_APP_APOLLO_SERVER
