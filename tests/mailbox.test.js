const request = require('supertest')
const MailBox = require('../src/models/mailbox')
const Customer = require('../src/models/customer')
const genMailboxJSON = require('./utils/genMailboxJSON')
const app = require('../src/app')

const resourceURI = "/api/gsuite/v1"

let testCustomerId
const testCustomer = {
  firstName: "Tony",
  lastName: "Stark",
  mobileNumber: "+380993124587",
  userName: "IronMan",
  password: "iloveyou3000"
}

const goodMailbox = {
  aliases: [
    "tonystark@gmail.com",
    "strongest.avanger@gmail.com"
  ],
  primaryEmailAddress: "ironman@gmail.com",
  UUID: ""
}

const badMailbox = {
  aliases: [
    "titan@gmail.com",
    "eggplant@gmail.com"
  ],
  primaryEmailAddress: "thanos&gmail.com",
  UUID: ""
}

let testMailboxId
const testMailbox = {
  aliases: [
    "avan.headquarters@gmail.com"
  ],
  primaryEmailAddress: "avangers@gmail.com",
  UUID: ""
} 

beforeEach(async () => {
  const newCustomer = await Customer.create(testCustomer)
  testCustomerId = newCustomer.UUID
  testMailbox.UUID = goodMailbox.UUID = badMailbox.UUID = testCustomerId
  const newMailbox = await MailBox.create(testMailbox)
  testMailboxId = newMailbox.mailBoxId
})

afterEach(async () => {
  await MailBox.destroy({
    where: {},
    truncate: true
  })
  await Customer.destroy({
    where: {
      UUID: testCustomerId
    }
  })
})


test("It shoud get mailbox by its id", async () => {
  await request(app)
  .get(`${resourceURI}/${testMailboxId}`)
  .send()
  .expect((res) => {
    console.log('get', res.body)
    expect(res.body.primaryEmail).toBe("avangers@gmail.com")
    expect(res.body.emailAliases).toContainEqual({
        "name": "aliasName",
        "value": "avan.headquarters@gmail.com",
        "valueType": "string"
      })
    expect(res.status).toBe(200)
  })
})

test("It should update mailbox primaryEmailAddress field", async () => {
  testMailbox.primaryEmailAddress = "avangersAndGOG@gmail.com"
  await request(app)
  .put(`${resourceURI}/${testMailboxId}`)
  .send(genMailboxJSON(testMailbox))
  .expect((res) => {
    console.log('update', res.body)
    expect(res.body.primaryEmail).toBe("avangersAndGOG@gmail.com")
    expect(res.status).toBe(200)
  })
})

test("It should delete mailbox by its id", async () => {
  await request(app)
  .delete(`${resourceURI}/${testMailboxId}`)
  .send()
  .expect((res) => {
    console.log('delete', res.body)
    expect(res.body.mailboxId).toBe(testMailboxId)
    expect(res.status).toBe(200)
  })
})

test("It should create new mailbox", async () => {
  await request(app)
  .post(resourceURI)
  .send(genMailboxJSON(goodMailbox))
  .expect((res) => {
    console.log('post', res.body)
    expect(res.status).toBe(200)
  })
})

test("It should fail to create new mailbox due to improper email", async () => {
  await request(app)
  .post(resourceURI)
  .send(genMailboxJSON(badMailbox))
  .expect((res) => {
    expect(res.body.error.name).toBe("SequelizeValidationError")
    expect(res.status).toBe(400)
  })
})

test("It should fail to pass json shema validation", async () => {
  badMailbox.primaryEmailAddress = "thanos@gmail.com"
  badMailbox.aliases[0] = "t@.uk"
  await request(app)
  .post(resourceURI)
  .send(genMailboxJSON(badMailbox))
  .expect((res) => {
    expect(res.body.error.name).toBe("JSONSchemaValidationError")
    expect(res.status).toBe(400)
  })
})