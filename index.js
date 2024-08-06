"use strict";
let currentNumber = "0";
let storedNumber = "";
let currentOperation = "";
let isWriting = true;
let step = 0;
const calcHistory = [
    {
        currentNumber,
        storedNumber,
        currentOperation,
        isWriting,
    },
];
const storedNumberNode = document.getElementById("stored-number");
const currentNumberNode = document.getElementById("current-number");
const controller = document.getElementById("controller");
controller === null || controller === void 0 ? void 0 : controller.addEventListener("click", (e) => {
    if (e.target === e.currentTarget || !(e.target instanceof HTMLElement)) {
        return;
    }
    if (e.target.dataset.number) {
        clickNumber(e.target.dataset.number);
        updateCalcHistory();
        updateDisplay();
    }
    else if (e.target.dataset.operation) {
        clickOperation(e.target.dataset.operation);
        if (e.target.dataset.operation === "allclear") {
            clearCalcHistory();
        }
        if (e.target.dataset.operation !== "back") {
            updateCalcHistory();
        }
        updateDisplay();
    }
});
function currentNumberIsLegit() {
    return !Number.isNaN(+currentNumber);
}
function clickNumber(num) {
    if (currentNumber === "0" || !isWriting) {
        currentNumber = num === "." ? "0." : num;
        isWriting = true;
        return;
    }
    if (currentNumber.length >= 12) {
        return;
    }
    else if (num === "." && currentNumber.includes(".")) {
        return;
    }
    else {
        currentNumber += num;
    }
    if (num === "." && currentNumber.includes(".")) {
        return;
    }
    if (currentOperation === "") {
        storedNumber = "";
    }
}
function setInitialValues() {
    currentNumber = "0";
    storedNumber = "";
    currentOperation = "";
    isWriting = true;
}
function setPreviousValues() {
    if (step <= 0) {
        step = 0;
        return;
    }
    step--;
    const { currentNumber: c, storedNumber: s, currentOperation: co, isWriting: is, } = calcHistory[step];
    calcHistory.pop();
    currentNumber = c;
    storedNumber = s;
    currentOperation = co;
    isWriting = is;
}
function clickOperation(operation) {
    if (operation === "allclear" || !currentNumberIsLegit()) {
        setInitialValues();
        return;
    }
    if (operation === "back") {
        setPreviousValues();
        return;
    }
    if (operation === "equals") {
        if (!storedNumber) {
            return;
        }
        if (storedNumber && currentNumber)
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
        case "percent":
            result = String((+currentNumber * +storedNumber) / 100);
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
        percent: "%",
    };
    storedNumberNode.innerText =
        storedNumber &&
            `${storedNumber} ${currentOperation === "" ? "" : operationText[currentOperation]}`;
    if (currentNumberIsLegit())
        currentNumberNode.innerText = currentNumber;
    else
        currentNumberNode.innerText = "Error";
}
function updateCalcHistory() {
    calcHistory.push({
        currentNumber,
        storedNumber,
        currentOperation,
        isWriting,
    });
    step++;
}
function clearCalcHistory() {
    calcHistory.length = 1;
    step = 0;
}
updateDisplay();
