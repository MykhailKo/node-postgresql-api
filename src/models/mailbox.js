const { Sequelize, DataTypes, Model } = require('sequelize')
const validator = require('validator')
const sequelize = require('../db/sequelize')
const { required } = require('../middleware/JSONschemas/mailboxSchema')
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
    allowNull: false,
    validate: {
      isValidEmail(value){
        if(!validator.isEmail(value)) throw new Error("Email is improper.")
      }
    }
  },
  aliases: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    validate: {
      isValidEmails(values){
        values.forEach((value) => {
          if(!validator.isEmail(value)) throw new Error("Email alias is improper.")
        })
      }
    }
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

module.exports = MailBox