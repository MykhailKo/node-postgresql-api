const express = require('express')
const mailboxService = require('../services/mailboxService')
const validateJSON = require('../middleware/validateJSON')

const router = new express.Router()

router.post('/api/gsuite/v1', validateJSON('mailbox'), async (req, res) => {
  const mailboxResponse = await mailboxService.createMailBox(req.body)
  if(mailboxResponse.error) res.status(400).send(error)
  res.status(200).send(mailboxResponse)
})

router.get('/api/gsuite/v1/:id', async (req, res) => {
  const _id = req.params.id
  const mailboxResponse = await mailboxService.getMailBoxById(_id)
  if(mailboxResponse.error) res.status(400).send(error)
  res.status(200).send(mailboxResponse)
})

router.put('/api/gsuite/v1/:id', validateJSON('mailbox'), async (req, res) => {
  const _id = req.params.id
  const mailboxResponse = await mailboxService.updateMailBox(_id, req.body)
  if(mailboxResponse.error) res.status(400).send(error)
  res.status(200).send(mailboxResponse)
})

router.delete('/api/gsuite/v1/:id', async (req, res) => {
  const _id = req.params.id
  const mailboxResponse = await mailboxService.deleteMailBoxById(_id)
  if(mailboxResponse.error) res.status(400).send(error)
  res.status(200).send(mailboxResponse)
})

module.exports = router