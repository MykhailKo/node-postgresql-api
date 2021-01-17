const express = require('express')
const sequlize = require('./db/sequelize')
const customerRouter = require('./routers/customerRouter')
const mailboxRouter = require('./routers/mailboxRouter')
const Customer = require('./models/customer')
const MailBox = require('./models/mailbox')

Customer.sync()
.then(() => {
  console.log('Customer model has been synchronized with DB.')
  MailBox.sync()
  .then(() => console.log('MailBox model has been synchronised with DB.'))
  .catch((err) => console.error(`Error while synchronizing MailBox model with DB: ${err}`))
})
.catch((err) => console.error(`Error while synchronizing Customer model with DB: ${err}`))

const app = express()

// using default json request body parser
app.use(express.json())
// connecting resource routers
app.use(customerRouter)
app.use(mailboxRouter)

module.exports = app