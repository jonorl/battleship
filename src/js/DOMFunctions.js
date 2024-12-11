//Imports

import { Ship, Player } from "./class";
import {mouseDown} from "./dragndrop"

// variables

let adj = false;
const btn = document.querySelector("button");
let gameOver = false;
let lastHitCPU = [];
const opponentBoard = document.querySelector(".battleship-grid-player-two");
const playerBoard = document.querySelector(".battleship-grid-player-one");
const playInstructions = document.querySelector(".play-instructions");
let player1 = new Player("Player 1", "human");
let player2 = new Player("Computer", "cpu");

console.log(document.querySelector(".ship-five").getAttribute('data-direction'))

// DOM Functions

export function startNewGame() {
  // Create ships
  let shipsArray1 = [];
  let shipsArray2 = [];

  const shipFive = document.querySelector(".ship-five")
  const shipFour = document.querySelector('.ship-four')
  const shipThree = document.querySelector('.ship-three')
  const shipTwo = document.querySelector('.ship-two')

  // Ships Player 1 (random placement)
  const shipFivePlOne = new Ship(
    shipFive.getAttribute("data-len"),shipFive.getAttribute("data-direction")
    );
  shipsArray1.push(shipFivePlOne);
  const shipFourPlOne = new Ship(
    shipFour.getAttribute("data-len"),shipFour.getAttribute("data-direction")
  );
  shipsArray1.push(shipFourPlOne);
  const shipThreePlOne = new Ship(
    shipThree.getAttribute("data-len"),shipThree.getAttribute("data-direction")
  );
  shipsArray1.push(shipThreePlOne);
  const shipTwoPlOne = new Ship(
    shipTwo.getAttribute("data-len"),shipTwo.getAttribute("data-direction")
  );
  shipsArray1.push(shipTwoPlOne);

  // Ships Player 2

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

  // Assign ships in ShipsArray to player boards

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

export function startNewGameRandom() {
  // Create ships
  let shipsArray1 = [];
  let shipsArray2 = [];

  // Ships Player 1 (random placement)
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

  // Ships Player 2

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

  // Assign ships in ShipsArray to player boards
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

    // Ships rendering of vertical

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

      // Ships rendering for horizontal

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
  } // Add this code if you want to have a peek at opponent's ships
  // else {
  //   if (ship.direction === "vertical") {
  //     for (let i = 0; i < ship.shipLen; i++) {
  //       const shipDiv = document.querySelector(
  //         `.battleship-grid-player-two div[data-x="${x}"][data-y="${y + i}"]`
  //       );
  //       shipDiv.style.border = "dashed white 3px";
  //     }
  //   } else {
  //     for (let i = 0; i < ship.shipLen; i++) {
  //       const shipDiv = document.querySelector(
  //         `.battleship-grid-player-two div[data-x="${x + i}"][data-y="${y}"]`
  //       );
  //       shipDiv.style.border = "dashed white 3px";
  //     }
  //   }
  // }
}

function renderOpponentBoard(x, y) {
  const shipDiv = document.querySelector(
    `.battleship-grid-player-two div[data-x="${x}"][data-y="${y}"]`
  );
  let receiveAttackResult = player2.playerGameboard.receiveAttack(x, y);
  if (receiveAttackResult === "water") {
    shipDiv.style.background = "blue";
  } else if (receiveAttackResult === true) {
    shipDiv.style.background = "red";
  } else if (receiveAttackResult === "tile already hit") {
    playInstructions.textContent = "Tile already hit";
    return;
  } else if (receiveAttackResult === "Game Over") {
    shipDiv.style.background = "red";
    playInstructions.textContent = "Game Over, you win!";
    gameOver = true;
    return;
  }
  opponentTurn();
}

// function to make the opponent (computer) play its turn. I could add a timer
// setting so that the person playing thinks the computer is "thinking" its
// next move

function opponentTurn() {

  // first conditional to check if computer has hit a ship so that it tries
  // hitting adjacent tiles going left, right, up and down unless tile was
  // hit already.

  if (adj === true && lastHitCPU !== 0) {
    let x = lastHitCPU[0];
    let y = lastHitCPU[1];

    if (!(x - 1 < 0) && player1.playerGameboard.board[y][x - 1] !== 1) {
      x = x - 1;
      let receiveAttackResult = player1.playerGameboard.receiveAttack(x, y);
      resultAttackNextMove(
        receiveAttackResult,
        document.querySelector(
          `.battleship-grid-player-one div[data-x="${x}"][data-y="${y}"]`
        ),
        x,
        y
      );
      return;
    } else if (!(x + 1 > 9) && player1.playerGameboard.board[y][x + 1] !== 1) {
      x = x + 1;
      let receiveAttackResult = player1.playerGameboard.receiveAttack(x, y);
      resultAttackNextMove(
        receiveAttackResult,
        document.querySelector(
          `.battleship-grid-player-one div[data-x="${x}"][data-y="${y}"]`
        ),
        x,
        y
      );
      return;
    } else if (!(y - 1 < 0) && player1.playerGameboard.board[y - 1][x] !== 1) {
      y = y - 1;
      let receiveAttackResult = player1.playerGameboard.receiveAttack(x, y);
      resultAttackNextMove(
        receiveAttackResult,
        document.querySelector(
          `.battleship-grid-player-one div[data-x="${x}"][data-y="${y}"]`
        ),
        x,
        y
      );
      return;
    } else if (!(y + 1 > 9) && player1.playerGameboard.board[y + 1][x] !== 1) {
      y = y + 1;
      let receiveAttackResult = player1.playerGameboard.receiveAttack(x, y);
      resultAttackNextMove(
        receiveAttackResult,
        document.querySelector(
          `.battleship-grid-player-one div[data-x="${x}"][data-y="${y}"]`
        ),
        x,
        y
      );
      return;
    } 
    
    // If all adjacent tiles have been hit, reset the bool var and randomise
    // next attack. lastHitCPU is a queue to hit the consecutive adjacent tiles
    // after hitting the first one.
    
    else {
      lastHitCPU = lastHitCPU.slice(2);
      if (lastHitCPU.length === 0) {
        adj = false;
      }
      if (lastHitCPU.length !== 0) {
        opponentTurn();
        return;
      }
    }
  }

  // After all adjacent tiles have been hit, start randomising the next attack.

  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  let shipDiv = document.querySelector(
    `.battleship-grid-player-one div[data-x="${x}"][data-y="${y}"]`
  );
  let receiveAttackResult = player1.playerGameboard.receiveAttack(x, y);
  resultAttackNextMove(receiveAttackResult, shipDiv, x, y);
}


// Helper function to attack a tile, unless it's already been hit or
// it's out of bounds.

function resultAttackNextMove(receiveAttackResult, shipDiv, x, y) {
  if (receiveAttackResult === "water") {
    shipDiv.style.background = "blue";
    playInstructions.textContent = "Player's turn";
  } else if (receiveAttackResult === true) {
    adj = true;
    lastHitCPU.push(x, y);
    shipDiv.className = "fa fa-close";
    shipDiv.style.display = "flex";
    shipDiv.style.justifyContent = "center";
    shipDiv.style.alignItems = "center";
    shipDiv.style.fontSize = "50px";
    playInstructions.textContent = "Player's turn";
  } else if (receiveAttackResult === "tile already hit") {
    opponentTurn();
  } else if (receiveAttackResult === "Game Over") {
    shipDiv.className = "fa fa-close";
    shipDiv.style.display = "flex";
    shipDiv.style.justifyContent = "center";
    shipDiv.style.alignItems = "center";
    shipDiv.style.fontSize = "50px";
    playInstructions.textContent = "Game Over, you lose!";
    gameOver = true;
    return;
  } else playInstructions.textContent = "Player's turn";
}

function resetBoards() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let shipDiv = document.querySelector(
        `.battleship-grid-player-one div[data-x="${i}"][data-y="${j}"]`
      );
      shipDiv.style.background = "black";
      shipDiv.style.border = "1px aliceblue solid";
      shipDiv.className = "";
      shipDiv.style.borderRadius = "";
      shipDiv = 0;
      player1 = new Player("Player 1", "human");
      shipDiv = document.querySelector(
        `.battleship-grid-player-two div[data-x="${i}"][data-y="${j}"]`
      );
      shipDiv.style.background = "black";
      shipDiv.style.border = "1px aliceblue solid";
      shipDiv.className = "";
      shipDiv.style.borderRadius = "";
      shipDiv = 0;
      player2 = new Player("Computer", "cpu");
    }
  }
}

export function dropAndAddShip(e) {

let shipName = e.target.className
let x = e.clientX
let y = e.clientY
let shipDiv = document.elementFromPoint(x, y)
let coordX = shipDiv.getAttribute("data-x")
let coordY = shipDiv.getAttribute("data-y")

}

// Event Listeners

opponentBoard.addEventListener("click", (event) => {
  if (gameOver === false) {
    const target = event.target;
    const x = target.attributes[0].nodeValue;
    const y = target.attributes[1].nodeValue;
    renderOpponentBoard(x, y);
  }
});

btn.addEventListener("click", function () {
  resetBoards();
  startNewGame();
  gameOver = false;
  playInstructions.textContent =
    "To start the game click anywhere on the opponent board.";
});
