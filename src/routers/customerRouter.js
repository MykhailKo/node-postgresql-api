const express = require('express')
const customerService = require('../services/customerService')
const validateJSON = require('../middleware/validateJSON')

const router = new express.Router()

router.post('/api/account/v1', validateJSON('customer'), async (req, res) => {
  const customerResponse = await customerService.createCustomer(req.body)
  if(customerResponse.error) res.status(400).send(customerResponse)
  res.status(200).send(customerResponse)
})

router.get('/api/account/v1/:id', async (req, res) => {
  const _id = req.params.id
  const customerResponse = await customerService.deleteCustomerById(_id)
  if(customerResponse.error) res.status(400).send(customerResponse)
  res.status(200).send(customerResponse)
})

router.put('/api/account/v1/:id', validateJSON('customer'), async (req, res) => {
  const _id = req.params.id
  const customerResponse = await customerService.updateCustomer(_id. req.body)
  if(customerResponse.error) res.status(400).send(customerResponse)
  res.status(200).send(customerResponse)
})

router.delete('/api/account/v1/:id', async (req, res) => {
  const _id = req.params.id
  const customerResponse = await customerService.deleteCustomerById(_id)
  if(customerResponse.error) res.status(400).send(customerResponse)
  res.status(200).send(customerResponse)
})

module.exports = router