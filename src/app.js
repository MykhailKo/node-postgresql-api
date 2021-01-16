const express = require('express')
const sequlize = require('./db/sequelize')
const Customer = require('./models/customer')
const MailBox = require('./models/mailbox')
const validateSchema = require('./middleware/validateJSON')

const app = express()

// using default json request body parser
app.use(express.json())

const createTestData = async () => {
  const jhon = await Customer.create({
    firstName: 'Jhon', 
    lastName: 'Doe', 
    mobileNumber: '+380992454428', 
    userName: 'jhonny',
    password: 'password'
  })
}

//createTestData()

module.exports = app