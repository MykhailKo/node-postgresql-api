const { DataTypes, Model, Sequelize } = require('sequelize')
const bcrypt = require('bcrypt')
const validator = require('validator')
const sequelize = require('../db/sequelize')

class Account extends Model {}

Account.init({
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
  modelName: 'Account',
  tableName: 'CUSTOMER_PROFILE'
})

// hashing account password before storing it
Account.beforeSave(async (account, options) => {
  try {
    const hashPassword = await bcrypt.hash(account.password, 8)
    account.password = hashPassword
  }catch(err){
    console.log(err)
  }
})

// deleting all mailboxes with a deleted user
Account.afterDestroy(async (account, options) => {
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

Account.sync()
.then(() => console.log('Account model has been synchronized with DB.'))
.catch((err) => console.log(new Error(`Error while synchronizing Account model with DB: ${err}`)))

module.exports = Account