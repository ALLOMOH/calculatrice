const calculatorPromise = import("./calculator.js");

let output = document.querySelector("#output");
const equal = document.querySelector(".equal");
const reset = document.querySelector(".reset");

let firstNumber = 0;
let operation = null;
let resetAfterOperation = false;

document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", (e) => {
    let value = e.currentTarget.textContent;
    if (resetAfterOperation) {
      output.value = value;
      resetAfterOperation = false;
    } else {
      output.value += value;
    }
  });
});

document.querySelectorAll(".operation").forEach((button) =>
  button.addEventListener("click", (e) => {
    firstNumber = Number.parseFloat(output.value);
    operation = e.currentTarget.dataset.action;
    resetAfterOperation = true;
  })
);

reset.addEventListener("click", () => {
  output.value = null;
});

equal.addEventListener("click", () => {
  if (!operation) {
    return;
  }
  resetAfterOperation = true;

  let secondNumber = Number.parseFloat(output.value);

  calculatorPromise
    .then((calculator) => {
      let result;
      switch (operation) {
        case "sum":
          result = calculator.sum(firstNumber, secondNumber);
          break;
        case "subtract":
          result = calculator.subtract(firstNumber, secondNumber);
          break;
        case "multiply":
          result = calculator.multiply(firstNumber, secondNumber);
          break;
        case "divide":
          result = calculator.divide(firstNumber, secondNumber);
          break;
        default:
          //reset operation
          operation = null;
          break;
      }
      output.value = result;
      operation = null;
    })
    .catch((error) => {
      console.error("Error importing calculator module:", error);
    });
});
