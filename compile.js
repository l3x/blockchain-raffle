const path = require('path')
const fs = require('fs')
const solc = require('solc')

const contractPath = path.resolve(__dirname, 'contracts', 'EventRaffle.sol')
const source = fs.readFileSync(contractPath, 'utf8')

//console.log(solc.compile(source, 1))
module.exports = solc.compile(source, 1).contracts[':EventRaffle']

// In deploy.js...
// const { interface, bytecode } = require('./compile')

