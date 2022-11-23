import { expect, test } from "vitest";
import reversePolishNotation, {
  RPNExpression,
} from "@/lib/reversePolishNotation";

// Edit an assertion and save to see HMR in action

test("Reverse Polish Notation", () => {
  const input: RPNExpression = [2, 2, "+"];
  const output = reversePolishNotation(input);
  const expected = [[2], [2, 2], [4]];
  expect(output).toEqual(expected);
});
