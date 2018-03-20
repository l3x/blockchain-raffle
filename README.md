# A Fair Event Raffle App on the Blockchain

<img align="right" width="60%" src="https://github.com/l3x/blockchain-raffle/blob/master/blockchain-raffle.png">

One of the hardest problems to solve when creating a distributed application that lives on the Etehereum blockchain is to derive a truly random number that is immune to manipulation by Ethereum miners.

The event raffle algorithm requires that one winner be selected randomly, i.e, the red circle.

This demo shows us how we can use Keep's Random Beacon implementation to solve this problem.


## Steps

### 1 New raffle
Jackpot is empty, no players entered

### 2 Player 1 joins
Player 1 enters raffle by submitting at least the minimumn entry fee

### 3 Player 2 joins
Player 2 enters raffle by submitting at least the minimumn entry fee

### 4 Manager picks winnner
The manager randomly picks a winner

### 5 Winner gets jackpot
The jackpots is awarded to the winner

### 6 Reset/clear players and jackpot
Jackpot is empty, no players entered



## Event Raffle

This application models an event raffle.  Raffles are similar to lotteries, with a few exceptions.

| Element | Lottery  | Raffle |
| :------- |:---------|:-------|
|Run By|	State run|	Charity run and governed by regulatory body|
|Term	|Short-term	|Longer term, exception allowed for event based bearer raffles|
|Participation Requirement|	Bearer certificates (personal information not taken)|	Personal info required unless event based bearer raffle|
|Roll Over	|There may or may not be a winner for each draw	|Definite winner|
|Jackpot Distribution|	Jackpot is shared amongst winners	|Jackpot is not shared|
|Ticket Number |Scheme	Choose your ticket number or randomized ticket numbers available	|Randomized draw numbers only|
|Prize Pool	|Prize pool grows if there is no winner	|Prize pool does not accumulate past draw|
|Number of Tickets|	No restriction on the number of tickets sold|	Limits the amount of tickets sold|
|Duplicate Tickets|	Allows duplicate tickets	|Does not allow duplicate tickets|


## Install app

```
git clone https://github.com/l3x/blockchain-raffle.git && cd blockchain-raffle
npm i 
```

## Run tests

```
npm run test 
```

Your output should look like this:
```
$ npm run test

> blockchainRaffle@0.0.2 test /Users/lex/dev/dapp/blockchain-raffle
> mocha

Keccak bindings are not compiled. Pure JS implementation will be used.


  EventRaffle Contract
    ✓ deploys a contract
    ✓ allows one account to enter (50ms)
    ✓ allows multiple accounts to enter (96ms)
    ✓ requires a minimum amount of ether to enter
    ✓ only manager can call pickWinner
    ✓ winner gets jackpot (58ms)
    ✓ picking winner resets players array and jackpot balance (73ms)
    ✓ randomly selects a winner (1626ms)


  8 passing (2s)
```


## Prerequistes

[npm](https://www.npmjs.com/get-npm) must be installed.


## Notes

* We use [Solidity](https://github.com/ethereum/solidity) to create our EventRaffle.sol Ethereum [smart contract](https://en.wikipedia.org/wiki/Smart_contract).

* We use [Ganache](http://truffleframework.com/ganache/) to create a virtual [Ethereum](https://www.ethereum.org/) blockchain, and it generates some fake accounts that our [Mocha](https://mochajs.org/) Javascript tests use.

* Ether is the cryptocurrency we use to test our smart contract.

* The Ethereum Virtual Machine [EVM](https://en.wikipedia.org/wiki/Ethereum) is the runtime environment for smart contracts in Ethereum. 

* When we use Ganache, our network of nodes and EVM live within our web browser.  Later, we'll use public test networks.  When we use the main network, it will cost money to run transactions, until then we're using play money.

* When we execute smart contract methods that modify data, it costs a small amount of [Ether](https://www.ethereum.org/ether).  This is called "[gas](https://ethereum.stackexchange.com/questions/3/what-is-meant-by-the-term-gas)".  Gas is an internal transaction pricing mechanism which is used to mitigate spam and allocate resources on the network.  


## Roadmap

| Version | Description |
| :------ |:------------|
| 1.0.0 | Smart contract, Mocha test framework using Ganache |
| 2.0.0 | Client application using [ReactJS](https://reactjs.org/) and [Metamask](https://metamask.io/) |
| 3.0.0 | Client application using the [Rinkeby](https://rinkeby.etherscan.io/) test network, not dependent on [Metamask](https://metamask.io/) |
| 4.0.0 | Client application using the [Keep](https://keep.network/) Random Beacon |

## References

[Raffle Vs Lottery](http://raffle.expert/raffle-vs-lottery/)

### Official Keep Links
| Desciption | Official Link  |
| :------- |:---------|
|Official Website | https://keep.network/|
|Official Twitter | https://twitter.com/keep_project|
|Official Slack | https://keep-network.slack.com|
|Official Medium | https://blog.keep.network|
|Official Reddit | https://www.reddit.com/r/KeepNetwork/|
|Official Telegram | https://t.me/KeepNetworkOfficial|

