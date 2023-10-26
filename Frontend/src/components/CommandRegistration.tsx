import { REPLFunction } from "../functions/REPLFunction";
import { Dispatch, SetStateAction, useState } from "react";


export class CommandRegistry {
  private static registry: Map<string, REPLFunction> = new Map();

  static registerCommand(commandName: string, commandFunction: REPLFunction): void {
    CommandRegistry.registry.set(commandName, commandFunction);
    
  }

  static async executeCommand(commandName: string, args: string[]): Promise<[string, string[][]]> {
    const commandFunction = CommandRegistry.registry.get(commandName);
    if (commandFunction) {
      try {
        // Wait for the commandFunction to complete and return its result
        const result = await commandFunction(args);
        return result;
      } catch (error) {
        return Promise.reject([`Error executing command '${commandName}': ${error}`, []]);
      }
    } else {
      return Promise.reject([`Command '${commandName}' not found.`, []]);
    }
  }

  static getRegistry(): Map<string, REPLFunction> {
    return CommandRegistry.registry;
  }
}

export default CommandRegistry;