const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let resetNext = false;

// Handle button clicks
buttons.forEach(btn => {
    btn.addEventListener("click", () => handleButton(btn.textContent));
});

// Handle keyboard input
document.addEventListener("keydown", (e) => {
    const keyMap = {
        '/': '÷',
        '*': '×',
        '-': '−',
        '+': '+',
        'Enter': '=',
        'Backspace': '⌫',
        'c': 'C',
        'C': 'C'
    };

    if (!isNaN(e.key) || keyMap[e.key] || e.key === '.') {
        e.preventDefault(); // prevent unwanted page refresh (especially for Enter)
        handleButton(keyMap[e.key] || e.key);
    }
});

function handleButton(value) {
    if (value === 'C') {
        currentInput = "";
        display.textContent = "0";
        return;
    }

    if (value === '⌫') {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput || "0";
        return;
    }

    if (value === '=') {
        try {
            const expression = currentInput
                .replace(/÷/g, '/')
                .replace(/×/g, '*')
                .replace(/−/g, '-');
            const result = eval(expression);
            display.textContent = result;
            currentInput = result.toString();
            resetNext = true;
        } catch {
            display.textContent = "Error";
            currentInput = "";
        }
        return;
    }

    if (resetNext) {
        currentInput = "";
        resetNext = false;
    }

    currentInput += value;
    display.textContent = currentInput;
}
