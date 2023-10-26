import { test, expect } from "@playwright/test";
import REPL from '../src/components/REPL';
import {CommandRegistry} from '../src/components/CommandRegistration';
import { mode } from "../src/functions/Mode";
import { load } from "../src/functions/Load";
import { view } from "../src/functions/View";
import { search } from "../src/functions/Search";

test.beforeEach(async ({ page }) => {
  // ... you'd put it here.
  await page.goto("http://localhost:8000/");
});

test("Executing a registered command", async ({ page }) => {
  // Navigate to your REPL page

  // Define a sample 'testCommand' function
  function testCommand(args: string[]): Promise<[string, string[][]]> {
    return Promise.resolve(["Test Result", []]);
  }

  // Register the 'testCommand'
  CommandRegistry.registerCommand("testCommand", testCommand);

  // Execute the registered command
  await page.evaluate(() => {
    // Trigger the execution of the "testCommand" using your application's UI
  });

  // Perform assertions to ensure the expected result is displayed
  const result = await page.textContent("#result-element");
  expect(result).toBe("Test Result");
});


