const HDWalletProvider = require("truffle-hdwallet-provider")
const Web3 = require("web3")
const { interface, bytecode } = require("./compile")
require("dotenv").config()

const provider = HDWalletProvider(process.env.MNEMONIC, process.env.INFURA_URL)

const web3 = new Web3(provider)

const deploy = async () => {
  let accounts
  try {
    web3.setProvider(provider)
    accounts = await web3.eth.getAccounts()
  } catch (e) {
    console.log("error:", e)
    process.exit(1)
  }
  console.log("deploying from account:", accounts[0])
  let contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: "0x" + bytecode,
      arguments: ["Developer for hire. Contact me at jhonatanhernandez998@gmail.com"],
    })
    .send({ from: accounts[0] })

  console.log("contract deployed to:", contract.options.address)
}

deploy()
