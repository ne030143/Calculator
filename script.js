let Total = 0;
let InputNumber = "0";
let previousOperator;

const screen = document.querySelector('.screen');


function handleDecimal() {
    if (!InputNumber.includes('.')) {
        InputNumber += '.';
    }
}

function buttonClick(value) {
    if (isNaN(value)) {
        if (value === '.') {
            handleDecimal();
        } else {
            handleSymbol(value);
        }
    } else {
        handleNumber(value);
    }
    screen.innerText = InputNumber;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            InputNumber = '0';
            Total = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return
            }
            flushOperation(parseFloat(InputNumber));
            previousOperator = null;
            InputNumber = Total.toString();
            Total = 0;
            break;
        case '←':
            if (InputNumber.length === 1) {
                InputNumber = '0';
            } else {
                InputNumber = InputNumber.slice(0, InputNumber.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}


function handleMath(symbol) {
    if (InputNumber === '0') {
        return;
    }
    const floatInputNumber = parseFloat(InputNumber);

    if (Total === 0) {
        Total = floatInputNumber;
    } else {
        flushOperation(floatInputNumber);
    }
    previousOperator = symbol;
    InputNumber = '0';
}

function flushOperation(floatInputNumber) {
    if (previousOperator === '+') {
        Total += floatInputNumber;
    } else if (previousOperator === '-') {
        Total -= floatInputNumber;
    } else if (previousOperator === '×') {
        Total *= floatInputNumber;
    } else if (previousOperator === '÷') {
        Total /= floatInputNumber;
    }
    Total = Total.toFixed(2);
}

function handleNumber(numberString) {
    if (InputNumber === "0") {
        InputNumber = numberString;
    } else if (InputNumber === "-0") {
        InputNumber = "-" + numberString;
    } else if (!InputNumber.includes(".") || numberString !== ".") {
        InputNumber += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function(event) {
            buttonClick(event.target.innerText);
        })
}

init();
