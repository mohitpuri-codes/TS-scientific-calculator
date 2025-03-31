/**
 * @description Retrives calculation history from localStorage or initializes an empty array.
 * @type {string[]}
 */
const localCalcHistory = localStorage.getItem("calcHistory");
let history: string[] = [];
if (localCalcHistory) {
  history = JSON.parse(localCalcHistory) || [];
}

// Event listeners

const historyBtnListner = document.querySelector(".history-btn");
if (historyBtnListner)
  historyBtnListner?.addEventListener("click", toggleHistory);
document.addEventListener("click", closeHistoryOnClickOutside);

/**
 * @description Closes the history panel when clicking outside of it.
 * @param {*} e - The click event object.
 */
function closeHistoryOnClickOutside(e: Event) {
  let target = e.target;
  if (target instanceof HTMLElement) {
    let historyContainer: HTMLDivElement | null =
      document.querySelector(".history-container");
    let historyBtn: HTMLButtonElement | null =
      document.querySelector(".history-btn");

    if (
      historyContainer &&
      historyBtn &&
      historyContainer.style.display === "block" &&
      !historyContainer.contains(target) &&
      !historyBtn.contains(target)
    ) {
      historyContainer.style.display = "none";
    }
  }
}

/**
 * @description Toggles the visibility of the history panel.
 */
function toggleHistory(): void {
  let historyContainer: HTMLDivElement | null =
    document.querySelector(".history-container");
  if (historyContainer)
    historyContainer.style.display =
      historyContainer.style.display === "block" ? "none " : "block";
}

/**
 * @description Adds a new calculation to the history and updates localStorage
 * @param {string} expression - The mathematical expression
 * @param {string|number} result - The result of the expression
 */
export function addToHistory(expression: string, result: string): void {
  if (history.length >= 5) {
    history.shift();
  }

  history.push(`${expression} = ${result}`);
  localStorage.setItem("calcHistory", JSON.stringify(history));

  updateHistoryUI();
}

/**
 * @description Updates the history UI with the latest calculations.
 */
function updateHistoryUI(): void {
  let historyList: HTMLUListElement | null =
    document.querySelector(".history-list");
  if (historyList) {
    historyList.innerHTML = "";
    const historyFragment: DocumentFragment = document.createDocumentFragment();
    history.forEach((entry) => {
      let li: HTMLLIElement = document.createElement("li");
      li.textContent = entry;
      historyFragment?.appendChild(li);
    });
    historyList.appendChild(historyFragment);
  }
}

// Load history on page load
updateHistoryUI();
