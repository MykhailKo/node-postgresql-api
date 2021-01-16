const express = require('express')
const sequlize = require('./db/sequelize')
const Account = require('./models/account')
const Gsuite = require('./models/gsuite')

const app = express()

// using default json request body parser
app.use(express.json())

const createTestData = async () => {
  const jhon = await Account.create({
    firstName: 'Jhon', 
    lastName: 'Doe', 
    mobileNumber: '+380992454428', 
    userName: 'jhonny',
    password: 'password'
  })
}

//createTestData()

module.exports = app