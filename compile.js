const path = require("path")
const fs = require("fs")
const solc = require("solc")

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol")
const source = fs.readFileSync(inboxPath, "utf8")

let output = solc.compile(source, 1)

if (!output.contracts[":SimpleStorage"]) {
  console.log(output)
}

module.exports = output.contracts[":SimpleStorage"]
