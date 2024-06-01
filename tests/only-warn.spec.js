import { Linter } from "eslint";
import { disable, enable } from "../src/only-warn"; // apply patch
import { describe, it, expect } from "vitest";

describe("eslint-plugin-only-warn", () => {
  const linter = new Linter();
  const config = {
    rules: { semi: 2 }, // error on missing `;`
  };
  const sourceCode = "var foo";
  it("should downgrade error(2) to warn(1)", () => {
    const messages = linter.verify(sourceCode, config);
    expect(messages[0].severity).toBe(1);
  });

  const sourceCodeFatalError = "var foo = ( => {}";
  it("should not downgrade fatal error(2)", () => {
    const messages = linter.verify(sourceCodeFatalError, config);
    expect(messages[0].fatal).toBe(true);
    expect(messages[0].severity).toBe(2);
  });

  it("can be temporally disabled", () => {
    disable();
    const messages1 = linter.verify(sourceCode, config);
    expect(messages1[0].severity).toBe(2);
    enable();
    const messages2 = linter.verify(sourceCode, config);
    expect(messages2[0].severity).toBe(1);
  });
});
