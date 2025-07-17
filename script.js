document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const historyOperand1 = document.getElementById('history-operand1');
    const historyOperator = document.getElementById('history-operator');
    const keys = document.querySelector('.keys');

    let currentInput = '0';
    let operator = null;
    let operand1 = null;
    let shouldResetDisplay = false;

    function updateDisplay() {
        display.textContent = currentInput;
        historyOperand1.textContent = operand1 !== null ? operand1 : '';
        historyOperator.textContent = operator || '';
    }

    function calculate() {
        const prev = parseFloat(operand1);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;

        let result;
        switch (operator) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract':
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide':
                result = prev / current;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = null;
        operand1 = null;
        shouldResetDisplay = true;
    }

    keys.addEventListener('click', (event) => {
        const key = event.target;
        const keyText = key.textContent;

        if (key.classList.contains('number')) {
            if (currentInput === '0' || shouldResetDisplay) {
                currentInput = keyText;
                shouldResetDisplay = false;
            } else {
                currentInput += keyText;
            }
        } else if (key.classList.contains('operator')) {
            if (operator !== null) {
                calculate();
            }
            operand1 = currentInput;
            operator = key.dataset.operator;
            shouldResetDisplay = true;
        } else if (key.classList.contains('function')) {
            const func = key.dataset.function;
            if (func === 'clear') {
                currentInput = '0';
                operator = null;
                operand1 = null;
            } else if (func === 'equals') {
                if (operator === null || operand1 === null) return;
                calculate();
            }
        }

        updateDisplay();
    });

    // Initial display update
    updateDisplay();
});
