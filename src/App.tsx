import { ChangeEvent, useState } from "react";
import "./App.css";
import reversePolishNotation, {
  Operator,
  RPNExpression,
  RPNSteps,
  parseRPNExpression,
} from "@/lib/reversePolishNotation";
import { rpnValidations } from "./lib/rpnValidations";

function App() {
  const [rpnInput, setRpnInput] = useState("");
  const [rpnExpression, setRpnExpression] = useState<RPNExpression>([]);
  const [errors, setErrors] = useState<Array<Error>>([]);

  let rpnSteps: RPNSteps = [];
  rpnSteps = reversePolishNotation(rpnExpression);

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setRpnInput(input);
    const _errors = rpnValidations(input);
    setErrors(_errors);

    if (_errors.length === 0) {
      const _rpnExpression = parseRPNExpression(input);
      setRpnExpression(_rpnExpression);
    } else {
      setRpnExpression([]);
    }
  };

  return (
    <div className="App">
      <h1>Reverse Polish Notation</h1>
      {errors.map((error) => (
        <p className="error">{error.message}</p>
      ))}
      <input value={rpnInput} onChange={inputChange} />
      {rpnSteps.map((step, i) => (
        <div key={i}>{step.join(" ")}</div>
      ))}
    </div>
  );
}

export default App;
