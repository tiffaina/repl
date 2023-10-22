/**
 * This class represents a command.
 * Its class fields includes a commandString (the command that the user typed),
 * data (the CSV data that the command returned), and message (the error or
 * success message that the command received)
 */
export class Command {
  commandString: string;
  data: string[][];
  message: string;

  /**
   * This is the constructor for Command, which creates an instance of Command.
   * @param commandString the command send by the user
   * @param data the CSV data that the command returned
   * @param message the error or success message that the command received
   */
  constructor(commandString: string, data: string[][], message: string) {
    this.commandString = commandString;
    this.data = data;
    this.message = message;
  }
}
