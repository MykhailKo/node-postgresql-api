const request = require('supertest')
const Customer = require('../src/models/customer')
const genCustomerJSON = require('./utils/genCustomerJSON')
const app = require('../src/app')

const resourceURI = "/api/account/v1"
let testCustomerId

const goodCustomer = {
  firstName: "James",
  lastName: "Rhodes",
  mobileNumber: "+380994567843",
  userName: "WarMachine68",
  password: "WARMACHINEROX"
}

const badCustomer = {
  firstName: "Ivan",
  lastName: "Vanko",
  mobileNumber: "+670993124587",
  userName: "Whiplash",
  password: "mybird"
}

const testCustomer = {
  firstName: "Tony",
  lastName: "Stark",
  mobileNumber: "+380993124587",
  userName: "IronMan",
  password: "iloveyou3000"
}

beforeEach(async () => {
  const newCustomer = await Customer.create(testCustomer)
  testCustomerId = newCustomer.UUID
})

afterEach(async () => {
  await Customer.destroy({
    where: {},
    truncate: true,
    cascade: true
  })
})

test("It should get customer by their id", async () => {
  await request(app)
  .get(`${resourceURI}/${testCustomerId}`)
  .send()
  .expect((res) => {
    expect(res.body.serviceCharacteristic[0].value).toBe("Tony")
    expect(res.body.serviceCharacteristic[1].value).toBe("Stark")
    expect(res.body.serviceCharacteristic[2].value).toBe("+380993124587")
    expect(res.body.userName).toBe("IronMan")
    expect(res.status).toBe(200)
  })
})

test("It should update customers firstName field", async () => {
  testCustomer.firstName = "Antony"
  await request(app)
  .put(`${resourceURI}/${testCustomerId}`)
  .send(genCustomerJSON(testCustomer))
  .expect((res) => {
    expect(res.body.serviceCharacteristic[0].value).toBe("Antony")
    expect(res.status).toBe(200)
  })
})

test("It should delete customer by their id", async () => {
  await request(app)
  .delete(`${resourceURI}/${testCustomerId}`)
  .send()
  .expect((res) => {
    expect(res.body.UUID).toBe(testCustomerId)
    expect(res.status).toBe(200)
  })
})

test("It should create new customer.", async () => {
  await request(app)
  .post(resourceURI)
  .send(genCustomerJSON(goodCustomer))
  .expect(200)
})

test("It should fail to create new customer due to wrong mobile number localiztion", async () => {
  await request(app)
  .post(resourceURI)
  .send(genCustomerJSON(badCustomer))
  .expect((res) => {
    expect(res.body.error.name).toBe("SequelizeValidationError")
    expect(res.status).toBe(400)
  })
})

test("It should fail to pass json schema validation", async () => {
  badCustomer.mobileNumber = "+380993124587"
  badCustomer.firstName = "" //should trigger the error
  await request(app)
  .post(resourceURI)
  .send(genCustomerJSON(badCustomer))
  .expect((res) => {
    expect(res.body.error.name).toBe("JSONSchemaValidationError")
    expect(res.status).toBe(400)
  })
})
