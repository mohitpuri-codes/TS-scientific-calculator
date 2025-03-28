import {
  setAndAddDisplayStr,
  setAndAddInputStr,
  updateDisplay,
  getInputStr,
  setInputStr,
  setDisplayStr,
  getDisplayStr,
} from "./main.ts";

import { equals } from "./utils.ts";
import { ERROR, ENTER, EQUAL, BACKSPACE_KEY } from "./constants.ts";

//  Event Listeners.
/**
 * @listens keypress - Listens for keypress events.
 */
document.addEventListener("keypress", keyPressEventHandler);
/**
 * @listens keydown - Listens for keydown events.
 */
document.addEventListener("keydown", backSpaceEventHandler);

/**
 * @description Event listner for backspace key press to handle input deletion.
 * @param {KeyboardEvent} e - The keypress event object.
 */
function backSpaceEventHandler(e: KeyboardEvent): void {
  let inputStr: string = getInputStr();
  let displayStr: string = getDisplayStr();
  if (e.key === BACKSPACE_KEY) {
    let updatedInputStr: string = inputStr.slice(0, -1);
    setInputStr(updatedInputStr);
    let updatedDisplayStr: string = displayStr.slice(0, -1);
    setDisplayStr(updatedDisplayStr);
    updateDisplay();
  }
}

/**
 * @description Event listener for keypress events.
 * @param {KeyboardEvent} e - The keypress event object.
 */
function keyPressEventHandler(e: KeyboardEvent): void {
  let inputStr: string = getInputStr();
  let allowedKeyPress = new Set<string>([
    "Enter",
    "Backspace",
    "(",
    ")",
    "*",
    "-",
    "+",
    "/",
    ".",
    "=",
  ]);
  let key: string = e.key;

  if ((key >= "0" && key <= "9") || allowedKeyPress.has(key)) {
    if (key === ENTER || key === EQUAL) {
      equals();
    } else {
      if (inputStr === ERROR) return;
      setAndAddInputStr(key);
      setAndAddDisplayStr(key);
      updateDisplay();
    }
  }
}
