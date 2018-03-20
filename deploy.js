const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

// Have unlocked an account and have a source of ether
const provider = new HDWalletProvider(
  'coin favorite dentist diet chef fossil width blast reunion join tree heart',
  'https://rinkeby.infura.io/dqLl7OJ4TBxdR5MTxx6s'
)
const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address)
}
deploy()
