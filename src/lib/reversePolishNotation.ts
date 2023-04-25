export type Operator = "+" | "-" | "*" | "/" | "^";
type Operation = (a: number, b: number) => number;
export type RPNElement = number | Operator;
export type RPNExpression = Array<RPNElement>;
export type RPNSteps = Array<Array<RPNElement>>;
export type Errorable<T> = { result: T; errors: Array<Error> };

export const isOperator = (element: RPNElement): element is Operator => {
  return (element as Operator).length === 1;
};

const operations: Record<Operator, Operation> = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  "^": (a, b) => a ** b,
};

const reversePolishNotation = (input: RPNExpression): Errorable<RPNSteps> => {
  const result: RPNSteps = [];
  const stack: number[] = [];
  const errors: Array<Error> = [];
  for (let i = 0; i < input.length; i++) {
    const element = input[i];
    if (isOperator(element)) {
      result.push([...stack, element]);
      const b = stack.pop();
      const a = stack.pop();
      if (a === undefined || b === undefined) {
        errors.push(
          new Error(
            `Insufficient operands for the "${element}" operator at index ${i}`
          )
        );
        break;
      }
      const c = operations[element](a, b);
      stack.push(c);
    } else {
      stack.push(element);
    }
    result.push([...stack]);
  }
  return { result, errors };
};

export const parse = (input: string): Errorable<RPNExpression> => {
  const result: RPNExpression = [];
  const errors: Array<Error> = [];
  const elements = input.split(" ");
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const number = parseFloat(element);
    if (Number.isNaN(number)) {
      if (element.length > 1) {
        errors.push(new Error(`Invalid operator "${element}" at index ${i}`));
        break;
      }
      result.push(element as Operator);
    } else {
      result.push(number);
    }
  }
  return { result, errors };
};

export default reversePolishNotation;
