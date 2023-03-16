import React, { CSSProperties } from "react";
import reversePolishNotation, {
  RPNElement,
  RPNExpression,
  RPNSteps,
} from "@/lib/reversePolishNotation";
import "./RPNPresentation.scss";

type Props = {
  rpnExpression: RPNExpression;
};

function findLongestStep(steps: RPNSteps): Array<RPNElement> {
  return steps.reduce((previous, current) => {
    if (current.length > previous.length) {
      return current;
    } else {
      return previous;
    }
  }, steps[0]);
}

function RPNPresentation({ rpnExpression }: Props) {
  const rpnSteps: RPNSteps = reversePolishNotation(rpnExpression);
  const longest = rpnSteps.length === 0 ? [] : findLongestStep(rpnSteps);

  const containerStyle: CSSProperties = {
    height: `${longest.length * 64}px`,
  };

  return (
    <div className="RPNPresentation">
      <div className="container" style={containerStyle}>
        <div className="boxes">
          {longest.map((element, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="box">
              {element}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RPNPresentation;
