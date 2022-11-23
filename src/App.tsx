import { ChangeEvent, useState } from "react";
import "./App.css";
import reversePolishNotation, {
  Operator,
  RPNExpression,
} from "@/lib/reversePolishNotation";

function App() {
  const [rpnExpression, setRpnExpression] = useState<RPNExpression>([]);
  const rpnSteps = reversePolishNotation(rpnExpression);

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const _rpnExpression = input.split(" ").map((element) => {
      const number = parseFloat(element);
      if (isNaN(number)) {
        return element as Operator;
      } else {
        return number;
      }
    });
    setRpnExpression(_rpnExpression);
  };

  return (
    <div className="App">
      <h1>Reverse Polish Notation</h1>
      <input onChange={inputChange} />
      {rpnSteps.map((step) => (
        <div>{step.join("  ")}</div>
      ))}
    </div>
  );
}

export default App;
