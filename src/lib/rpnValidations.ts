import { RPNExpression, isOperator } from "./reversePolishNotation";

type validationError = [(input: RPNExpression) => boolean, Error];
const validationFunctions: Array<validationError> = [
  [
    (input) => {
      return input.length > 0;
    },
    Error("Input should not be empty"),
  ],
  [
    (input) => {
      const operators = input.filter(isOperator);
      const numbers = input.filter((x) => !isOperator(x));
      return numbers.length === operators.length + 1;
    },
    Error("There should be 1 operator more than numbers"),
  ],
];

function isDefined<T>(argument: T | undefined): argument is T {
  return argument !== undefined;
}

export function rpnValidations(input: RPNExpression): Error[] {
  return validationFunctions
    .map(([fn, error]) => {
      return fn(input) ? undefined : error;
    })
    .filter(isDefined);
}
