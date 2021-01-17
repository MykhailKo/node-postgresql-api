const Ajv = require('ajv').default
const customerSchema = require('./JSONschemas/customerSchema')
const mailboxSchema = require('./JSONschemas/mailboxSchema')

const ajv = new Ajv({ allErrors:true, removeAdditional:'all' })

ajv.addSchema(customerSchema, 'customer')
ajv.addSchema(mailboxSchema, 'mailbox')

const errorResponse = (schemaErrors) => { 
  const errors = schemaErrors.map((error) => {
    return {
      path: error.dataPath,
      message: error.message
    }
  })
  return {
    status: 'failed',
    errors: errors
  }
}

const validateSchema = (schemaName) => {
  return (req, res, next) => {
    let valid = ajv.validate(schemaName, req.body)
    if (!valid) {
      return res.send(errorResponse(ajv.errors))
    }
    next()
  }
}

module.exports = validateSchema