const Customer = require('../models/customer')
const mailboxService = require('./mailboxService')

class CustomerService {
  async createCustomer(customerJSON){
    try{
      const customerData = CustomerService.utilizeRequestJSON(customerJSON)
      const customer = await Customer.create(customerData)
      return CustomerService.responseJSON(customer)
    }catch(error) {return {error}}
  }
  async updateCustomer(id, customerJSON){
    try{
      const customerData = CustomerService.utilizeRequestJSON(customerJSON)
      const customer = await Customer.update(customerData, {
        where: {
          UUID: id
        }
      })
      return CustomerService.responseJSON(customer)
    }catch(error) {return {error}}
  }
  async getCustomerById(id){
    try{
      const customer = await Customer.findOne({
        where: {
          UUID: id
        }
      })
      return CustomerService.responseJSON(customer)
    }catch(error) {return {error}}
  }
  async deleteCustomerById(id){
    try{
      const customer = await Customer.destroy({
        where: {
          UUID: id
        }
      })
      return CustomerService.responseJSON(customer)
    }catch(error) {return {error}}
  }
  static async responseJSON(customer){
    return {
      "UUID": customer.UUID,
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
      "mailboxes": await mailboxService.getMailBoxesOfCustomer(customer.UUID)
   }  
  }
  static utilizeRequestJSON(json){
    return {
      firstName: json.serviceCharacteristic[0].value,
      lastName: json.serviceCharacteristic[1].value,
      mobileNumber: json.serviceCharacteristic[2].value,
      userName: json.userName,
      password: json.password
    }
  }
}

module.exports = new CustomerService