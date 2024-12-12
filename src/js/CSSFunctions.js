// All functions to modify CSS go here

// Imports

import {randomiseButton, directionBtn} from "./DOMFunctions"

// This changes the direction shown on the ships in the middle container

export function invertDirection() {
  const dragAndDropShipsContainer = document.querySelector(
    ".drag-and-drop-ships-container"
  );
  const shipFive = document.querySelector(".ship-Five");
  const shipFour = document.querySelector(".ship-Four");
  const shipThree = document.querySelector(".ship-Three");
  const shipTwo = document.querySelector(".ship-Two");

  if (
    directionBtn.textContent === "Direction" ||
    directionBtn.textContent === "Vertical"
  ) {
    dragAndDropShipsContainer.style.gridTemplateRows =
      "50px 50px 50px 50px 50px";
    dragAndDropShipsContainer.style.gridTemplateColumns = "repeat(3, 50px)";
    dragAndDropShipsContainer.style.gridRowGap = "0";
    dragAndDropShipsContainer.style.gridColumnGap = "1vw";
    shipFive.style.gridColumn = "span 1";
    shipFive.style.gridRow = "span 5";
    shipFive.removeAttribute("data-direction");
    shipFive.setAttribute("data-direction", "vertical");
    shipFour.style.gridColumn = "span 1";
    shipFour.style.gridRow = "span 4";
    shipFour.removeAttribute("data-direction");
    shipFour.setAttribute("data-direction", "vertical");
    shipThree.style.gridColumn = "span 1";
    shipThree.style.gridRow = "span 3";
    shipThree.removeAttribute("data-direction");
    shipThree.setAttribute("data-direction", "vertical");
    shipTwo.style.gridColumn = "span 1";
    shipTwo.style.gridRow = "span 2";
    shipTwo.removeAttribute("data-direction");
    shipTwo.setAttribute("data-direction", "vertical");
    directionBtn.textContent = "Horizontal";
  } else if (directionBtn.textContent === "Horizontal") {
    dragAndDropShipsContainer.style.gridTemplateRows = "repeat(3, 50px)";
    dragAndDropShipsContainer.style.gridTemplateColumns =
      "50px 50px 50px 50px 50px";
    dragAndDropShipsContainer.style.gridRowGap = "1vh";
    dragAndDropShipsContainer.style.gridColumnGap = "0";
    shipFive.style.gridColumn = "span 5";
    shipFive.style.gridRow = "span 1";
    shipFive.removeAttribute("data-direction");
    shipFive.setAttribute("data-direction", "horizontal");
    shipFour.style.gridColumn = "span 4";
    shipFour.style.gridRow = "span 1";
    shipFour.removeAttribute("data-direction");
    shipFour.setAttribute("data-direction", "horizontal");
    shipThree.style.gridColumn = "span 3";
    shipThree.style.gridRow = "span 1";
    shipThree.removeAttribute("data-direction");
    shipThree.setAttribute("data-direction", "horizontal");
    shipTwo.style.gridColumn = "span 2";
    shipTwo.style.gridRow = "span 1";
    shipTwo.removeAttribute("data-direction");
    shipTwo.setAttribute("data-direction", "horizontal");
    directionBtn.textContent = "Vertical";
  }
}

// Shows / hides the ships from the middle container when randomised.
export function resetShowShips() {
  const shipFive = document.querySelector(".ship-Five");
  const shipFour = document.querySelector(".ship-Four");
  const shipThree = document.querySelector(".ship-Three");
  const shipTwo = document.querySelector(".ship-Two");

  if (randomiseButton === true) {
    shipFive.style.background = "none";
    shipFive.style.border = "none";
    shipFive.removeAttribute("draggable");
    shipFour.style.background = "none";
    shipFour.style.border = "none";
    shipFour.removeAttribute("draggable");
    shipThree.style.background = "none";
    shipThree.style.border = "none";
    shipThree.removeAttribute("draggable");
    shipTwo.style.background = "none";
    shipTwo.style.border = "none";
    shipTwo.removeAttribute("draggable");
  } else {
    shipFive.style.background = "red";
    shipFive.style.border = "dashed white 3px";
    shipFive.draggable = "true";
    shipFour.style.background = "red";
    shipFour.style.border = "dashed white 3px";
    shipFour.draggable = "true";
    shipThree.style.background = "red";
    shipThree.style.border = "dashed white 3px";
    shipThree.draggable = "true";
    shipTwo.style.background = "red";
    shipTwo.style.border = "dashed white 3px";
    shipTwo.draggable = "true";
  }
}
