const Web3 = require('web3');
const contract = require('truffle-contract');

const querystring = require('querystring');

const contractArtifact = require('../build/contracts/TicTacToe.json');

const TicTacToe = contract(contractArtifact);
TicTacToe.setProvider(window.web3.currentProvider);

// TODO test without metamask
const web3 = new Web3(window.web3.currentProvider);

window.web3Instance = web3;

window.TicTacToe = TicTacToe;

function loadGame(address) {
  window.game = TicTacToe.at(address);
  console.log('Game fetched', window.game, address);
}

function cellToString(cell) {
  switch (cell) {
    case 0: return '-';
    case 1: return 'X';
    case 2: return 'O';
    default: return null;
  }
}

async function loadCells() {
  console.log('Loading cells');
  const cells = await Promise.all(Array.from(Array(9)).map((_, i) => window.game.cells(i)));

  cells.map(cell => cell.toNumber()).forEach((value, i) => {
    document.getElementById(`cell-${i}`).innerText = cellToString(value);
  });
}

async function createGame() {
  const accounts = await web3.eth.getAccounts();
  const newGame = new web3.eth.Contract(contractArtifact.abi, { from: accounts[0] });

  try {
    console.log('Creating new game', newGame);
    const createdGame = await newGame.deploy({
      data: contractArtifact.bytecode,
    }).send();
    goToGame(createdGame.options.address);
  } catch (e) {
    console.error('deploy error', e);
  }
}

// window.game.takeTurn(2, 1, { from:'0x9250b0677CAa66BC49489331fb08F74c5bbD0cab' })
// window.game.isGameOver().then(console.log)

document.getElementById('create-new-game').addEventListener('click', createGame);

function router() {
  const qs = querystring.parse(document.location.search.replace('?', ''));

  if (!qs.address) {
    document.querySelector('[data-route=home]').style.display = 'block';
    document.querySelector('[data-route=game]').style.display = 'none';
  } else {
    document.querySelector('[data-route=home]').style.display = 'none';
    document.querySelector('[data-route=game]').style.display = 'block';
    loadGame(qs.address);
    document.getElementById('game').innerText = window.game.address;
    loadCells();
  }
}

function goToGame(address) {
  window.history.pushState(null, '', `?address=${address}`);
  router();
}

function formSubmit(e) {
  e.preventDefault();
  goToGame(this.address.value);
}

document.getElementById('find-game').addEventListener('submit', formSubmit);

router();

window.onpopstate = router;
