import React from "react";
import reversePolishNotation, {
  RPNExpression,
  RPNSteps,
} from "@/lib/reversePolishNotation";
import "./RPNPresentation.scss";

type Props = {
  rpnExpression: RPNExpression;
};

function RPNPresentation({ rpnExpression }: Props) {
  let rpnSteps: RPNSteps = [];
  rpnSteps = reversePolishNotation(rpnExpression);
  return (
    <div className="RPNPresentation">
      {rpnSteps.map((step, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}>{step.join(" ")}</div>
      ))}
    </div>
  );
}

export default RPNPresentation;
