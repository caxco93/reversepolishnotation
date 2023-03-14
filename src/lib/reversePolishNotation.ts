export type Operator = "+" | "-" | "*" | "/" | "^";
type Operation = (a: number, b: number) => number;
export type RPNElement = number | Operator;
export type RPNExpression = Array<RPNElement>;
export type RPNSteps = Array<Array<RPNElement>>;

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
  input.forEach((element, i) => {
    if (isOperator(element)) {
      result.push([...stack, element]);
      const b = stack.pop();
      const a = stack.pop();
      if (a === undefined || b === undefined) {
        throw new Error(
          `Insufficient operands for the "${element}" operator at position ${i}`
        );
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

export const parseRPNExpression = (input: string): RPNExpression => {
  return input.split(" ").map((element) => {
    const number = parseFloat(element);
    if (isNaN(number)) {
      return element as Operator;
    } else {
      return number;
    }
  });
};

export default reversePolishNotation;
