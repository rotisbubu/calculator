import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../calculator.css";
import CalculatorHistory from "./calculatorHistory";

export default function Calculator() {
  const [sequence, setSequence] = useState<string[]>(["0"]);
  const [history, setHistory] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [calculationComplete, setCalculationComplete] =
    useState<boolean>(false);

  const maxLength = 12; //Maximum length for result and numbers
  const handleInput = (input: string) => {
    const lastInput = sequence[sequence.length - 1];

    // If a calculation is complete, start a new sequence with the input
    if (calculationComplete) {
      if (["+", "-", "x", "/"].includes(input)) {
        // Continue with the result for the next calculation
        setSequence([...sequence, input]);
      } else {
        // Start a new sequence with the number
        setSequence([input]);
      }
      setCalculationComplete(false);
      return;
    }

    if (["+", "-", "x", "/"].includes(input)) {
      // If the last input is already an symbol, replace it
      if (["+", "-", "x", "/"].includes(lastInput)) {
        setSequence([...sequence.slice(0, -1), input]); // Replace the symbol
      } else {
        setSequence([...sequence, input]); // Add the symbol
      }
    } else {
      // Handle number inputs
      if (sequence.length === 1 && sequence[0] === "0") {
        setSequence([input]); // Replace the initial zero
      } else if (["+", "-", "x", "/"].includes(lastInput)) {
        setSequence([...sequence, input]); // Start the second number
      } else {
        // Append digit to the current number if it doesn't exceed MAX_LENGTH
        const updatedLast = lastInput + input;
        if (updatedLast.length > maxLength) {
          setSequence(["Err"]); // Set error if length exceeds maxLength
        } else {
          setSequence([...sequence.slice(0, -1), updatedLast]);
        }
      }
    }
    // Override "Err" with a new number input
    if (sequence[0] === "Err") {
      setSequence([input]);
      setCalculationComplete(false);
      return;
    }
  };

  const calculate = () => {
    if (sequence.length !== 3) {
      setSequence(["Err"]);
      return;
    }

    const [firstNum, symbol, secondNum] = sequence;
    const operator = symbol === "x" ? "*" : symbol; // Convert 'x' to '*'
    try {
      if (operator === "/" && parseFloat(secondNum) === 0) {
        setSequence(["Err"]);
        setCalculationComplete(false);
        return;
      }
      const result = eval(`${firstNum} ${operator} ${secondNum}`); // Simple calculation
      const resultStr = result.toString();
      if (resultStr.length > maxLength) {
        setSequence(["Err"]); // Error jika hasil lebih dari 12 angka
      } else {
        setHistory((prev) => [...prev, `${resultStr}`]); // Simpan ke history
        setSequence([resultStr]); // Atur hasil ke sequence
        setCalculationComplete(true);
      }
    } catch (err) {
      setSequence(["Err"]);
      setCalculationComplete(false);
    }
  };

  const clearAll = () => {
    setSequence(["0"]);
    setError("");
    setCalculationComplete(false);
  };

  const deleteLast = () => {
    if (calculationComplete) {
      // If the calculation is complete, reset to "0"
      setSequence(["0"]);
      setCalculationComplete(false);
    } else if (sequence.length > 0) {
      const lastInput = sequence[sequence.length - 1];
      if (!["+", "-", "x", "/"].includes(lastInput)) {
        // If the last input is a number, remove its last digit
        const updatedLast = lastInput.slice(0, -1); // Remove the last character
        if (updatedLast) {
          // If there are still digits left, update the sequence
          setSequence([...sequence.slice(0, -1), updatedLast]);
        } else {
          // If no digits are left, replace it with "0"
          setSequence(sequence.length > 1 ? sequence.slice(0, -1) : ["0"]);
        }
      } else {
        // If the last input is an operator, simply remove it
        setSequence(sequence.slice(0, -1));
      }
    } else {
      // Reset to "0" if the sequence is empty
      setSequence(["0"]);
    }
    if (sequence[0] === "Err") {
      // Reset the sequence when "Err" is the result
      clearAll();
      return;
    }
  };

  const navigate = useNavigate();
  const handleNavigateSupport = () => {
    navigate("/SupportPage");
  };

  return (
    <div className="calculator">
      <div className="calculator-container">
        <div className="display">
          <div className="history">
            {history.length > 0
              ? history.map((entry, index) => (
                  <div key={index} className="history-entry">
                    {entry}
                  </div>
                ))
              : ""}
          </div>
          <p className="result">{sequence.join(" ")}</p>
          {error && <p className="error">{error}</p>}
        </div>
        <div className="buttons">
          <div className="btn-container1">
            <button className="btn" onClick={clearAll}>
              C
            </button>
            <button className="btn" onClick={deleteLast}>
              DEL
            </button>
            <button className="btn-support" onClick={handleNavigateSupport}>
              ?
            </button>
            <button className="btn-operation" onClick={() => handleInput("/")}>
              /
            </button>
            <button className="btn" onClick={() => handleInput("1")}>
              1
            </button>
            <button className="btn" onClick={() => handleInput("2")}>
              2
            </button>
            <button className="btn" onClick={() => handleInput("3")}>
              3
            </button>
            <button className="btn-operation" onClick={() => handleInput("x")}>
              x
            </button>
            <button className="btn" onClick={() => handleInput("4")}>
              4
            </button>
            <button className="btn" onClick={() => handleInput("5")}>
              5
            </button>
            <button className="btn" onClick={() => handleInput("6")}>
              6
            </button>
            <button className="btn-operation" onClick={() => handleInput("-")}>
              -
            </button>
            <button className="btn" onClick={() => handleInput("7")}>
              7
            </button>
            <button className="btn" onClick={() => handleInput("8")}>
              8
            </button>
            <button className="btn" onClick={() => handleInput("9")}>
              9
            </button>
            <button className="btn-operation" onClick={() => handleInput("+")}>
              +
            </button>
          </div>
          <div className="btn-container2">
            <button className="btn-zero" onClick={() => handleInput("0")}>
              0
            </button>
            <button className="btn-equal" onClick={calculate}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
