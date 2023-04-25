const sanitize = (input: string): string =>
  input.replace(/ +/g, " ").replace(/[^0-9\-+/* ^]/g, "");

export default sanitize;
