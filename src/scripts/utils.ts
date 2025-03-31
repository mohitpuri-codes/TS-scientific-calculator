import { ERROR, ERROR_INPUT } from "./constants.ts";
import { addToHistory } from "./history.ts";
import { getDegree } from "./degreeFunctionExponent.ts";
import {
  updateDisplay,
  getDisplayStr,
  setDisplayStr,
  setInputStr,
  getInputStr,
  setAndAddDisplayStr,
  setAndAddInputStr,
} from "./main.ts";

let isSecondFunction: boolean = false;

/**
 * @description Evaluates the mathematical expression in the input field and updates the display.
 */
export function equals() {
  let inputStr: string = getInputStr();
  const displayStr: string = getDisplayStr();
  try {
    if (inputStr === ERROR_INPUT || inputStr === ERROR) {
      return;
    }
    if (inputStr === "") return;
    // sanitize the leading zeros
    inputStr = inputStr.replace(/\b0+(\d+)/g, "$1");
    let result = eval(inputStr);
    result = parseFloat(result.toFixed(3));
    addToHistory(displayStr, result);
    setInputStr(result.toString());
    setDisplayStr(getInputStr());
  } catch (error) {
    console.error(error);
    setInputStr(ERROR);
    setDisplayStr(ERROR);
  }

  updateDisplay();
}

/**
 * @description Clears the calculator display and input fields.
 */
export function clearCalc() {
  setInputStr("");
  setDisplayStr("");
  updateDisplay();
}

/**
 * @description Removes the last character from the input and display strings.
 */
export function backspace() {
  const inputStr: string = getInputStr();
  const displayStr: string = getDisplayStr();
  if (inputStr.endsWith("**")) {
    setInputStr(inputStr.slice(0, -2));
    setDisplayStr(displayStr.slice(0, -1));
  } else if (inputStr.endsWith("**2") || inputStr.endsWith("**3")) {
    setInputStr(inputStr.slice(0, -3));
    setDisplayStr(displayStr.slice(0, -1));
  } else {
    setInputStr(inputStr.slice(0, -1));
    setDisplayStr(displayStr.slice(0, -1));
  }
  updateDisplay();
}

/**
 * @description Handles the square root or cube root calculation based on the function mode.
 */
export function squareRoot() {
  if (isSecondFunction) {
    setAndAddInputStr("Math.cbrt(");
    setAndAddDisplayStr("∛(");
  } else {
    setAndAddInputStr("Math.sqrt(");
    setAndAddDisplayStr("√(");
  }
  updateDisplay();
}

// Trigonometric functions

/**
 * @description Handles sine function calculation with degree or radian mode.
 */
export function sine() {
  const isDegree: boolean = getDegree();
  const checkDegree: string = isDegree
    ? "Math.sin((Math.PI/180)*"
    : "Math.sin(";
  setAndAddInputStr(checkDegree);
  setAndAddDisplayStr("sin(");
  updateDisplay();
}

/**
 * @description Handles cosine function calculation with degree or radian mode.
 */
export function cosine() {
  const isDegree: boolean = getDegree();
  const checkDegree: string = isDegree
    ? "Math.cos((Math.PI/180)*"
    : "Math.cos(";
  setAndAddInputStr(checkDegree);
  setAndAddDisplayStr("cos(");
  updateDisplay();
}

/**
 * @description Handles tangent function calculation with degree or radian mode.
 */
export function tangent() {
  const isDegree: boolean = getDegree();
  const checkDegree: string = isDegree
    ? "Math.tan((Math.PI/180)*"
    : "Math.tan(";
  setAndAddInputStr(checkDegree);
  setAndAddDisplayStr("tan(");
  updateDisplay();
}

/**
 * @description Handles the floor function calculations to evaluate the number to its floor value.
 */
export function floorValue() {
  setAndAddInputStr("Math.floor(");
  setAndAddDisplayStr("floor(");
  updateDisplay();
}

/**
 * @description Handles the ceil function calculations to evaluate the number to its ceil value.
 */
export function ceilValue() {
  setAndAddInputStr("Math.ceil(");
  setAndAddDisplayStr("ceil(");
  updateDisplay();
}

/**
 * @description Handles natural logarithm (ln) function to evaluate the input string.
 */
export function logarithm() {
  setAndAddInputStr("Math.log(");
  setAndAddDisplayStr("log(");
  updateDisplay();
}

/**
 * @description Handles log-base10 function to evaluate the input string.
 */
export function naturalLogarithm() {
  setAndAddInputStr("Math.log10(");
  setAndAddDisplayStr("ln(");
  updateDisplay();
}

/**
 * @description Handles absolute value calculation of the input string.
 */
export function absoluteValue() {
  setAndAddInputStr("Math.abs(");
  setAndAddDisplayStr("abs(");
  updateDisplay();
}

/**
 * @description Handles square value calculation of the input string.
 */
export function square() {
  // Remove previous exponent if backspaced
  const inputStr: string = getInputStr();
  const displayStr: string = getDisplayStr();
  setInputStr(inputStr.replace(/\*\*3$|\*\*2$/, ""));
  setDisplayStr(displayStr.replace(/[²³]$/, ""));

  if (inputStr === "" || /[*+\-/^]$/.test(inputStr)) return;

  // if 2nd is clicked then change the inputStr with cube root
  if (isSecondFunction) {
    setAndAddInputStr("**3");
    setAndAddDisplayStr("³");
  } else {
    setAndAddInputStr("**2");
    setAndAddDisplayStr("²");
  }

  updateDisplay();
}

/**
 * @description Handles value calculation of the input string to the power of 10.
 */
export function powerOfTen() {
  const inputStr: string = getInputStr();
  if (inputStr === "" || /[+\-*/()]$/.test(inputStr)) {
    setAndAddInputStr("10**");
    setAndAddDisplayStr("10^");
  } else {
    setAndAddInputStr("*10**");
    setAndAddDisplayStr("*10^");
  }
  updateDisplay();
}

/**
 * @description Handles absolute value calculation of the input string to the power of next input string.
 */
export function xToPowerY() {
  const inputStr: string = getInputStr();
  if (!inputStr.endsWith("**")) {
    setAndAddInputStr("**");
    setAndAddDisplayStr("^");
    updateDisplay();
  }
}

/**
 * @description Handles constant pie value calculation.
 */
export function pie() {
  const inputStr: string = getInputStr();
  if (inputStr && !isNaN(Number(inputStr[inputStr.length - 1]))) {
    setAndAddInputStr("*Math.PI");
    setAndAddDisplayStr("*π");
  } else {
    setAndAddInputStr("Math.PI");
    setAndAddDisplayStr("π");
  }
  updateDisplay();
}

/**
 * @description Handles inverse value of the current number in the input string.
 */
export function inverseValue() {
  const inputStr: string = getInputStr();
  if (typeof inputStr !== "string") setInputStr(inputStr);
  const match = inputStr.match(/(\d+(\.\d+)?)$/);
  if (match) {
    const num = Number(match[1]);
    const inverse = `1/(${num})`;
    const replacedInputStr = inputStr.replace(/(\d+(\.\d+)?)$/, inverse);
    setInputStr(replacedInputStr);
    setDisplayStr(getInputStr());
  }
  updateDisplay();
}

/**
 * @description Handles Euler's number constant into the input string.
 */
export function exponent() {
  const inputStr = getInputStr();
  if (inputStr && !isNaN(Number(inputStr[inputStr.length - 1]))) {
    setAndAddInputStr("*Math.E");
    setAndAddDisplayStr("*e");
  } else {
    setAndAddInputStr("Math.E");
    setAndAddDisplayStr("e");
  }
  updateDisplay();
}

/**
 * @description Calculates the factorial of a given number.
 * @param {number} n - The number to compute factorial for.
 * @returns {number} - The computed factorial value.
 */
export function factorial(n: number): number {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * @description Handles factorial operation for the last entered number.
 */
export function factorialHandler() {
  const inputStr = getInputStr();
  if (inputStr === "" || isNaN(Number(inputStr[inputStr.length - 1]))) return;

  let num = "";
  let i = inputStr.length - 1;

  while (i >= 0 && !isNaN(Number(inputStr[i]))) {
    num = inputStr[i] + num;
    i--;
  }

  if (num !== "") {
    const factValue = factorial(Number(num));

    // Update inputStr to store function call for later evaluation
    const newInputStr = inputStr.slice(0, i + 1) + factValue;
    setInputStr(newInputStr);
    setAndAddDisplayStr("!");
  }

  updateDisplay();
}

/**
 * @description Toggles the sign (+/-) of the last number in the input string.
 */
export function toggleSign() {
  const inputStr = getInputStr();
  if (inputStr === "") setInputStr("0");
  if (typeof inputStr !== "string") setInputStr(inputStr);

  const match = inputStr.match(/(-?\d+(\.\d+)?)$/);
  if (match) {
    const num = Number(match[1]);
    const toggled = num * -1;
    const newInputStr = inputStr.replace(/(-?\d+(\.\d+)?)$/, `${toggled}`);
    setInputStr(newInputStr);
    setDisplayStr(getInputStr());
  }
  updateDisplay();
}

/**
 * @description Toggles between normal and secondary function modes.
 */
export function changeMode() {
  isSecondFunction = !isSecondFunction;

  document.querySelector("[value='square']")!.textContent = isSecondFunction
    ? "x³"
    : "x²";
  document.querySelector("[value='√']")!.textContent = isSecondFunction
    ? "∛x"
    : "√x";
}
