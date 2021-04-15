const path = require("path")
const fs = require("fs")
const solc = require("solc")

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol")
const source = fs.readFileSync(inboxPath, "utf8")

const input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
}

const output = JSON.parse(solc.compile(JSON.stringify(input)))

module.exports = {
  interface: output.contracts["Inbox.sol"].SimpleStorage.abi,
  bytecode: output.contracts["Inbox.sol"].SimpleStorage.evm.bytecode.object,
}
