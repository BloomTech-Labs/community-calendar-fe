# Community Calendar Front End

### Scripts

| npm run | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dev     | Starts a webpack-dev-server for development. Opens in default browser. Automatically updates on save.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| build   | Create a minified production build. Files are output to /dist. The complete contents of /dist are overwritten each time this script is executed. /dist is ignored by git. To inspect the output of the build command and test the production build use a library such as [http-server](https://www.npmjs.com/package/http-server) or [live-server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) and use it to run the /dist folder. Change the working directory to /dist before running the production build. Example : `http-server -o index.html` |  |
| format  | Recursively format all .js and .jsx files in the /src directory.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| lint    | Run Eslint and report errors found by recursively searching and analyzing all javascript files in the /src directory.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

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

- AUTH0_DOMAIN
- AUTH0_CLIENT_ID
- API_AUDIENCE
- APOLLO_SERVER
