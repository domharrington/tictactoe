const TicTacToe = artifacts.require('./TicTacToe.sol');

module.exports = (deployer) => {
  deployer.deploy(TicTacToe);
};
