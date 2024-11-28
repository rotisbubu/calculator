import React, { useState } from "react";
import "../calculator.css";

interface HistoryProps {
  history: string[];
}

export default function CalculatorHistory({ history }: HistoryProps) {
  return (
    <div className="history">
      {history.length === 0
        ? ""
        : history.map((entry, index) => (
            <div key={index} className="history-entry">
              {entry}
            </div>
          ))}
    </div>
  );
}
