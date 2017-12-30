const assert = require('assert');

const TicTacToe = artifacts.require('TicTacToe');

contract('TicTacToe', (accounts) => {
  const [player1, player2/* , anotherPlayer */] = accounts;

  describe('TicTacToe()', () => {
    it('should create a new game with the sender as player1', async () => {
      const instance = await TicTacToe.new({ from: player1 });
      assert.equal(await instance.player1(), player1);
    });

    it('should have an empty game state', async () => {
      const instance = await TicTacToe.new({ from: player1 });
      const cells = await Promise.all(Array.from(Array(9)).map((_, i) => instance.cells(i)));
      assert.equal(cells.length, 9);
      cells.map(cell => assert.equal(cell.toNumber(), 0));
    });
  });

  describe('#joinGame()', () => {
    it('should error if game does not exist');
    it('should error if user is trying to play themselves');

    it.skip('should error if game already has 2 players', async () => {
      const instance = await TicTacToe.new({ from: player1 });
      console.log(await instance.joinGame({ from: player2 }));
    });

    it('should set player2 with msg.sender', async () => {
      const instance = await TicTacToe.new({ from: player1 });
      await instance.joinGame({ from: player2 });
      assert.equal(await instance.player2(), player2);
    });
  });

  describe('#takeTurn()', () => {
    it('should error if someone tries to play twice in a row');
    it('should error if the sender isnt one of the players');
    it('should error if the cell has already been played');
    it('should error if the game doesnt have 2 players');

    it('should mark the cell with the turn', async () => {
      const instance = await TicTacToe.new({ from: player1 });
      await instance.takeTurn(1, 0, { from: player1 });

      assert.equal(await instance.cells(0), 1);
    });
  });

  describe('#isGameOver()', () => {
    describe('winning states', () => {
      it('horizontal: should return true', async () => {
        const instance = await TicTacToe.new({ from: player1 });

        await instance.takeTurn(1, 0, { from: player1 });
        await instance.takeTurn(1, 1, { from: player1 });
        await instance.takeTurn(1, 2, { from: player1 });

        assert.equal(await instance.isGameOver(), true);
      });

      it('vertical: should return true', async () => {
        const instance = await TicTacToe.new({ from: player1 });

        await instance.takeTurn(1, 0, { from: player1 });
        await instance.takeTurn(1, 3, { from: player1 });
        await instance.takeTurn(1, 6, { from: player1 });

        assert.equal(await instance.isGameOver(), true);
      });

      it('diagonal left->right: should return true', async () => {
        const instance = await TicTacToe.new({ from: player1 });

        await instance.takeTurn(1, 0, { from: player1 });
        await instance.takeTurn(1, 4, { from: player1 });
        await instance.takeTurn(1, 8, { from: player1 });

        assert.equal(await instance.isGameOver(), true);
      });

      it('diagonal right->left: should return true', async () => {
        const instance = await TicTacToe.new({ from: player1 });

        await instance.takeTurn(1, 2, { from: player1 });
        await instance.takeTurn(1, 4, { from: player1 });
        await instance.takeTurn(1, 5, { from: player1 });

        assert.equal(await instance.isGameOver(), true);
      });
    });

    it('should return false if no moves have happened there is no winner', async () => {
      const instance = await TicTacToe.new({ from: player1 });

      assert.equal(await instance.isGameOver(), false);
    });

    it('should return false if there is no winner', async () => {
      const instance = await TicTacToe.new({ from: player1 });

      await instance.takeTurn(1, 0, { from: player1 });
      assert.equal(await instance.isGameOver(), false);
    });
  });

  describe('#getWinner()', () => {
    it('should return with the winner if game is over');
    it('should return with nothing if game is not over');
  });
});
