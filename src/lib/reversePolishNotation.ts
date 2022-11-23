type Operator = "+" | "-" | "*" | "/" | "^";
export type RPNElement = number | Operator;
export type RPNExpression = Array<RPNElement>;
type RPNSteps = Array<Array<number>>;

export const isOperator = (element: RPNElement): element is Operator => {
  return (element as Operator).length !== undefined;
};

const reversePolishNotation = (input: RPNExpression): RPNSteps => {
  return [[]];
};
export default reversePolishNotation;
