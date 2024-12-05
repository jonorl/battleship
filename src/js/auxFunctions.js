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
      return this.sunk = true;
    }
    else return this.sunk
  }
}
