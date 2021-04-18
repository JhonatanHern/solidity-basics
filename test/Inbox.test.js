const assert = require("assert")
const ganache = require("ganache-cli")
const Web3 = require("web3")

const { interface, bytecode } = require("../compile")

const web3 = new Web3(ganache.provider())

let accounts, inbox

beforeEach(async () => {
  // get accounts
  accounts = await web3.eth.getAccounts()
  // deploy contracts
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hello there"],
    })
    .send({
      from: accounts[0],
      gas: "1000000",
      gasPrice: 300,
    })
})

describe("Inbox", () => {
  it("Deploys", async () => {
    assert.ok(inbox.options.address)
  })
  it("I can fetch the message", async () => {
    const message = await inbox.methods.storedData().call()
    assert.equal(message, "Hello there")
  })
  it("I can change the message", async () => {
    await inbox.methods.set("bye").send({ from: accounts[0] })
    const message = await inbox.methods.storedData().call()
    assert.equal(message, "bye")
  })
})
