import { test, expect } from "@playwright/test";

/**
 * This test calls load_file with no arguments. It is in brief mode, so we
 * check the output shown to make sure that the proper error message is shown.
 */
test("call load_file with no arguments, brief mode", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: incorrect number of arguments given to load_file command"
  );
});

/**
 * This test calls load_file with no arguments. It is in verbose mode, so we
 * check the output shown to make sure that the proper command string and
 * the proper error message are shown.
 */
test("call load_file with no arguments, verbose mode", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // set into verbose mode
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText("load_file");
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    "Error: incorrect number of arguments given to load_file command"
  );
});

/**
 * This test calls load_file with a file that is not in the data directory, and thus
 * not accessible. It is in brief mode, so we check the output shown to make sure
 * that the proper error message is shown.
 */
test("call load_file with non-accessible file, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file outside-of-data-directory.csv");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: filepath outside-of-data-directory.csv located in an unaccessible directory."
  );
});

/**
 * This test calls load_file with a file that is not in the data directory, and thus
 * not accessible. It also specifies that headers are true. It is in brief mode, so we
 * check the output shown to make sure that the proper error message is shown.
 */
test("call load_file with non-accessible file, brief mode, true headers", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file outside-of-data-directory.csv true");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: filepath outside-of-data-directory.csv located in an unaccessible directory."
  );
});

/**
 * This test calls load_file with a file that is not in the data directory, and thus
 * not accessible. It is in verbose mode, so we check the output shown to make sure
 * that the proper command string and the proper error message are shown.
 */
test("call load_file with non-accessible file, verbose mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // set into verbose mode
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file outside-of-data-directory.csv");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText(
    "load_file outside-of-data-directory.csv"
  );
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    "Error: filepath outside-of-data-directory.csv located in an unaccessible directory."
  );
});

/**
 * This test calls load_file with a file that is in the data directory but
 * 'doesn't exist' in the data directory. It is in brief mode, so we check the
 * output shown to make sure that the proper error message is shown.
 */
test("call load_file with file in data that 'doesn't exist', brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/non-existent.csv");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: data/non-existent.csv not found"
  );
});

/**
 * This test calls load_file with a file that is in the data directory but
 * 'doesn't exist' in the data directory. It is in verbose mode, so we check the
 * output shown to make sure that the proper command string and the proper error
 * message are shown.
 */
test("call load_file with file in data that 'doesn't exist', verbose mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // set into verbose mode
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/non-existent.csv");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText(
    "load_file data/non-existent.csv"
  );
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    "Error: data/non-existent.csv not found"
  );
});

/**
 * This test calls load_file with an empty csv file. It is in brief mode, so we
 * check the output shown to make sure that the success message is shown.
 */
test("successful call load_file with empty csv file, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/empty.csv");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText("Load success!");
});

/**
 * This test calls load_file with an empty csv file. It is in verbose mode, so we
 * check the output shown to make sure that the proper command string and the
 * proper success message are shown.
 */
test("successful call load_file with empty csv file, verbose mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // set into verbose mode
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/empty.csv");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText(
    "load_file data/empty.csv"
  );
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
});

/**
 * This test calls load_file with the ten-star csv file. It is in brief mode, so we
 * check the output shown to make sure that the success message is shown.
 */
test("successful call load_file with ten-star csv file, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/ten-star.csv");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText("Load success!");
});

/**
 * This test calls load_file with the ten-star csv file. It is in verbose mode, so
 * we check the output shown to make sure that the proper command string and the
 * proper success message are shown.
 */
test("successful call load_file with ten-star csv file, verbose mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // set into verbose mode
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/ten-star.csv");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText(
    "load_file data/ten-star.csv"
  );
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
});

/**
 * This test calls load_file with the ten-star csv file, specifying that the
 * file has headers. It is in brief mode, so we check the output shown to make sure
 * that the success message is shown.
 */
test("successful call load_file with ten-star csv file, brief mode, true headers", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv true");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText("Load success!");
});

/**
 * This test calls load_file with the ten-star csv file, specifying that the
 * file has headers with an uppercase TRUE, which still works. It is in brief mode,
 * so we check the output shown to make sure that the success message is shown.
 */
test("successful call load_file with ten-star csv file, brief mode, TRUE headers (uppercase)", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv TRUE");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText("Load success!");
});

/**
 * This test calls load_file with the ten-star csv file, specifying that the
 * file has headers. It is in verbose mode, so we check the output shown to make
 * sure that the proper command string and the proper success message are shown.
 */
test("successful call load_file with ten-star csv file, verbose mode, true headers", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // set into verbose mode
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv true");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText(
    "load_file data/ten-star.csv true"
  );
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
});

/**
 * This test calls load_file with the ten-star csv file, specifying that the
 * file has no headers. It is in brief mode, so we check the output shown to make sure
 * that the success message is shown.
 */
test("successful call load_file with ten-star csv file, brief mode, false headers", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv false");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText("Load success!");
});

/**
 * This test calls load_file with the ten-star csv file, specifying that the
 * file has no headers. It is in verbose mode, so we check the output shown to make
 * sure that the proper command string and the proper success message are shown.
 */
test("successful call load_file with ten-star csv file, verbose mode, false headers", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // set into verbose mode
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv false");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText(
    "load_file data/ten-star.csv false"
  );
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
});

/**
 * This test calls load_file with the ten-star csv file, but with a third command line
 * argument (for determining headers) that is neither true nor false. It is in brief
 * mode, so we check the output shown to make sure that the proper error message is shown.
 */
test("call load_file with ten-star csv file, brief mode, non true/false headers", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv hello");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: header parameter must be either true or false."
  );
});

/**
 * This test calls load_file with the ten-star csv file, but with a third command line
 * argument (for determining headers) that is neither true nor false. It is in verbose
 * mode, so we check the output shown to make sure that the proper command string
 * and the proper error message are shown.
 */
test("call load_file with ten-star csv file, verbose mode, non true/false headers", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // set into verbose mode
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv hello");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText(
    "load_file data/ten-star.csv hello"
  );
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    "Error: header parameter must be either true or false."
  );
});
