# Calculator

**[Live demo](https://alpuneeth.github.io/Calculator/)**

![Calculator screenshot](images/Cal_ss.png) 

A browser-based calculator built as part of [The Odin Project](https://www.theodinproject.com/) Foundations curriculum. It supports basic arithmetic operations, chained calculations, keyboard input, and dynamic display sizing, with a custom pastel-themed UI and kawaii cat wallpaper.

## Features

- **Arithmetic operations:** Addition, subtraction, multiplication, division, modulo, and exponentiation.
- **Chained calculations:** Perform consecutive operations using strict left-to-right evaluation, without operator precedence (`2 + 3 * 4` gives `20`, not `14`).
- **Decimal support:** Enter decimal numbers while preventing duplicate decimal points within an operand.
- **Clear controls:** Use `C` to delete the last character and `AC` to reset the calculator.
- **Error handling:** Handles division by zero with a custom error message.
- **Dynamic display sizing:** Automatically reduces the font size when the displayed content becomes too wide.
- **Keyboard support:** Enter numbers and operators using the keyboard, press `Enter` to calculate, and use `Backspace` to clear the last character.
- **Custom UI:** Pastel colors, rounded buttons, and a hand-drawn kawaii cat wallpaper.

## Built With

- HTML5
- CSS3
- JavaScript (Vanilla)

## Getting Started

### Run Locally

1. Clone the repository:

    ```bash
   git clone https://github.com/alPuneeth/Calculator.git
   ```

   (With SSH configured: `git clone git@github.com:alPuneeth/Calculator.git`)

2. Navigate to the project directory:

   ```bash
   cd calculator
   ```

3. Open `index.html` in your browser, or use the Live Server extension in Visual Studio Code.

No additional dependencies or build tools are required.

## How to Use

1. Enter the first number.
2. Select an arithmetic operator.
3. Enter the second number.
4. Press `=` to display the result.
5. Continue with another operator to perform a chained calculation.

> **Note:** Like many basic pocket calculators, this one evaluates each operation as soon as the next operator is pressed, so operator precedence is not applied. `2 + 3 * 4` is calculated as `(2 + 3) * 4 = 20`.

### Keyboard Shortcuts

| Key | Action |
|---|---|
| `0–9` | Enter digits |
| `+`, `-`, `*`, `/`, `%`, `^` | Select an operator |
| `.` | Enter a decimal point |
| `Enter` | Calculate |
| `Backspace` | Delete the last character |

## What I Learned

- Manipulating the DOM and handling user events.
- Managing calculator state across multiple operations.
- Working with functions, conditionals, and input validation.
- Handling decimal precision and edge cases.
- Implementing keyboard interactions.
- Using CSS Flexbox and styling interactive elements.
- Managing source code with Git.

## Acknowledgements

- [The Odin Project](https://www.theodinproject.com/) — curriculum and project inspiration.
- OpenAI image generation — custom kawaii cat wallpaper artwork.

---

