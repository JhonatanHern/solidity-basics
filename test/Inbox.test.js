const assert = require("assert")
const ganache = require("ganache-cli")
const Web3 = require("web3")

const { interface, bytecode } = require("../compile")

const web3 = new Web3(ganache.provider())

var accounts, contract

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  contract = await new web3.eth.Contract(interface)
    .deploy({
      data: bytecode,
      arguments: ["Hello, World!"],
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });
})

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(contract.options.address);
  });

  it("has a default message", async () => {
    const message = await contract.methods.get().call();
    assert.strictEqual(message, "Hello, World!");
  });

  it("can change the message", async () => {
    await contract.methods
      .set("Hello, Computer!")
      .send({ from: accounts[0] });
    const message = await contract.methods.get().call();
    assert.strictEqual(message, "Hello, Computer!");
  });
});
