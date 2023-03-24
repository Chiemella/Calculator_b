const display = document.getElementById("display");
let firstOperand = null;
let secondOperand = null;
let operator = null;
let shouldResetDisplay = false;

function handleNumberClick(number) {
  if (display.value === "0" || shouldResetDisplay) {
    display.value = number;
    shouldResetDisplay = false;
  } else {
    display.value += number;
  }
}

function handleOperatorClick(op) {
  if (firstOperand === null) {
    firstOperand = parseFloat(display.value);
    operator = op;
    shouldResetDisplay = true;
  } else {
    secondOperand = parseFloat(display.value);
    const result = calculateResult();
    display.value = result;
    firstOperand = result;
    operator = op;
    secondOperand = null;
    shouldResetDisplay = true;
  }
}

function calculateResult() {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*":
      return firstOperand * secondOperand;
    case "/":
      return firstOperand / secondOperand;
    case "%":
      return firstOperand % secondOperand;
    default:
      return null;
  }
}

function handleDecimalClick() {
  if (shouldResetDisplay) {
    display.value = "0.";
    shouldResetDisplay = false;
  } else if (!display.value.includes(".")) {
    display.value += ".";
  }
}

function handleClearClick() {
  display.value = "0";
  firstOperand = null;
  secondOperand = null;
  operator = null;
}

function handleBackspaceClick() {
  if (
    display.value.length === 1 ||
    (display.value.length === 2 && display.value.includes("-"))
  ) {
    display.value = "0";
  } else {
    display.value = display.value.slice(0, -1);
  }
}

function handleEqualsClick() {
  if (firstOperand === null || operator === null) {
    return;
  }
  if (secondOperand === null) {
    secondOperand = parseFloat(display.value);
  }
  const result = calculateResult();
  display.value = result;
  firstOperand = result;
  operator = null;
  secondOperand = null;
  shouldResetDisplay = true;
}

document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => {
    handleNumberClick(button.textContent);
  });
});

document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", () => {
    handleOperatorClick(button.textContent);
  });
});

document
  .getElementById("decimal")
  .addEventListener("click", handleDecimalClick);

document.getElementById("clear").addEventListener("click", handleClearClick);

document
  .getElementById("backspace")
  .addEventListener("click", handleBackspaceClick);

document.getElementById("equals").addEventListener("click", handleEqualsClick);
