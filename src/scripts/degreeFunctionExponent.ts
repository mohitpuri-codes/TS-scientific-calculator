import { setDisplayStr, setInputStr, getInputStr, updateDisplay } from "./main";
import { DEGREE, FE } from "./constants";

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

const calcDegree = document.querySelector(".calulate-degree");
if (calcDegree) calcDegree.addEventListener("click", degreeClickEventHandler);

/**
 * @description Toggles between degrees and radians mode
 */
function degree() {
  isDegree = !isDegree;
  const degreeBtn = document.querySelector("#deg");
  if (degreeBtn) degreeBtn!.textContent = isDegree ? "DEG" : "RAD";
}

export function getDegree() {
  return isDegree;
}

/**
 * @description Handles the click event for toggling degree mode or scientific notation
 * @param {*} e - The event object
 */
function degreeClickEventHandler(e: Event) {
  const target = e.target;
  if (target instanceof HTMLElement) {
    const currentKey = target.closest("button")?.value;

    switch (currentKey) {
      case DEGREE:
        degree();
        break;
      case FE:
        toggleExponential();
        break;
      default:
    }
  }
}

/**
 * @description Toggles the displayed value between standard and scientific notation
 */
export function toggleExponential() {
  const inputStr: string = getInputStr();
  if (!inputStr || isNaN(Number(inputStr))) return;

  const num: number = Number(inputStr);
  isExponential = !isExponential;

  const exponent: string[] = num.toExponential().split("e");
  let updatedInputStr: string = `${exponent[0]}*10**${Number(exponent[1])}`;
  const updatedDisplayStr: string = `${exponent[0]}*10^${Number(exponent[1])}`;
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
