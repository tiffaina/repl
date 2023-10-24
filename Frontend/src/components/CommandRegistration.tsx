import { REPLFunction } from "../functions/REPLFunction";
import { Dispatch, SetStateAction, useState } from "react";


class CommandRegistry {
  private static registry: Map<string, REPLFunction> = new Map();

  static registerCommand(commandName: string, commandFunction: REPLFunction): void {
    CommandRegistry.registry.set(commandName, commandFunction);
  }

  static executeCommand(commandName: string, args: string[], setters: Map<string, Dispatch<SetStateAction<any>>>): Promise<string> {
    const commandFunction = CommandRegistry.registry.get(commandName);
    if (commandFunction) {
      return commandFunction(args, setters);
    } else {
      return Promise.reject(`Command '${commandName}' not found.`);
    }
  }
}

export default CommandRegistry;