const jsonfile = require('jsonfile')
const path = require('path')

const packageFilepath = path.resolve(__dirname, '../package.json')
const swaggerFilepath = path.resolve(__dirname, '../docs/swagger.json')

let packageInfo = jsonfile.readFileSync(packageFilepath)
let swaggerInfo = jsonfile.readFileSync(swaggerFilepath)

swaggerInfo.info.version = packageInfo.version

jsonfile.writeFileSync(swaggerFilepath, swaggerInfo, { spaces: 2 })
