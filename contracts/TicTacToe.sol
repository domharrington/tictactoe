pragma solidity ^0.4.17;

contract TicTacToe {
  // modifier restricted() {
  //   if (msg.sender == owner) _;
  // }

  address public player1;
  address public player2;

  enum CellState { Empty, X, O }

  CellState[9] public cells;

  function TicTacToe() public {
    player1 = msg.sender;
    cells = [
      CellState.Empty, CellState.Empty, CellState.Empty,
      CellState.Empty, CellState.Empty, CellState.Empty,
      CellState.Empty, CellState.Empty, CellState.Empty
    ];
  }

  function joinGame() public {
    player2 = msg.sender;
  }

  function takeTurn(uint cell, CellState turn) public {
    cells[cell] = turn;
  }

  function isGameOver() public view returns(bool) {
    // XXX
    // ---
    // ---
    for (uint i = 0; i < 9; i+=3) {
      if (cells[i] != CellState.Empty && cells[i] == cells[i + 1] && cells[i] == cells[i + 2]) return true;
    }

    // X--
    // X--
    // X--
    for (i = 0; i < 3; i+=1) {
      if (cells[i] != CellState.Empty && cells[i] == cells[i + 3] && cells[i] == cells[i + 6]) return true;
    }

    // X--
    // -X-
    // --X
    if (cells[0] != CellState.Empty && cells[0] == cells[4] && cells[0] == cells[8]) return true;

    // --X
    // -X-
    // X--
    if (cells[2] != CellState.Empty && cells[2] == cells[4] && cells[2] == cells[5]) return true;

    return false;
  }

  // function setCompleted(uint completed) public restricted {
  //   last_completed_migration = completed;
  // }

  // function upgrade(address new_address) public restricted {
  //   Migrations upgraded = Migrations(new_address);
  //   upgraded.setCompleted(last_completed_migration);
  // }
}
