const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../db/sequelize')
const Account = require('./account')

class Gsuite extends Model {}

Gsuite.init({
  mailBoxId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  primaryEmailAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  aliases: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  UUID: {
    type: DataTypes.UUID,
    references: {
      model: 'CUSTOMER_PROFILE',
      key: 'UUID'
    }
  }
},{
  sequelize,
  modelName: 'Gsuite',
  tableName: 'GOOGLE_MAILBOX'
})

// setting one to many relation(profile can have many mailboxes)
Account.hasMany(Gsuite)

Gsuite.sync()
.then(() => console.log('Gsuite model has been synchronised with DB.'))
.catch((err) => console.log(new Error(`Error while synchronizing Gsuite model with DB: ${err}`)))

module.exports = Gsuite