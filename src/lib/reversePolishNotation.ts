type Operator = "+" | "-" | "*" | "/" | "^";
type Operation = (a: number, b: number) => number;
export type RPNElement = number | Operator;
export type RPNExpression = Array<RPNElement>;
type RPNSteps = Array<Array<number>>;

export const isOperator = (element: RPNElement): element is Operator => {
  return (element as Operator).length !== undefined;
};

const operations: Record<Operator, Operation> = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  "^": (a, b) => a ** b,
};

const reversePolishNotation = (input: RPNExpression): RPNSteps => {
  const result: RPNSteps = [];
  const stack: number[] = [];
  input.forEach((element) => {
    if (isOperator(element)) {
      const a = stack.pop();
      const b = stack.pop();
      if (a === undefined || b === undefined) {
        throw new Error("Insufficient operands in expression");
      }
      const c = operations[element](a, b);
      stack.push(c);
    } else {
      stack.push(element);
    }
    result.push([...stack]);
  });
  return result;
};
export default reversePolishNotation;
