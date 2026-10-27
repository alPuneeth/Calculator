// 1. ARITHMETIC OPERATIONS
// -------------------------

const add = function(a, b) {
    return a + b
}

const subtract = function(a, b) {
    return a - b
}

const multiply = function(a, b) {
    return a * b
}

// Prevents division by zero and truncates the quotient to a maximum of 10 decimal places.
const divide = function(a, b) {
    if (b === 0) {
        return "snarky error message!"
    }
    return Math.trunc((a / b) * 10 ** 10)/ 10 ** 10
}

// Returns the remainder after division.
const modulo = function(a, b) {
    return a % b
}

// Raises a to the power of b.
const power = function (a, b) {
    return a ** b
}



// 2. INPUT VALIDATION AND OPERATION DISPATCH
// -------------------------------------------

// Ensures both operands are numbers.
const validateVariables = function (a, b) {
    if ((typeof a === "number") && (typeof b === "number")) {
        return true
    }
}

// Checks whether the supplied operator is supported.
const validateOperator = function (operator) {
    const operators = ["+", "-", "*", "/", "%", "^"]
    return operators.includes(operator)
}

// Validates the inputs before passing them to compute().
const operate = function (a, operator, b) {
    const validatedVars = validateVariables(a, b)
    const validatedOp = validateOperator(operator)

    if ((validatedVars) && (validatedOp)){
        return compute(a, operator, b)
    }
}

// Selects the arithmetic function corresponding to the operator.
const compute = function (a, operator, b) {

    if (operator === "+") {
        return add(a, b)
    } else if (operator === "-") {
        return subtract(a, b)
    } else if (operator === "*") {
        return multiply(a, b)
    } else if ((operator === "/")){
        return divide(a, b)
    } else if (operator === "%") {
        return modulo(a, b)
    } else if (operator === "^") {
        return power(a, b)
    } 
}



// 3. DOM REFERENCES AND CALCULATOR STATE
// --------------------------------------

// References to the display and its text element.
const display = document.querySelector(".display")
const displaySpan = document.querySelector(".display span")


// Stores the operands, operator, and calculation result.
const displayButtons = document.querySelector(".display-buttons")
let a = ""
let b = ""
let operator = ""
let result, newOperator
let clearOperator

// Tracks whether the previous action evaluated a calculation.
let justEvaluated = false

// Sets the initial display value.
displaySpan.textContent = "0"



// 4. DISPLAY HELPERS
// -------------------

// Reduces the display font size when its content overflows.
// Resets the display if the content still exceeds the available width.
const reducedSize = function () {
    displaySpan.style.fontSize = "40px"

    while ((displaySpan.scrollWidth > display.clientWidth - 12) && parseInt((getComputedStyle(displaySpan).fontSize)) > 16) {

        let textSize = getComputedStyle(displaySpan).fontSize 
        const reducedTextSize = parseInt(textSize) - 2
        displaySpan.style.fontSize = `${reducedTextSize}px`

    }

    if (displaySpan.scrollWidth > display.clientWidth - 10) {
        displaySpan.textContent = "0"
    }
}



// 5. CALCULATOR BUTTON EVENT HANDLING
// --------------------------------------

displayButtons.addEventListener("click", function (event) {

    // Finds the button that was clicked, including clicks on its children.
    const button = event.target.closest("button")
    if (!button) return
    
    // Identifies the type of button pressed.
    const digit = "0123456789.".includes(button.textContent)
    const op = "+-*%^/".includes(button.textContent)
    const evaluator = "=" === button.textContent
    const clear = "C" === button.textContent

    // AC resets the calculator to its initial state.
    const allClear = "AC" === button.textContent
    if (allClear) {
        displaySpan.textContent = "0"
        a = ""
        b = ""
        result = ""
        operator = ""
        justEvaluated = false
    }

    // Prevents further input from modifying an error message.
    // AC is handled first so the user can still reset the calculator.
    if (displaySpan.textContent === "snarky error message!") return


    // C removes the last character and updates the relevant state.
    if (clear) {
        
        clearOperator = displaySpan.textContent.at(-1)
        if ("+-*%^/".includes(clearOperator)) {
            displaySpan.textContent = displaySpan.textContent.slice(0, -1)
            operator = ""
            a = displaySpan.textContent
        } else if (displaySpan.textContent.length === 1) {
            displaySpan.textContent = "0"
            a = ""
            return
        } else if ((displaySpan.textContent) && (displaySpan.textContent !== "0")) {
            displaySpan.textContent = displaySpan.textContent.slice(0, -1)
            if (!operator) {
                a = a.slice(0, -1)
            } else if (operator) {
                b = b.slice(0, -1)
            }
        } else {
            displaySpan.textContent = "0"
            return
        }
    }

    // Accepts an operator only when no operator is currently active.
    if ((op) && (!operator)) {
        displaySpan.textContent += button.textContent
        reducedSize()
        operator = button.textContent 
    }

    // Handles input for the first operand.
    // Prevents duplicate decimal points and replaces the initial zero.
    if ((digit) && (!operator)) {
        if (displaySpan.textContent === "0" && button.textContent === ".") {
            displaySpan.textContent += button.textContent 
            return
        } else if (displaySpan.textContent === "0") {
            displaySpan.textContent = ""
        } else if (displaySpan.textContent.includes(".") && button.textContent === ".") {
            return
        }
        displaySpan.textContent += button.textContent
        a = displaySpan.textContent
        reducedSize()
    }

    // Handles input for the second operand.
    // Prevents duplicate decimal points in the second operand.
    if (((digit) && (operator) && (!evaluator)) || ((digit) && (operator) && (!justEvaluated))) {
        if (b.includes(".") && button.textContent === ".") {
            return
        }
        displaySpan.textContent += button.textContent
        b += button.textContent
        reducedSize()
        }

    // Evaluates the current expression when "=" is pressed.
    if (evaluator) {
        
        // Removes an incomplete trailing operator or decimal point.
        if (displaySpan.textContent.at(-1) === operator) {
            displaySpan.textContent = displaySpan.textContent.slice(0, -1)
            operator = ""
            a = displaySpan.textContent
            b = ""
            justEvaluated = false
        }

        if (displaySpan.textContent.at(-1) === ".") {
            displaySpan.textContent = displaySpan.textContent.slice(0, -1)
            if (b) {
                b = b.slice(0, -1)
            } else {
                a = a.slice(0, -1)
            }
        }


        if (!a || !b || !operator) return "0"

        a = Number(a)
        b = Number(b)
        result = operate(a, operator, b)
        if (typeof result === "string") {
            displaySpan.textContent = result
            reducedSize()

            a = ""
            b = ""
            operator = ""
            result = ""
            return
        } else {
            result = Number((result).toFixed(10))
        }
        displaySpan.textContent = result
        operator = ""
        a = result
        b = ""
        justEvaluated = true
        reducedSize()
    }

    newOperator = op && operator

    // Evaluates the current expression when another operator is pressed,
    // allowing chained calculations to proceed from left to right.
    if (a && b && newOperator) {
        a = Number(a)
        b = Number(b)
        result = operate(a, operator, b)
        if (typeof result === "string") {
            displaySpan.textContent = result
            reducedSize()
            a = ""
            b = ""
            operator = ""
            result = ""
            return
        } else {
            result = Number((result).toFixed(10))
        }
        a = result
        displaySpan.textContent = a + button.textContent
        reducedSize()
        b = ""
        justEvaluated = true
        operator = button.textContent
        result = ""
    }

})


// 6. KEYBOARD EVENT HANDLING
// -----------------------------

// Maps keyboard input to the corresponding calculator button.
// Backspace triggers clear; Enter triggers evaluation.
document.addEventListener("keydown", event => {
    const clearButton = Array.from(document.querySelectorAll("button")).find(btn =>((btn.textContent === "C")))
    const evaluatorButton = Array.from(document.querySelectorAll("button")).find(btn =>((btn.textContent === "=")))
    const button = Array.from(document.querySelectorAll("button")).find(btn => btn.textContent === event.key)

    if (event.key === "Backspace") {
        clearButton.click()
    } else if (event.key === "Enter") {
        evaluatorButton.click()
    } else {
        if (!button) {
            return
        } else {
        button.click()
        }
    } 
})



