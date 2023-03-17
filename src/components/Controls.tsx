import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  stepsLength: number;
};

function Controls({ setStep, stepsLength }: Props) {
  const maxStep = Math.max(0, stepsLength - 1);
  return (
    <div className="buttons">
      <button
        type="button"
        onClick={() => {
          setStep((x) => Math.max(0, x - 1));
        }}
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => {
          setStep((x) => Math.min(x + 1, maxStep));
        }}
      >
        →
      </button>
    </div>
  );
}

export default Controls;
