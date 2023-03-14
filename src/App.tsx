import { ChangeEvent, useState } from "react";
import "./App.css";
import reversePolishNotation, {
  Operator,
  RPNExpression,
  RPNSteps,
  parseRPNExpression,
} from "@/lib/reversePolishNotation";
import { rpnValidations } from "./lib/rpnValidations";

const sanitize = (input: string): string => {
  return input.replace(/ +/g, " ");
};

function App() {
  const [rpnInput, setRpnInput] = useState("");
  const [rpnExpression, setRpnExpression] = useState<RPNExpression>([]);
  const [errors, setErrors] = useState<Array<Error>>([]);

  let rpnSteps: RPNSteps = [];
  rpnSteps = reversePolishNotation(rpnExpression);

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = sanitize(event.target.value);
    setRpnInput(input);

    const _rpnExpression = parseRPNExpression(input.trim());

    const _errors = rpnValidations(_rpnExpression);
    setErrors(_errors);

    if (_errors.length === 0) {
      setRpnExpression(_rpnExpression);
    } else {
      setRpnExpression([]);
    }
  };

  return (
    <div className="App">
      <h1>Reverse Polish Notation</h1>
      <input value={rpnInput} onChange={inputChange} autoFocus={true} />
      {errors.map((error, i) => (
        <p key={i} className="error">
          {error.message}
        </p>
      ))}
      {rpnSteps.map((step, i) => (
        <div key={i}>{step.join(" ")}</div>
      ))}
    </div>
  );
}

export default App;
