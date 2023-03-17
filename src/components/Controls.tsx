import React, { Dispatch, SetStateAction } from "react";
import "./Controls.scss";

type Props = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  stepsLength: number;
};

function Controls({ step, setStep, stepsLength }: Props) {
  const maxStep = Math.max(0, stepsLength - 1);

  const previousStep = () => {
    setStep((x) => Math.max(0, x - 1));
  };
  const nextStep = () => {
    setStep((x) => Math.min(x + 1, maxStep));
  };
  return (
    <div className="buttons">
      <button
        type="button"
        onClick={() => {
          setStep(0);
        }}
      >
        ⏪
      </button>
      <button type="button" onClick={previousStep}>
        ⬅️
      </button>
      <span>
        {step + 1}/{maxStep + 1}
      </span>
      <button type="button" onClick={nextStep}>
        ➡️
      </button>
      <button
        type="button"
        onClick={() => {
          setStep(maxStep);
        }}
      >
        ⏩
      </button>
    </div>
  );
}

export default Controls;
