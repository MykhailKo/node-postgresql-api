const express = require('express')
const sequlize = require('./db/sequelize')
const Customer = require('./models/customer')
const MailBox = require('./models/mailbox')
const customerService = require('./services/customerService')
const mailboxService = require('./services/mailboxService')

const app = express()

// using default json request body parser
app.use(express.json())

const doWork = async () => {
  // const customer = await customerService.createCustomer({
  //   "serviceCharacteristic": [
  //     {
  //       "name": "firstName",
  //       "value": "Jack",
  //       "valueType": "string"
  //     },
  //     {
  //       "name": "lastName",
  //       "value": "Reacher",
  //       "valueType": "string"
  //     },
  //       {
  //       "name": "mobileNumber",
  //       "value": "+380954325134",
  //       "valueType": "string"
  //     }
  //   ],
  //    "userName": "reacher",
  //    "password": "turner"
  // })
  // const customer1 = await customerService.createCustomer({
  //   "serviceCharacteristic": [
  //     {
  //       "name": "firstName",
  //       "value": "Jhon",
  //       "valueType": "string"
  //     },
  //     {
  //       "name": "lastName",
  //       "value": "Doe",
  //       "valueType": "string"
  //     },
  //       {
  //       "name": "mobileNumber",
  //       "value": "+380954325134",
  //       "valueType": "string"
  //     }
  //   ],
  //    "userName": "jonne",
  //    "password": "password"
  // })
  // console.log(customer)
  // const mailbox = await mailboxService.createMailBox({
  //   "emailAliases": [
  //     {
  //       "name": "aliasName",
  //       "value": "headphone.stand@gmail.com ",
  //       "valueType": "string"
  //     },
  //     {
  //       "name": "aliasName ",
  //       "value": "headphone23.stand@gmail.com",
  //       "valueType": "string"
  //     },
  //       {
  //       "name": "aliasName ",
  //       "value": "head.test@gmail.com",
  //       "valueType": "string"
  //     }
  //   ],
  //    "primaryEmail": "headphone@gmail.com ",
  //    "UUID": customer.UUID
  // }
  // )
  const customer = await customerService.getCustomerById("890b5c2c-62e2-4846-b381-c2ce9e3575b1")
  console.log(customer)
}

doWork()

module.exports = app