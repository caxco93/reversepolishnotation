import React, { ChangeEvent, useState } from "react";
import "./App.css";
import reversePolishNotation, {
  RPNSteps,
  parseRPNExpression,
} from "@/lib/reversePolishNotation";
import { rpnValidations } from "./lib/rpnValidations";
import RPNPresentation from "./components/RPNPresentation";
import sanitize from "./lib/sanitization";

// We only need to show 1 set of errors.
// We are doing this instead of doing multiple conditioned early returns
// inside the input change function for each set of errors.
const handleErrors = (...args: Array<Error[]>) => {
  const shownErrors = args.find((errors) => errors.length > 0);
  return shownErrors || [];
};

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

    const shownErrors = handleErrors(
      parseErrors,
      validationErrors,
      evaluationErrors
    );

    setErrors(shownErrors);
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
