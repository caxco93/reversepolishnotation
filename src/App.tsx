import React, { ChangeEvent, useState } from "react";
import "./App.css";
import { RPNExpression, parseRPNExpression } from "@/lib/reversePolishNotation";
import { rpnValidations } from "./lib/rpnValidations";
import RPNPresentation from "./components/RPNPresentation";

const sanitize = (input: string): string =>
  input.replace(/ +/g, " ").replace(/[^0-9\-+/* ^]/g, "");

function App() {
  const [rpnInput, setRpnInput] = useState("");
  const [rpnExpression, setRpnExpression] = useState<RPNExpression>([]);
  const [errors, setErrors] = useState<Array<Error>>([]);

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
      <input value={rpnInput} onChange={inputChange} />
      {errors.map((error, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={i} className="error">
          {error.message}
        </p>
      ))}
      <RPNPresentation
        key={rpnExpression.toString()}
        rpnExpression={rpnExpression}
      />
    </div>
  );
}

export default App;
