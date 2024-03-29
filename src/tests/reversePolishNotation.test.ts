import { expect, describe, it } from "vitest";
import reversePolishNotation, {
  RPNExpression,
} from "@/lib/reversePolishNotation";

// Edit an assertion and save to see HMR in action

describe("Reverse Polish Notation", () => {
  it("handles simple expressions", () => {
    const input: RPNExpression = [2, 2, "+"];
    const { result: output } = reversePolishNotation(input);
    const expected = [[2], [2, 2], [2, 2, "+"], [4]];
    expect(output).toEqual(expected);
  });
  it("handles complex expressions", () => {
    const input: RPNExpression = [2, 5, "*", 6, "+", 3, 2, "^", 1, "-", "/"];
    const { result: output } = reversePolishNotation(input);
    const expected = [
      [2],
      [2, 5],
      [2, 5, "*"],
      [10],
      [10, 6],
      [10, 6, "+"],
      [16],
      [16, 3],
      [16, 3, 2],
      [16, 3, 2, "^"],
      [16, 9],
      [16, 9, 1],
      [16, 9, 1, "-"],
      [16, 8],
      [16, 8, "/"],
      [2],
    ];
    expect(output).toEqual(expected);
  });
  it("throws when short on operands", () => {
    const input: RPNExpression = [2, 2, "+", "*"];
    const { errors } = reversePolishNotation(input);
    const error = errors[0];
    expect(error.message).to.equal(
      `Insufficient operands for the "*" operator at index 3`
    );
  });
});
