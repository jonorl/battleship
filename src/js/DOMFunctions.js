//Imports

import { Ship, Gameboard, Player } from "./class";

// variables

const btn = document.querySelector("button");
let gridSizeX;
let gridSizeY;

export function startNewGame() {
  // Create both players
  const player1 = new Player("Player 1", "human");
  const player2 = new Player("Computer", "cpu");

  // Create ships
  let shipsArray1 = [];
  let shipsArray2 = [];
  const shipFivePlOne = new Ship(
    5,
    Math.round(Math.random()) ? "vertical" : "horizontal"
  );
  shipsArray1.push(shipFivePlOne);
  const shipFourPlOne = new Ship(
    4,
    Math.round(Math.random()) ? "vertical" : "horizontal"
  );
  shipsArray1.push(shipFourPlOne);
  const shipThreePlOne = new Ship(
    3,
    Math.round(Math.random()) ? "vertical" : "horizontal"
  );
  shipsArray1.push(shipThreePlOne);
  const shipTwoPlOne = new Ship(
    2,
    Math.round(Math.random()) ? "vertical" : "horizontal"
  );
  shipsArray1.push(shipTwoPlOne);
  const shipFivePlTwo = new Ship(
    5,
    Math.round(Math.random()) ? "vertical" : "horizontal"
  );
  shipsArray2.push(shipFivePlTwo);
  const shipFourPlTwo = new Ship(
    4,
    Math.round(Math.random()) ? "vertical" : "horizontal"
  );
  shipsArray2.push(shipFourPlTwo);
  const shipThreePlTwo = new Ship(
    3,
    Math.round(Math.random()) ? "vertical" : "horizontal"
  );
  shipsArray2.push(shipThreePlTwo);
  const shipTwoPlTwo = new Ship(
    2,
    Math.round(Math.random()) ? "vertical" : "horizontal"
  );
  shipsArray2.push(shipTwoPlTwo);

  // Assign ships to player boards
  shipsArray1.forEach((ship) => {
    while (
      player1.playerGameboard.placeShips(
        ship,
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        player1
      ) !== "overlapping ships are not allowed" ||
      player1.playerGameboard.placeShips(
        ship,
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        player1
      ) !== "Error placement out of bounds"
    ) {
      player1.playerGameboard.placeShips(
        ship,
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        player1
      );
    }
  });
  shipsArray2.forEach((ship) => {
    while (
      player2.playerGameboard.placeShips(
        ship,
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        player2
      ) !== "overlapping ships are not allowed" ||
      player2.playerGameboard.placeShips(
        ship,
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        player2
      ) !== "Error placement out of bounds"
    ) {
      player2.playerGameboard.placeShips(
        ship,
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        player2
      );
    }
  });
  console.log(player1.playerGameboard)
  console.log(player2.playerGameboard)
}
