const MailBox = require('../models/mailbox')
const sequelize = require('../db/sequelize')

class MailBoxService {
  async createMailBox(mailboxJSON){
    try {
      const mailboxData = MailBoxService.utilizeRequestJSON(mailboxJSON)
      const mailbox = await MailBox.create(mailboxData)
      return MailBoxService.responseJSON(mailbox)
    }catch(error) {return {error}}
  }
  async updateMailBox(id, mailboxJSON){
    try {
      const mailboxData = MailBoxService.utilizeRequestJSON(mailboxJSON)
      await MailBox.update(mailboxData, {
        where: {
          mailBoxId: id
        }
      })
      const mailbox = await MailBox.findOne({
        where: {
          mailBoxId: id
        }
      })
      return MailBoxService.responseJSON(mailbox)
    }catch(error) {return {error}}
  }
  async getMailBoxById(id){
    try {
      const mailbox = await MailBox.findOne({
        where: {
          mailBoxId: id
        }
      })
      return MailBoxService.responseJSON(mailbox)
    }catch(error) {return {error}}
  }
  async getMailBoxesOfCustomer(customerId) {
    try {
      const mailboxes = await MailBox.findAll({
        attributes: ['mailBoxId'],
        where: {
          UUID: customerId
        }
      })
      return await Promise.all(mailboxes.map(async (mailbox) => await this.getMailBoxById(mailbox.mailBoxId)))
    }catch(error) {return {error}}
  }
  async deleteMailBoxById(id){
    try {
      const mailbox = await this.getMailBoxById(id)
      await MailBox.destroy({
        where: {
          mailBoxId: id
        }
      })
      return mailbox
    }catch(error) {return {error}}
  }
  static responseJSON(mailbox){
    return {
      "emailAliases": mailbox.aliases.map((alias) => ({
        "name": "aliasName",
        "value": alias,
        "valueType": "string"
      })),
      "primaryEmail": mailbox.primaryEmailAddress,
      "UUID": mailbox.UUID
    }
  }
  static utilizeRequestJSON(json){
    return {
      primaryEmailAddress: json.primaryEmail,
      aliases: json.emailAliases.map((alias) => alias.value),
      UUID: json.UUID
    }
  }
}

module.exports = new MailBoxService