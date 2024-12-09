//Imports

import { Ship, Gameboard, Player } from "./class";

// variables

const btn = document.querySelector("button");
const player1 = new Player("Player 1", "human");
const player2 = new Player("Computer", "cpu");

export function startNewGame() {
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
    let placed = false;

    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      if (
        player1.playerGameboard.placeShips(ship, x, y, player1) !==
          "overlapping ships are not allowed" ||
        player1.playerGameboard.placeShips(ship, x, y, player1) !==
          "Error placement out of bounds"
      ) {
        placed = true;
      }
      renderShips(x, y, player1);
    }
  });
  shipsArray2.forEach((ship) => {
    let placed = false;

    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      if (
        player2.playerGameboard.placeShips(ship, x, y, player2) !==
          "overlapping ships are not allowed" ||
        player2.playerGameboard.placeShips(ship, x, y, player2) !==
          "Error placement out of bounds"
      ) {

        placed = true;
        // renderShips(x, y, player2);
      }
      renderShips(x, y, player2);
    }
  });
  console.log(player1.playerGameboard.board);
  console.log(player2.playerGameboard.board);
}

function renderShips(x, y, player) {
    console.log(x)
    console.log(y)
    console.log(player.playerName)
  if (player.playerName === "Player 1") {
    let shipDiv = document.querySelector(
      `.battleship-grid-player-one div[data-x="${x}"][data-y="${y}"]`
    );
    console.log(shipDiv);
    shipDiv.style.background = "red";
    shipDiv.style.border = "solid white 3px";
  }
  else {
    const shipDiv = document.querySelector(
        `.battleship-grid-player-two div[data-x='${x}'][data-y='${y}']`
      );
      shipDiv.style.background = "red";
      shipDiv.style.border = "solid white 3px";
  }
}
