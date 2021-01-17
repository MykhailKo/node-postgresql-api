const customerSchema = {
  "title": "customer",
  "type": "object",
  "properties": {
    "serviceCharacteristic": {
      "type": "array",
      "minItems": 3,
      "maxItems": 3,
      "items": [
        {
          "type": "object",
          "properties": {
            "name": {
              "const": "firstName"
            },
            "value": {
              "type": "string"
            },
            "valueType": {
              "const": "string"
            }
          },
          "required": ["name", "value", "valueType"]
        },
        {
          "type": "object",
          "properties": {
            "name": {
              "const": "lastName"
            },
            "value": {
              "type": "string"
            },
            "valueType": {
              "const": "string"
            }
          },
          "required": ["name", "value", "valueType"]
        },
        {
          "type": "object",
          "properties": {
            "name": {
              "const": "mobileNumber"
            },
            "value": {
              "type": "string"
            },
            "valueType": {
              "const": "string"
            }
          },
          "required": ["name", "value", "valueType"]
        },
      ]
    },
    "userName": {
      "type": "string"
    },
    "password": {
      "type": "string"
    }
  },
  "required": ["serviceCharacteristic", "password"]
}

module.exports = customerSchema