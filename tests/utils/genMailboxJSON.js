const genMailboxJSON = (mailbox) => {
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

module.exports = genMailboxJSON