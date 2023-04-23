import React, { ChangeEvent, useState } from "react";
import "./App.css";
import reversePolishNotation, {
  RPNSteps,
  parseRPNExpression,
} from "@/lib/reversePolishNotation";
import { rpnValidations } from "./lib/rpnValidations";
import RPNPresentation from "./components/RPNPresentation";

const sanitize = (input: string): string =>
  input.replace(/ +/g, " ").replace(/[^0-9\-+/* ^]/g, "");

function App() {
  const [rpnInput, setRpnInput] = useState("");
  const [rpnSteps, setRpnSteps] = useState<RPNSteps>([]);
  const [errors, setErrors] = useState<Array<Error>>([]);

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = sanitize(event.target.value);
    setRpnInput(input);

    const { result: rpnExpression, errors: parseErrors } = parseRPNExpression(
      input.trim()
    );

    const validationErrors = rpnValidations(rpnExpression);

    const { result: _rpnSteps, errors: evaluationErrors } =
      reversePolishNotation(rpnExpression);

    setRpnSteps(_rpnSteps);

    if (parseErrors.length > 0) {
      setErrors(parseErrors);
      return;
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (evaluationErrors.length > 0) {
      setErrors(evaluationErrors);
      return;
    }
  };

  return (
    <div className="App">
      <h1>Reverse Polish Notation</h1>
      <input value={rpnInput} onChange={inputChange} />
      {errors.map((error, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={i} className="error">
          {error.message}
        </p>
      ))}
      <RPNPresentation key={rpnInput} rpnSteps={rpnSteps} />
    </div>
  );
}

export default App;
