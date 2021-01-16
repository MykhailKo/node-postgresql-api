const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../db/sequelize')
const Customer = require('./customer')

class MailBox extends Model {}

MailBox.init({
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
Customer.hasMany(MailBox)

MailBox.sync()
.then(() => console.log('MailBox model has been synchronised with DB.'))
.catch((err) => console.error(`Error while synchronizing MailBox model with DB: ${err}`))

module.exports = MailBox