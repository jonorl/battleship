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
          "overlapping ships are not allowed" &&
        player1.playerGameboard.placeShips(ship, x, y, player1) !==
          "Error placement out of bounds"
      ) {
        renderShips(x, y, player1, ship);
        placed = true;
      }
    }
  });
  shipsArray2.forEach((ship) => {
    let placed = false;

    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      if (
        player2.playerGameboard.placeShips(ship, x, y, player2) !==
          "overlapping ships are not allowed" &&
        player2.playerGameboard.placeShips(ship, x, y, player2) !==
          "Error placement out of bounds"
      ) {
        renderShips(x, y, player2, ship);
        placed = true;
      }
    }
  });
}

function renderShips(x, y, player, ship) {
  if (player.playerName === "Player 1") {
    if (ship.direction === "vertical") {
      for (let i = 0; i < ship.shipLen; i++) {
        const shipDiv = document.querySelector(
          `.battleship-grid-player-one div[data-x="${x}"][data-y="${y + i}"]`
        );
        shipDiv.style.background = "red";
        shipDiv.style.borderLeft = "dashed white 3px";
        shipDiv.style.borderRight = "dashed white 3px";
        shipDiv.style.borderTop = "none";
        shipDiv.style.borderBottom = "none";
        if (i === 0) {
          shipDiv.style.borderTop = "dashed white 3px";
          shipDiv.style.borderRadius = "25px 25px 0 0";
        } else if (i === ship.shipLen - 1) {
          shipDiv.style.borderBottom = "dashed white 3px";
          shipDiv.style.borderRadius = "0 0 25px 25px";
        }
      }
    } else {
      for (let i = 0; i < ship.shipLen; i++) {
        const shipDiv = document.querySelector(
          `.battleship-grid-player-one div[data-x="${x + i}"][data-y="${y}"]`
        );
        shipDiv.style.background = "red";
        shipDiv.style.borderLeft = "none";
        shipDiv.style.borderRight = "none";
        shipDiv.style.borderTop = "dashed white 3px";
        shipDiv.style.borderBottom = "dashed white 3px";
        if (i === 0) {
          shipDiv.style.borderLeft = "dashed white 3px";
          shipDiv.style.borderRadius = "25px 0 0 25px";
        } else if (i === ship.shipLen - 1) {
          shipDiv.style.borderRight = "dashed white 3px";
          shipDiv.style.borderRadius = "0 25px 25px 0";
        }
      }
    }
  } // need to get rid of rendering the computer's side once everything is tested 
  else {
    
    if (ship.direction === "vertical") {
      for (let i = 0; i < ship.shipLen; i++) {
        const shipDiv = document.querySelector(
          `.battleship-grid-player-two div[data-x="${x}"][data-y="${y + i}"]`
        );
        shipDiv.style.border = "dashed white 3px";
      }
    } else {
      for (let i = 0; i < ship.shipLen; i++) {
        const shipDiv = document.querySelector(
          `.battleship-grid-player-two div[data-x="${x + i}"][data-y="${y}"]`
        );
        shipDiv.style.border = "dashed white 3px";
      }
    }
  }
}

let opponentBoard = document.querySelector(".battleship-grid-player-two");
opponentBoard.addEventListener("click", (event) => {
  const target = event.target;
  let x;
  let y;
  x = target.attributes[0].nodeValue;
  y = target.attributes[1].nodeValue;
  renderOpponentBoard(x, y);
});

function renderOpponentBoard(x, y) {
  const shipDiv = document.querySelector(
    `.battleship-grid-player-two div[data-x="${x}"][data-y="${y}"]`
  );
  let receiveAttackResult = player2.playerGameboard.receiveAttack(x, y)
  if (receiveAttackResult === "water") {
    shipDiv.style.background = "blue";
  } else if (receiveAttackResult === true){
    shipDiv.style.background = "red";
  } else if (receiveAttackResult === "tile already hit"){
    return
  }
  opponentTurn()
}

function opponentTurn(){
  let adj = false;
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  const shipDiv = document.querySelector(
    `.battleship-grid-player-one div[data-x="${x}"][data-y="${y}"]`
  );
  let receiveAttackResult = player1.playerGameboard.receiveAttack(x, y)
  if (receiveAttackResult === "water"){
    shipDiv.style.background = "blue";
  } else if (receiveAttackResult === true){
    shipDiv.className = "fa fa-close"
    shipDiv.style.display = "flex"
    shipDiv.style.justifyContent = "center"
    shipDiv.style.alignItems = "center"
    shipDiv.style.fontSize = "50px"
  } else if (receiveAttackResult === "tile already hit"){
    opponentTurn()
  }
}
