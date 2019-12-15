const fs = require('fs')
module.exports = (env, path, dotenv) => {
  let fileEnv = null
  //get root path
  const rootPath = path.join(__dirname, '../')
  // production .env file
  const prodEnv = rootPath + '.env'
  // check if production .env file exists
  if (fs.existsSync(prodEnv)) {
    // concat base path with current env
    const envPath = `${prodEnv}.${env.environment}`

    // check if .env file for current env exist, else use .env
    // use for development and testing
    const finalPath = fs.existsSync(envPath) ? envPath : prodEnv

    // set path parameter in dotenv config
    fileEnv = dotenv.config({path: finalPath}).parsed
  }
  // format environment variables to nice object
  const envVars = fileEnv ? {...env, ...fileEnv} : env
  return Object.keys(envVars).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(envVars[next])
    return prev
  }, {})
}
