const mailboxSchema = {
  "title": "mailbox",
  "type": "object",
  "properties": {
    "emailAliases": {
      "type": "array",
      "minItems": 0,
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "const": "aliasName"
          },
          "value": {
            "type": "string"
          },
          "valueType": {
            "const": "string"
          }
        }
      }
    },
    "primaryEmail": {
      "type": "string"
    },
    "UUID": {
      "type": "string"
    }
  },
  "required": ["primaryEmail", "UUID"]
}

module.exports = mailboxSchema