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
            "type": "string",
            "minLength": 6,
            "maxLength": 100
          },
          "valueType": {
            "const": "string"
          }
        },
        "required": ["name", "value", "valueType"]
      }
    },
    "primaryEmail": {
      "type": "string",
      "minLength": 6,
      "maxLength": 100
    },
    "UUID": {
      "type": "string",
      "minLength": 36,
      "maxLength": 36
    }
  },
  "required": ["primaryEmail", "UUID"]
}

module.exports = mailboxSchema