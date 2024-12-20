// classes

// Begin your app by creating the Ship class/factory (your choice).

export class Ship {
  constructor(shipLen, direction, numberOfHits = 0, sunk = false) {
    // Your ‘ships’ will be objects that include their length, the number of times
    // they’ve been hit and whether or not they’ve been sunk.
    this.shipLen = shipLen;
    this.direction = direction;
    this.numberOfHits = numberOfHits;
    this.sunk = sunk;
  }
  // Ships should have a hit() function that increases the number of ‘hits’ in your ship.
  hit() {
    this.numberOfHits++;
    this.isSunk();
  }
  // isSunk() should be a function that calculates whether a ship is considered sunk based
  // on its length and the number of hits it has received.
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

  // Create a Gameboard class/factory.
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

  // Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
  placeShips(ship, coordinateX, coordinateY, player) {
    // validation array to check if all tiles before placing ships.
    let validation = [];
    if (ship.direction === "horizontal") {
      // check if ship placement doesn't go out of bounds
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
      // check if ship placement doesn't go out of bounds
      if (coordinateY - 1 + ship.shipLen < this.axisY) {
        for (let i = coordinateY; i < coordinateY + ship.shipLen; i++) {
          if (
            typeof player.playerGameboard.board[i][coordinateX] !== "object"
          ) {
            // checking for ship overlap
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

  // helper function as placeShips is already too bloated
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

  //Gameboards should have a receiveAttack function that takes a pair of coordinates, determines
  //whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or
  //records the coordinates of the missed shot.
  receiveAttack(x, y) {
    if (this.board[y][x] === 0) {
      this.board[y][x] = 1;
      return "water";
    } else if (typeof this.board[y][x] === "object") {
      this.board[y][x].hit(); // this.board[y][x] is the same as ship
      this.board[y][x] = 1;
    } else if (this.board[y][x] === 1) {
      return "tile already hit";
    }
    if (this.checkGameOver() === "Game Over") {
      return "Game Over";
    } else return true;
  }

  // Gameboards should be able to report whether or not all of their ships have been sunk.
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

// Create a Player class/factory.

//There will be two types of players in the game, ‘real’ players and ‘computer’ players.
//Each player object should contain its own gameboard.

export class Player {
  constructor(playerName, playerType, playerGameboard = new Gameboard(10, 10)) {
    this.playerName = playerName;
    this.playerType = playerType;
    this.playerGameboard = playerGameboard;
  }
}
