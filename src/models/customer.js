const { DataTypes, Model, Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')
const validator = require('validator')
const sequelize = require('../db/sequelize')

class Customer extends Model {}

Customer.init({
  UUID: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isValidNumber(value){
        if(!validator.isMobilePhone(value, ['uk-UA'])) throw new Error('Mobile number is improper.')
      }
    }
  },
  userName: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  sequelize,
  modelName: 'Customer',
  tableName: 'CUSTOMER_PROFILE'
})

// hashing account password before storing it
Customer.beforeSave(async (account, options) => {
  try {
    const hashPassword = await bcrypt.hash(account.password, 8)
    account.password = hashPassword
  }catch(err){
    console.log(err)
  }
})

// deleting all mailboxes with a deleted user
Customer.afterDestroy(async (account, options) => {
  try{
    await Gsuite.destroy({
      where: {
        UUID: account.UUID
      }
    })
  }catch(err){
    console.log(err)
  }
})

Customer.sync()
.then(() => console.log('Customer model has been synchronized with DB.'))
.catch((err) => console.error(`Error while synchronizing Customer model with DB: ${err}`))

module.exports = Customer