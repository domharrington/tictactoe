const Web3 = require('web3');
const contract = require('truffle-contract');

const contractArtifact = require('../build/contracts/TicTacToe.json');

const TicTacToe = contract(contractArtifact);
TicTacToe.setProvider(window.web3.currentProvider);

// TODO test without metamask
const web3 = new Web3(window.web3.currentProvider);

window.web3Instance = web3;

window.TicTacToe = TicTacToe;

function findGame(address) {
  window.game = TicTacToe.at(address);
  console.log('Game fetched', window.game, address);
}

async function createGame() {
  const accounts = await web3.eth.getAccounts();
  const newGame = new web3.eth.Contract(contractArtifact.abi, { from: accounts[0] });

  try {
    console.log('Creating new game', newGame);
    const createdGame = await newGame.deploy({
      data: contractArtifact.bytecode,
    }).send();
    findGame(createdGame.options.address);
  } catch (e) {
    console.error('deploy error', e);
  }
}

// window.game.takeTurn(2, 1, { from:'0x9250b0677CAa66BC49489331fb08F74c5bbD0cab' })
// window.game.isGameOver().then(console.log)

document.getElementById('create-new-game').addEventListener('click', createGame);

function formSubmit(e) {
  e.preventDefault();
  findGame(this.address.value);
}

document.getElementById('find-game').addEventListener('submit', formSubmit);
