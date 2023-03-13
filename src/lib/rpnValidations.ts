type validationError = [(input: string) => boolean, Error];
const validationFunctions: Array<validationError> = [
  [
    (input) => {
      return input.length > 0;
    },
    Error("Input should not be empty"),
  ],
];

function isDefined<T>(argument: T | undefined): argument is T {
  return argument !== undefined;
}

export function rpnValidations(input: string): Error[] {
  return validationFunctions
    .map(([fn, error]) => {
      return fn(input) ? undefined : error;
    })
    .filter(isDefined);
}
