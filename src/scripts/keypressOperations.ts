import {
  setAndAddDisplayStr,
  setAndAddInputStr,
  updateDisplay,
  getInputStr,
  setInputStr,
  setDisplayStr,
  getDisplayStr,
} from "./main";

import { equals } from "./utils";
import { ERROR, ENTER, EQUAL, BACKSPACE_KEY } from "./constants";

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
function backSpaceEventHandler(e: KeyboardEvent) {
  const inputStr: string = getInputStr();
  const displayStr: string = getDisplayStr();
  if (e.key === BACKSPACE_KEY) {
    const updatedInputStr: string = inputStr.slice(0, -1);
    setInputStr(updatedInputStr);
    const updatedDisplayStr: string = displayStr.slice(0, -1);
    setDisplayStr(updatedDisplayStr);
    updateDisplay();
  }
}

/**
 * @description Event listener for keypress events.
 * @param {KeyboardEvent} e - The keypress event object.
 */
function keyPressEventHandler(e: KeyboardEvent) {
  const inputStr: string = getInputStr();
  const allowedKeyPress = new Set<string>([
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
  const key: string = e.key;

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
