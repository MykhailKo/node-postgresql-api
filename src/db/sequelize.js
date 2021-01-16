const {Sequelize} = require('sequelize')

// receiving all db credentials from enviromental variables
const dbName = process.env.DB_NAME
const host = process.env.DB_HOST
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

// creating ORM instance
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host,
  dialect: 'postgres'
})

const testConnection = async () => {
  try {
    await sequelize.authenticate()
  }catch(err){
    console.error(`Error connecting to database: ${err}`)
  }
}
testConnection()

module.exports = sequelize