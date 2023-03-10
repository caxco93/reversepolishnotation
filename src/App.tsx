import { ChangeEvent, useState } from "react";
import "./App.css";
import reversePolishNotation, {
  Operator,
  RPNExpression,
  RPNSteps,
  parseRPNExpression,
} from "@/lib/reversePolishNotation";

function App() {
  const [rpnInput, setRpnInput] = useState("");
  const [rpnExpression, setRpnExpression] = useState<RPNExpression>([]);

  let rpnSteps: RPNSteps = [];
  rpnSteps = reversePolishNotation(rpnExpression);

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setRpnInput(input);
    if (input.length > 0) {
      const _rpnExpression = parseRPNExpression(input.trim());
      setRpnExpression(_rpnExpression);
    } else {
      setRpnExpression([]);
    }
  };

  return (
    <div className="App">
      <h1>Reverse Polish Notation</h1>
      <input value={rpnInput} onChange={inputChange} />
      {rpnSteps.map((step, i) => (
        <div key={i}>{step.join(" ")}</div>
      ))}
    </div>
  );
}

export default App;
