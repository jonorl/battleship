export class Ship {
  constructor(shipLen, numberOfHits, sunk = false) {
    this.shipLen = shipLen;
    this.numberOfHits = numberOfHits;
    this.sunk = sunk
  }
}
