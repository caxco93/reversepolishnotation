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
        <div key={i}>{step.join(" ")}</div>
      ))}
    </div>
  );
}

export default RPNPresentation;
