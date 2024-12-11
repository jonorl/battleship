// import

import {dropAndAddShip} from "./DOMFunctions"

window.addEventListener("DOMContentLoaded", () => {
document.addEventListener("dragend", dragstartHandler);
});

function dragstartHandler(ev) {
    dropAndAddShip(ev)
    }