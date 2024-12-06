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

  placeShips(ship, coordinateX, coordinateY, player) {
    let validation = [];
    if (ship.direction === "horizontal") {
      if (coordinateX - 1 + ship.shipLen < this.axisX) {
        for (let i = coordinateX; i < coordinateX + ship.shipLen; i++) {
          if (
            typeof player.playerGameboard.board[coordinateY][i] !== "object"
          ) {
            // checking for ship overlap
            validation.push(true);
          } else validation.push(false);
        }
        if (
          validation.every((item) => item === true) &&
          validation.length !== 0
        ) {
          this.actualPlacingOfShips(ship, coordinateX, coordinateY, player);
        } else if (
          validation.some((item) => item === false) &&
          validation.length !== 0
        ) {
          return "overlapping ships are not allowed";
        }
      } else return "Error placement out of bounds";
    } else if (ship.direction === "vertical") {
      if (coordinateY - 1 + ship.shipLen < this.axisY) {
        for (let i = coordinateY; i < coordinateY + ship.shipLen; i++) {
          if (
            typeof player.playerGameboard.board[i][coordinateX] !== "object"
          ) {
            validation.push(true);
          } else validation.push(false);
        }
      }
      if (
        validation.every((item) => item === true) &&
        validation.length !== 0
      ) {
        this.actualPlacingOfShips(ship, coordinateX, coordinateY, player);
      } else if (
        validation.some((item) => item === false) &&
        validation.length !== 0
      ) {
        return "overlapping ships are not allowed";
      } else return "Error placement out of bounds";
    }
    return this.board;
  }

  actualPlacingOfShips(ship, coordinateX, coordinateY, player) {
    if (ship.direction === "horizontal") {
      for (let i = coordinateX; i < coordinateX + ship.shipLen; i++) {
        player.playerGameboard.board[coordinateY][i] = ship;
      }
    } else if (ship.direction === "vertical") {
      for (let i = coordinateY; i < coordinateY + ship.shipLen; i++) {
        player.playerGameboard.board[i][coordinateX] = ship;
      }
    }
  }

  receiveAttack(x, y) {
    if (typeof this.board[y][x] === "object") {
      this.board[y][x].hit(); // this.board[y][x] is the same as ship
    } else this.board[y][x] = 1; // 0 for not yet hit, 1 for hit water
    if (this.checkGameOver() === "Game Over") {
      return "Game Over";
    } else return true;
  }

  checkGameOver() {
    let checkArray = [];
    this.board.forEach((elementX) => {
      elementX.forEach((elementY) => {
        if (typeof elementY === "object" && elementY.sunk === true) {
          checkArray.push(true);
        } else if (typeof elementY === "object" && elementY.sunk === false)
          checkArray.push(false);
      });
    });
    if (checkArray.every((item) => item === true)) {
      return "Game Over";
    }
  }
}

export class Player {
  constructor(playerName, playerType, playerGameboard = new Gameboard(10, 10)) {
    this.playerName = playerName;
    this.playerType = playerType;
    this.playerGameboard = playerGameboard;
  }
}
