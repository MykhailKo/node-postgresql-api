const genCustomerJSON = (customer) => {
  return {
    "serviceCharacteristic": [
      {
        "name": "firstName",
        "value": customer.firstName,
        "valueType": "string"
      },
      {
        "name": "lastName",
        "value": customer.lastName,
        "valueType": "string"
      },
        {
        "name": "mobileNumber",
        "value": customer.mobileNumber,
        "valueType": "string"
      }
    ],
     "userName": customer.userName,
     "password": customer.password,
  }
}

module.exports = genCustomerJSON