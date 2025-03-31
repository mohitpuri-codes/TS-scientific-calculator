import {
  MEMOERY_ADD,
  MEMORY_RECALL,
  MEMORY_CLEAR,
  MEMORY_SUBTRACT,
  MEMORY_SAVE,
  CALCULATOR_MEMORY,
} from "./constants.ts";
import {
  setDisplayStr,
  setInputStr,
  getDisplayStr,
  getInputStr,
  updateDisplay,
} from "./main.ts";

const memoryContainer = document.querySelector(".memory-clear-container");
if (memoryContainer) {
  memoryContainer.addEventListener("click", handleMemoryClick);
}

// Initialize memory from localStorage.
const memoryStr: string | null = localStorage.getItem(CALCULATOR_MEMORY);
let memory: number | null = memoryStr !== null ? parseFloat(memoryStr) : null;

/**
 * @description Recalls the stored memory value.
 */
function memoryRecall() {
  if (memory !== null) {
    let inputStr = getInputStr();
    let displayStr = getDisplayStr();
    inputStr =
      inputStr === "0" ? memory.toString() : inputStr + memory.toString();
    setInputStr(inputStr);
    displayStr =
      displayStr === "0" ? memory.toString() : displayStr + memory.toString();
    setDisplayStr(displayStr);
  }
}

/**
 * @description clears the stored memory value.
 */
function memoryClear() {
  memory = null;
  localStorage.removeItem(CALCULATOR_MEMORY);
}

/**
 * @description Adds the current input value to the stored memory.
 */
function memoryAdd() {
  const inputStr = getInputStr();
  const currentValue = parseFloat(inputStr) || 0;
  memory = (memory ?? 0) + currentValue;
  localStorage.setItem(CALCULATOR_MEMORY, memory.toString());
}

/**
 * @description Subtracts the current input value to the stored memory.
 */
function memorySub() {
  const inputStr = getInputStr();
  const currentValue = parseFloat(inputStr) || 0;
  memory = (memory ?? 0) - currentValue;
  localStorage.setItem(CALCULATOR_MEMORY, memory.toString());
}

/**
 * @description Saves the current input value into memory.
 */
function memorySaveCurrent() {
  const inputStr = getInputStr();
  const currentValue = parseFloat(inputStr);
  if (!isNaN(currentValue)) {
    memory = currentValue;
    localStorage.setItem(CALCULATOR_MEMORY, memory.toString());
  }
}

/**
 *
 * @description Handles memory button clicks and executes the corresponding memory operations.
 * @param {Event} e - The click event object
 */
function handleMemoryClick(e: Event) {
  const target = e.target;
  if (target instanceof HTMLElement) {
    const currentKey = target.closest("button")?.textContent!.trim();
    if (!currentKey) return;

    switch (currentKey) {
      case MEMORY_CLEAR:
        memoryClear();
        break;
      case MEMORY_RECALL:
        memoryRecall();
        break;
      case MEMOERY_ADD:
        memoryAdd();
        break;
      case MEMORY_SUBTRACT:
        memorySub();
        break;
      case MEMORY_SAVE:
        memorySaveCurrent();
        break;
    }
    // Ensure that buttons update dynamically
    updateMemoryButtons();
    updateDisplay();
  }
}

/**
 * @description Updates the appearance of memory buttons (MC and MR) based on memory availability.
 */
function updateMemoryButtons() {
  const hasMemory = localStorage.getItem(CALCULATOR_MEMORY) !== null;
  document
    .querySelectorAll(
      '.memory-clear-container button[value="MC"], .memory-clear-container button[value="MR"]'
    )
    .forEach((btn) => btn.classList.toggle("fade-color", !hasMemory));
}

//  Initialize memory button states
updateMemoryButtons();
