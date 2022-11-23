import { isOperator, RPNElement } from "@/lib/reversePolishNotation";
import { describe, it, expect } from "vitest";

describe("isOperator", () => {
  it("returns true for operator characters", () => {
    const operators: RPNElement[] = ["+", "-", "*", "/", "^"];
    operators.forEach((operator) => {
      const output = isOperator(operator);
      expect(output).toBe(true);
    });
  });

  it("returns false when given a number", () => {
    const operators: RPNElement[] = [10, 2, 6, 4, 55];
    operators.forEach((operator) => {
      const output = isOperator(operator);
      expect(output).toBe(false);
    });
  });
});
