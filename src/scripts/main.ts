import {
  ABSOLUTE_VALUE,
  BACKSPACE,
  CEIL,
  CLEAR,
  COS,
  EQUALS_VALUE,
  ERROR,
  EXP,
  EXPONENT,
  FACTORIAL,
  FLOOR,
  INVERSE,
  LOGARITHM,
  NATURAL_LOGARITHM,
  PI,
  PLUS_MINUS,
  POWER,
  POWER_OF_TEN,
  ROOT,
  SECOND_MODE,
  SINE,
  SQUARE,
  TAN,
} from "./constants.ts";
import {
  equals,
  clearCalc,
  backspace,
  squareRoot,
  square,
  sine,
  cosine,
  tangent,
  floorValue,
  ceilValue,
  logarithm,
  naturalLogarithm,
  absoluteValue,
  powerOfTen,
  xToPowerY,
  pie,
  exponent,
  factorialHandler,
  toggleSign,
  changeMode,
  inverseValue,
} from "./utils.ts";
import { toggleExponential } from "./degreeFunctionExponent.ts";
let inputStr: string = "";
let displayStr: string = "";
let display: HTMLDivElement = document.querySelector(".display")!;

// Event Listeners.
document
  .querySelector(".keys")!
  .addEventListener("click", keyClickEventHandler);
document
  .querySelector("#trigonometryDropdown")!
  .addEventListener("click", keyClickEventHandler);
document
  .querySelector("#functionDropdown")!
  .addEventListener("click", keyClickEventHandler);

/**
 * @description Gets the current input string.
 * @return {string} The input string.
 */
export function getInputStr(): string {
  return inputStr;
}

/**
 * @description Sets the input string.
 * @param {string} str - The new input string.
 */
export function setInputStr(str: string) {
  inputStr = str;
}

/**
 * @description Gets the current display string.
 * @return {string} The display string.
 */
export function getDisplayStr(): string {
  return displayStr;
}

/**
 * @description Sets the display string.
 * @param {string} str - The new display string.
 */
export function setDisplayStr(str: string) {
  displayStr = str;
}

/**
 * @description Appends to the display string.
 * @param {string} str - The string to append.
 */
export function setAndAddDisplayStr(str: string) {
  displayStr = displayStr + str;
}

/**
 * @description Appends to the input string.
 * @param {string} str - The string to append.
 */
export function setAndAddInputStr(str: string) {
  inputStr = inputStr + str;
}

/**
 * @description Updates the calculator display.
 */
export function updateDisplay() {
  display.textContent = displayStr || "0";
}

/**
 * @description Handles button clciks for calculator  operations
 * @param {Event} e - The event object.
 */
function keyClickEventHandler(e: Event) {
  const target = e.target;
  if (target instanceof HTMLElement) {
    let currentKey = target.closest("button")?.value;
    if (!currentKey) return;

    switch (currentKey) {
      case EQUALS_VALUE:
        equals();
        break;
      case BACKSPACE:
        backspace();
        break;
      case SECOND_MODE:
        changeMode();
        break;
      case SINE:
        sine();
        break;
      case COS:
        cosine();
        break;
      case TAN:
        tangent();
        break;
      case CLEAR:
        clearCalc();
        break;
      case EXPONENT:
        exponent();
        break;
      case FLOOR:
        floorValue();
        break;
      case CEIL:
        ceilValue();
        break;
      case LOGARITHM:
        logarithm();
        break;
      case NATURAL_LOGARITHM:
        naturalLogarithm();
        break;
      case ABSOLUTE_VALUE:
        absoluteValue();
        break;
      case SQUARE:
        square();
        break;
      case ROOT:
        squareRoot();
        break;
      case POWER_OF_TEN:
        powerOfTen();
        break;
      case POWER:
        xToPowerY();
        break;
      case INVERSE:
        inverseValue();
        break;
      case PLUS_MINUS:
        toggleSign();
        break;
      case FACTORIAL:
        factorialHandler();
        break;
      case PI:
        pie();
        break;
      case EXP:
        toggleExponential();
        break;
      default:
        if (inputStr === ERROR) return;
        inputStr += currentKey;
        displayStr += currentKey;
        break;
    }
  }

  updateDisplay();
}

// Event Listeners
document
  .querySelector("#trigonometry-dropdown")!
  .addEventListener("click", trigonometryFunction);

document
  .querySelector("#functional-dropdown")!
  .addEventListener("click", functionDropdown);

/**
 * @description Toggles the visibility of the trigonometry function dropdown.
 */
function trigonometryFunction() {
  document.getElementById("trigonometryDropdown")!.classList.toggle("show");
}

/**
 * @description Toggles the visibility of the functions dropdown.
 */
function functionDropdown() {
  document.getElementById("functionDropdown")!.classList.toggle("showFn");
}

/**
 * @description Handles the closing dowpdowns when clicking outside of them
 * @param {Event} event - The event object
 */
window.onclick = function (event: Event) {
  let trigDropdown: HTMLDivElement = document.querySelector(
    "#trigonometryDropdown"
  )!;
  let funcDropdown = document.querySelector("#functionDropdown")!;

  const target = event.target;
  if (target instanceof HTMLElement) {
    if (!target.closest(".dropbtn")) {
      if (trigDropdown.classList.contains("show")) {
        trigDropdown.classList.remove("show");
      }
    }

    if (!target.closest(".functionDropbtn")) {
      if (funcDropdown.classList.contains("showFn")) {
        funcDropdown.classList.remove("showFn");
      }
    }
  }
};
