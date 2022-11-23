type Operator = "+" | "-" | "*" | "/" | "^";
type RPNElement = number | Operator;
export type RPNExpression = Array<RPNElement>;
type RPNSteps = Array<Array<number>>;

const reversePolishNotation = (input: RPNExpression): RPNSteps => {
  return [[]];
};
export default reversePolishNotation;
