const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const provider = ganache.provider()
const web3 = new Web3(provider)
const {interface, bytecode} = require('../compile')

require('events').EventEmitter.defaultMaxListeners = 30;

let eventRaffle
let accounts
const EXPECTED_ERR_MSG = 'VM Exception while processing transaction: revert'
const TIMES_TO_RUN_RAFFLE = 20


// eventRaffleWithTwoPlayers(accounts[0], accounts[1], accounts[2])
// returns [timesPlayer1Won, timesPlayer2Won]
var eventRaffleWithTwoPlayers = async (timesToRunEventRaffle, managerAcct, player1Acct, player2Acct) => {
    let timesPlayer1Won = 0
    let timesPlayer2Won = 0
    for (var i = 0; i < timesToRunEventRaffle; i++) {

        // player1 enters eventRaffle
        await eventRaffle.methods.enter().send({
            from: player1Acct,
            value: web3.utils.toWei('0.02', 'ether')
        })

        // player2 enters eventRaffle
        await eventRaffle.methods.enter().send({
            from: player2Acct,
            value: web3.utils.toWei('0.02', 'ether')
        })

        const player1InitialBalance = await web3.eth.getBalance(player1Acct)
        const player2InitialBalance = await web3.eth.getBalance(player2Acct)


        // Jackpot balance is player1 + player2
        const jackpotBalance = await eventRaffle.methods.getJackpotBalance().call({
            from: managerAcct
        })
        const jackpotBalanceEth = web3.utils.fromWei(jackpotBalance+'', 'ether')
        // assert.equal('0.04', jackpotBalanceEth)

        // manager picks winner
        await eventRaffle.methods.pickWinner().send({
            from:  managerAcct
        })

        // winner has correct amount of money
        const player1FinalBalance = await web3.eth.getBalance(player1Acct)
        const player2FinalBalance = await web3.eth.getBalance(player2Acct)

        if (player2InitialBalance == player2FinalBalance) {
            const difference1 = player1FinalBalance - player1InitialBalance
            timesPlayer1Won += 1
            // assert(difference1 > web3.utils.toWei('0.01', 'ether'))
        } else if (player1InitialBalance == player1FinalBalance) {
            const difference2 = player2FinalBalance - player2InitialBalance
            timesPlayer2Won += 1
            // assert(difference2 > web3.utils.toWei('0.01', 'ether'))
        } else {
            assert(false) // neither player won (error)
        }
    }
    return [timesPlayer1Won, timesPlayer2Won]
}

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()

    eventRaffle = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' })
})

describe('EventRaffle Contract', () => {

    it('deploys a contract', () => {
        assert.ok(eventRaffle.options.address)
    })


    it('allows one account to enter', async () => {
        await eventRaffle.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('1', 'ether')
        })

        const players = await eventRaffle.methods.getPlayers().call({
            from: accounts[0]
        })

        assert.equal(accounts[0], players[0])
        assert.equal(1, players.length)
    })


    it('allows multiple accounts to enter', async () => {
        await eventRaffle.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('1', 'ether')
        })
        await eventRaffle.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('1', 'ether')
        })
        await eventRaffle.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('1', 'ether')
        })

        const players = await eventRaffle.methods.getPlayers().call({
            from: accounts[0]
        })

        assert.equal(accounts[0], players[0])
        assert.equal(accounts[1], players[1])
        assert.equal(accounts[2], players[2])
        assert.equal(3, players.length)
    })


    it('requires a minimum amount of ether to enter', async() => {
        try {
            await eventRaffle.methods.enter().send({
                from: accounts[0],
                value: 10
            })
            assert(false)
        } catch (err) {
            if (err.message && (err.message == EXPECTED_ERR_MSG) ) {
                assert(err)
            } else {
                console.log('err', err)
                assert(false)
            }
        }
    })


    it('only manager can call pickWinner', async() => {
        try {
            await eventRaffle.methods.pickWinner().send({
                from: accounts[1]
            })
            assert(false)
        } catch(err) {
            assert(err)
        }

    })


    it('winner gets jackpot', async() => {
        await eventRaffle.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        })

        const initialBalance = await web3.eth.getBalance(accounts[0])

        await eventRaffle.methods.pickWinner().send({ from: accounts[0] })

        const finalBalance = await web3.eth.getBalance(accounts[0])

        const diff = finalBalance - initialBalance
        // Less than 2 b/c gas has a cost
        assert(diff > web3.utils.toWei('1.8', 'ether'))
    })


    it('picking winner resets players array and jackpot balance', async () => {

        await eventRaffle.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        })

        await eventRaffle.methods.pickWinner().send({ from: accounts[0] })

        // players array cleared after jackpot awarded
        const players = await eventRaffle.methods.getPlayers().call({
            from: accounts[0]
        })
        assert.equal(0, players.length)

        // balance set to zero after jackpot awarded
        const balance = await eventRaffle.methods.getJackpotBalance().call({
            from: accounts[0]
        })
        assert.equal(0, balance)
    })


    it('randomly selects a winner', async () => {

        const timesToRunEventRaffle = TIMES_TO_RUN_RAFFLE
        const playerWinnings = await eventRaffleWithTwoPlayers(timesToRunEventRaffle, accounts[0], accounts[1], accounts[2])

        // console.log('playerWinnings', playerWinnings)

        assert.equal(timesToRunEventRaffle, playerWinnings[0] + playerWinnings[1])

        if (!( playerWinnings[0] >= timesToRunEventRaffle * .1 &&  playerWinnings[0] <= timesToRunEventRaffle * .9)) {
            assert(false)
        }

        if (!( playerWinnings[1] >= timesToRunEventRaffle * .1 &&  playerWinnings[1] <= timesToRunEventRaffle * .9)) {
            assert(false)
        }
    })

})
