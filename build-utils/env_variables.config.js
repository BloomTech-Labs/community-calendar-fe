const fs = require('fs')
module.exports = (env, path, dotenv) => {
  //get root path
  const rootPath = path.join(__dirname, '../')

  // default .env file
  const basePath = rootPath + './.env'

  // concat base path with current env
  const envPath = `${basePath}.${env}`

  // check if .env file for current env exist, else use .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath

  // set path parameter in dotenv config
  const fileEnv = dotenv.config({path: finalPath}).parsed

  // format environment variables to nice object
  return Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next])
    return prev
  }, {})
}
