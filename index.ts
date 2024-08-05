type operation = "plus" | "minus" | "divide" | "multiply";

let currentNumber = "0";
let storedNumber = "";
let currentOperation: operation | "" = "";
let isWriting = true;
const storedNumberNode = document.getElementById("stored-number")!;
const currentNumberNode = document.getElementById("current-number")!;

const controller = document.getElementById("controller");
controller?.addEventListener("click", (e) => {
  if (e.target === e.currentTarget || !(e.target instanceof HTMLElement)) {
    return;
  }

  if (e.target.dataset.number) {
    clickNumber(e.target.dataset.number);
    updateDisplay();
  } else if (e.target.dataset.operation) {
    clickOperation(e.target.dataset.operation as operation);
    updateDisplay();
  }
});

function clickNumber(num: string) {
  if (currentNumber === "0" || !isWriting) {
    currentNumber = num === "." ? "0." : num;
    isWriting = true;
  } else if (num === "." && currentNumber.includes(".")) {
    return;
  } else {
    currentNumber += num;
  }
  if (currentOperation === "") {
    storedNumber = "";
  }
}

function clickOperation(operation: operation | "equals") {
  if (operation === "equals" || (storedNumber && currentNumber)) {
    currentNumber = calc();
    storedNumber = "";
    currentOperation = "";
    isWriting = false;
    return;
  }
  storedNumber = currentNumber;
  currentOperation = operation;
  currentNumber = "0";
  isWriting = true;
}

function calc() {
  let result: string = "";
  switch (currentOperation) {
    case "divide":
      result = String(+storedNumber / +currentNumber);
      break;
    case "plus":
      result = String(+storedNumber + +currentNumber);
      break;
    case "minus":
      result = String(+storedNumber - +currentNumber);
      break;
    case "multiply":
      result = String(+storedNumber * +currentNumber);
      break;
    default:
      break;
  }
  return result;
}

function updateDisplay() {
  const operationText = {
    plus: "+",
    minus: "-",
    divide: "/",
    multiply: "*",
  };
  storedNumberNode.innerText =
    storedNumber &&
    `${storedNumber} ${
      currentOperation === "" ? "" : operationText[currentOperation]
    }`;
  currentNumberNode.innerText = currentNumber;
}

updateDisplay();
