export class Ship {
  constructor(shipLen, direction, numberOfHits = 0, sunk = false) {
    this.shipLen = shipLen;
    this.direction = direction;
    this.numberOfHits = numberOfHits;
    this.sunk = sunk;
  }
  hit() {
    this.numberOfHits++;
    this.isSunk();
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
    return board;
  }

  placeShips(ship, coordinateX, coordinateY, player, board) {
    if (ship.direction === "horizontal") {
      if (coordinateX - 1 + ship.shipLen < this.axisX) {
        for (let i = coordinateX; i < (coordinateX + ship.shipLen); i++) {
          if (player.playerType === "human") {
            board.board[coordinateY][i] = ship;
          } 
        }
      } else return "Error placement out of bounds";
    } else if (ship.direction === "vertical") {
      if (coordinateY - 1 + ship.shipLen < this.axisY) {
        for (let i = coordinateY; i < (coordinateY + ship.shipLen); i++) {
          if (player.playerType === "human") {
            board.board[i][coordinateX] = ship;
          }
        }
      } else return "Error placement out of bounds";
    }
    return board
  }

  receiveAttack(x, y) {
    if(typeof(this.board[y][x]) === "object"){
      this.board[y][x].hit(); // this.board[y][x] is the same as ship
    }
    else this.board[y][x] = 1
    return true
  }
}

export class Player {
  constructor(playerName, playerType, playerGameboard = new Gameboard()) {
    this.playerName = playerName;
    this.playerType = playerType;
    this.payerGameboard = playerGameboard
  }
}
