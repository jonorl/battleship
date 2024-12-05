export class Ship {
  constructor(shipLen, direction, numberOfHits = 0, sunk = false) {
    this.shipLen = shipLen;
    this.direction = direction;
    this.numberOfHits = numberOfHits;
    this.sunk = sunk;
  }
  hit() {
    this.numberOfHits++;
  }
  isSunk() {
    if (this.numberOfHits === this.shipLen) {
      return (this.sunk = true);
    } else return this.sunk;
  }
}

export class Gameboard {
  constructor(axisX, axisY) {
    this.axisX = axisX;
    this.axisY = axisY;
    this.board = this.createBoard();
  }

  createBoard() {
    let horizontalLength = [];
    for (let i = 0; i < this.axisX; i++) {
      horizontalLength.push(i);
    }
    let verticalLength = [];
    for (let i = 0; i < this.axisY; i++) {
      verticalLength.push(i);
    }
    let board = [];
    horizontalLength.forEach((xElement) => {
      let arr = [];
      board.push(arr);
      verticalLength.forEach((yElement) => {
        board[xElement].push(0);
      });
    });
    // console.log(board)
    return board;
  }

  placeShips(ship, coordinateX, coordinateY, player, board) {
    if (ship.direction === "horizontal") {
      if (!(coordinateX + ship.shipLen > this.axisX)) {
        for (let i = coordinateX; i < (coordinateX + ship.shipLen); i++) {
          if (player.playerType === true) {
            board.board[coordinateY][i] = 1;
          } else board.board[coordinateY][i] = 2;
        }
      } else return "Error placement out of bounds";
    } else if (ship.direction === "vertical") {
      if (!(coordinateY + ship.shipLen > this.axisY)) {
        for (let i = coordinateY; i < (coordinateY + ship.shipLen); i++) {
          if (player.playerType === true) {
            board.board[i][coordinateX] = 1;
          } else board.board[i][coordinateX] = 2;
        }
      } else return "Error placement out of bounds";
    }
    return board
  }

  receiveAttack(coordinates) {}
}

export class Player {
  constructor(playerName, playerType = true) {
    this.playerName = playerName;
    this.playerType = playerType
  }
}
