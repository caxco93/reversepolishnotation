type Operator = "+" | "-" | "*" | "/" | "^";
type RPNElement = number | Operator;
export type RPNExpression = Array<RPNElement>;
type RPNSteps = Array<Array<number>>;

export const isOperator = (element: RPNElement) => {};

const reversePolishNotation = (input: RPNExpression): RPNSteps => {
  return [[]];
};
export default reversePolishNotation;
