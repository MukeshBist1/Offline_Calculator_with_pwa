let resultField = document.getElementById('result');
let historyField = document.getElementById('calculation-history');

function appendChar(char) {
    resultField.value += char;
}

function clearResult() {
    resultField.value = '';
    historyField.innerText = '';
}

function deleteChar() {
    resultField.value = resultField.value.slice(0, -1);
}

function calculateResult() {
    try {
        let expression = resultField.value;
        let result = eval(expression);
        historyField.innerText = `${expression} =`;
        resultField.value = result;
    } catch (error) {
        resultField.value = 'Error';
    }
}
