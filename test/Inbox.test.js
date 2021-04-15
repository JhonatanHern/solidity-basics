const assert = require("assert")
const ganache = require("ganache-cli")
const Web3 = require("web3")

const { interface, bytecode } = require("../compile")

const web3 = new Web3(ganache.provider())

let accounts, contract

beforeEach(async () => {})

describe("", () => {
  it("", async () => {
    // get accounts
    accounts = await web3.eth.getAccounts()
    // deploy contracts
    contract = new web3.eth.Contract(JSON.parse(interface))
      .deploy({
        data: bytecode,
        arguments: ["Hello there"],
      })
      .send({
        from: accounts[0],
        gas: "1000000",
        gasPrice: 300,
      })
    console.log(contract)
  })
})
