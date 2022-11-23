import { expect, describe, it } from "vitest";
import reversePolishNotation, {
  RPNExpression,
} from "@/lib/reversePolishNotation";

// Edit an assertion and save to see HMR in action

describe("Reverse Polish Notation", () => {
  it("handles simple expressions", () => {
    const input: RPNExpression = [2, 2, "+"];
    const output = reversePolishNotation(input);
    const expected = [[2], [2, 2], [4]];
    expect(output).toEqual(expected);
  });
  it("throws when short on operands", () => {
    const input: RPNExpression = [2, 2, "+", "*"];
    expect(() => {
      reversePolishNotation(input);
    }).toThrowError("Insufficient operands in expression");
  });
});
