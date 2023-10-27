// import { describe, it } from jest;
import REPL from '../src/components/REPL';
import {CommandRegistry} from '../src/components/CommandRegistration';;
import { REPLFunction } from "../src/functions/REPLFunction";

describe("CommandRegistry", () => {
  it("should register and execute commands", async () => {
    const mockFunction: REPLFunction = async (args: string[]) => {
      return [[], []];
    };

    CommandRegistry.registerCommand("testCommand", mockFunction);

    const result = await CommandRegistry.executeCommand("testCommand", []);

    expect(result).toEqual([[], []]);
  });

  it("should handle unknown commands", async () => {
    try {
      await CommandRegistry.executeCommand("unknownCommand", []);
    } catch (error) {
      expect(error).toEqual(["Command 'unknownCommand' not found.", []]);
    }
  });

  it("should handle errors in the command execution", async () => {
    const mockErrorFunction: REPLFunction = async (args: string[]) => {
      throw new Error("Test Error");
    };

    CommandRegistry.registerCommand("errorCommand", mockErrorFunction);

    try {
      await CommandRegistry.executeCommand("errorCommand", []);
    } catch (error) {
      expect(error).toEqual(["Error executing command 'errorCommand': Error: Test Error", []]);
    }
  });

  it("should retrieve the command registry", () => {
    const registry = CommandRegistry.getRegistry();
    expect(registry).toBeInstanceOf(Map);
  });
});