"use strict";
let currentNumber = "0";
let storedNumber = "";
let currentOperation = "";
const storedNumberNode = document.getElementById("stored-number");
const currentNumberNode = document.getElementById("current-number");
const controller = document.getElementById("controller");
controller === null || controller === void 0 ? void 0 : controller.addEventListener("click", (e) => {
    if (e.target === e.currentTarget || !(e.target instanceof HTMLElement)) {
        return;
    }
    if (e.target.dataset.number) {
        clickNumber(e.target.dataset.number);
        updateDisplay();
    }
    else if (e.target.dataset.operation) {
        clickOperation(e.target.dataset.operation);
        updateDisplay();
    }
});
function clickNumber(num) {
    if (num === "." && currentNumber.includes(".")) {
        return;
    }
    if (currentNumber === "0") {
        currentNumber = num === "." ? "0." : num;
    }
    else {
        currentNumber += num;
    }
    if (currentOperation === "") {
        storedNumber = "";
    }
}
function clickOperation(operation) {
    if (operation === "equals" || (storedNumber && currentNumber)) {
        currentNumber = calc();
        storedNumber = "";
        currentOperation = "";
        return;
    }
    storedNumber = currentNumber;
    currentOperation = operation;
    currentNumber = "0";
}
function calc() {
    let result = "";
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
            `${storedNumber} ${currentOperation === "" ? "" : operationText[currentOperation]}`;
    currentNumberNode.innerText = currentNumber;
}
updateDisplay();
