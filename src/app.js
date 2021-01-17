const express = require('express')
const sequlize = require('./db/sequelize')
const customerRouter = require('./routers/customerRouter')
const mailboxRouter = require('./routers/mailboxRouter')

const app = express()

// using default json request body parser
app.use(express.json())
// connecting resource routers
app.use(customerRouter)
app.use(mailboxRouter)

module.exports = app