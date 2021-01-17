const express = require('express')
const sequlize = require('./db/sequelize')
const Customer = require('./models/customer')
const MailBox = require('./models/mailbox')

const app = express()

// using default json request body parser
app.use(express.json())

module.exports = app