pragma solidity ^0.4.17;

contract EventRaffle {
    address public manager;
    address[] public players;

    function EventRaffle() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        // This will eventually be replaced with a call to the Keep Random Beacon (random # generator)
        return uint(now);
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

    function getJackpotBalance() public view returns (uint) {
        return this.balance;
    }

}
