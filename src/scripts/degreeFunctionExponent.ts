import {
  setDisplayStr,
  setInputStr,
  getInputStr,
  updateDisplay,
} from "./main.ts";
import { DEGREE, FE } from "./constants.ts";

/**
 * @description Tracks wheather the calculator is in degrees mode(true) or radians mode(false)
 * @type {boolean}
 */
let isDegree: boolean = true;
/**
 * @description Tracks wheather the scientific notation mode is active
 * @type {boolean}
 */
let isExponential: boolean = false; // Track the scientific notation

/**
 * @description Adds event listener to handle degree and scientific notation toggle
 */
document
  .querySelector(".calulate-degree")!
  .addEventListener("click", degreeClickEventHandler);

/**
 * @description Toggles between degrees and radians mode
 */
function degree() {
  isDegree = !isDegree;
  document.querySelector("#deg")!.textContent = isDegree ? "DEG" : "RAD";
}

export function getDegree(): boolean {
  return isDegree;
}

/**
 * @description Handles the click event for toggling degree mode or scientific notation
 * @param {*} e - The event object
 */
function degreeClickEventHandler(e: Event) {
  const target = e.target;
  if (target instanceof HTMLElement) {
    let currentKey = target.closest("button")?.value;

    switch (currentKey) {
      case DEGREE:
        degree();
        break;
      case FE:
        toggleExponential();
      default:
        break;
    }
  }
}

/**
 * @description Toggles the displayed value between standard and scientific notation
 */
export function toggleExponential() {
  let inputStr: string = getInputStr();
  if (!inputStr || isNaN(Number(inputStr))) return;

  let num: number = Number(inputStr);
  isExponential = !isExponential;

  let exponent: string[] = num.toExponential().split("e");
  let updatedInputStr: string = `${exponent[0]}*10**${Number(exponent[1])}`;
  let updatedDisplayStr: string = `${exponent[0]}*10^${Number(exponent[1])}`;
  if (isExponential) {
    setInputStr(updatedInputStr);
    setDisplayStr(updatedDisplayStr);
    isExponential = false;
  } else {
    updatedInputStr = num.toString();
    setInputStr(updatedInputStr);
    setDisplayStr(getInputStr());
  }

  updateDisplay();
}
