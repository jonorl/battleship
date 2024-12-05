export class Ship {
  constructor(shipLen, numberOfHits = 0, sunk = false) {
    this.shipLen = shipLen;
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

export class Player {
  constructor(
    real,
    computer,
    realGameboard = new Gameboard(10, 10),
    computerGameboard = new Gameboard(10, 10)
  ) {
    this.real = real;
    this.computer = computer;
    this.realGameboard = realGameboard;
    this.computerGameboard = computerGameboard;
  }
}

export class Gameboard {
  constructor(axisX, axisY) {
    this.axisX = axisX;
    this.axisY = axisY;
  }
}
