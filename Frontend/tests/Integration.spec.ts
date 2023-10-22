import { test, expect } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

/**
 * test load and view with mode, then without mode
 */
test("mode, load, and view success (verbose mode then brief mode)", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/filepath1");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText(
    "load_file data/filepath1"
  );
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandString2")).toHaveText("view");
  await expect(page.getByLabel("commandMessage2")).toHaveText("View success!");
  /** check that the data table was loaded */
  await expect(page.getByLabel("data2", { exact: true })).toBeVisible();
  await expect(page.getByLabel("data2cell0,0")).toHaveText("1");
  await expect(page.getByLabel("data2cell0,1")).toHaveText("2");
  await expect(page.getByLabel("data2cell0,2")).toHaveText("3");
  await expect(page.getByLabel("data2cell0,3")).toHaveText("4");
  await expect(page.getByLabel("data2cell0,4")).toHaveText("5");
  await expect(page.getByLabel("data2cell1,0")).toHaveText("The");
  await expect(page.getByLabel("data2cell1,1")).toHaveText("song");
  await expect(page.getByLabel("data2cell1,2")).toHaveText("remains");
  await expect(page.getByLabel("data2cell1,3")).toHaveText("the");
  await expect(page.getByLabel("data2cell1,4")).toHaveText("same.");
  await expect(page.getByLabel("data2", { exact: true })).toHaveText(
    "12345Thesongremainsthesame."
  );

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  await expect(page.getByLabel("commandMessage3")).toHaveText("Mode success!");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 4 times" }).click();
  await expect(page.getByLabel("commandMessage4")).toHaveText("View success!");
  await expect(page.getByLabel("data4", { exact: true })).toBeVisible;
});

/**
 * try to load a valid file, then view, then an invalid file, then view
 */
test("mode, load valid file and view, load invalid file and view, verbose mode", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandString0")).toHaveText("mode");
  await expect(page.getByLabel("commandMessage0")).toHaveText("Mode success!");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/filepath1 true");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText(
    "load_file data/filepath1 true"
  );
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandString2")).toHaveText("view");
  await expect(page.getByLabel("commandMessage2")).toHaveText("View success!");
  /** check that the data table was loaded */
  await expect(page.getByLabel("data2", { exact: true })).toBeVisible();
  await expect(page.getByLabel("data2cell0,0")).toHaveText("1");
  await expect(page.getByLabel("data2cell0,1")).toHaveText("2");
  await expect(page.getByLabel("data2cell0,2")).toHaveText("3");
  await expect(page.getByLabel("data2cell0,3")).toHaveText("4");
  await expect(page.getByLabel("data2cell0,4")).toHaveText("5");
  await expect(page.getByLabel("data2cell1,0")).toHaveText("The");
  await expect(page.getByLabel("data2cell1,1")).toHaveText("song");
  await expect(page.getByLabel("data2cell1,2")).toHaveText("remains");
  await expect(page.getByLabel("data2cell1,3")).toHaveText("the");
  await expect(page.getByLabel("data2cell1,4")).toHaveText("same.");
  await expect(page.getByLabel("data2", { exact: true })).toHaveText(
    "12345Thesongremainsthesame."
  );

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file outside-of-data-directory.csv");
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  await expect(page.getByLabel("commandString3")).toHaveText(
    "load_file outside-of-data-directory.csv"
  );
  await expect(page.getByLabel("commandMessage3")).toHaveText(
    "Error: filepath outside-of-data-directory.csv located in an unaccessible directory."
  );

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submitted 4 times" }).click();
  await expect(page.getByLabel("commandString4")).toHaveText("view");
  await expect(page.getByLabel("commandMessage4")).toHaveText(
    "Error: CSV file could not be viewed. Load correct filepath first."
  );
});

/**
 * mode, load an invalid file, try to search, load a valid file, do an unsuccessful search, do a successful search
 */
test("failed load_file, failed search, successful load_file, a failed search, then a successful search, verbose mode", async ({
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
  // Failed load_file
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/non-existent-file.csv true");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    "Error: data/non-existent-file.csv not found"
  );
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandString2")).toHaveText("search 0 0");
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    "Error: CSV file could not be searched. Load correct filepath first."
  );

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/filepath1 true");
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  await expect(page.getByLabel("commandString3")).toHaveText(
    "load_file data/filepath1 true"
  );
  await expect(page.getByLabel("commandMessage3")).toHaveText("Load success!");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 nonexistent-value");
  await page.getByRole("button", { name: "Submitted 4 times" }).click();
  await expect(page.getByLabel("commandString4")).toHaveText(
    "search 1 nonexistent-value"
  );
  await expect(page.getByLabel("commandMessage4")).toHaveText(
    "Error: search unsuccessful, could not find the value in the given column."
  );
  await expect(page.getByLabel("data4", { exact: true })).toBeEmpty();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 1 The");
  await page.getByRole("button", { name: "Submitted 5 times" }).click();
  await expect(page.getByLabel("commandString5")).toHaveText("search 1 The");
  await expect(page.getByLabel("commandMessage5")).toHaveText(
    "Search success!"
  );
  /** check that the data table was loaded */
  await expect(page.getByLabel("data5", { exact: true })).toBeVisible();
  await expect(page.getByLabel("data5cell0,0")).toHaveText("The");
  await expect(page.getByLabel("data5cell0,1")).toHaveText("song");
  await expect(page.getByLabel("data5cell0,2")).toHaveText("remains");
  await expect(page.getByLabel("data5cell0,3")).toHaveText("the");
  await expect(page.getByLabel("data5cell0,4")).toHaveText("same.");
  await expect(page.getByLabel("data5", { exact: true })).toHaveText(
    "Thesongremainsthesame."
  );
});

/**
 * mode, load a valid file, do a successful search, load a new file, try to search on the old file and fail, do a successful search on the new file
 */
test("successful load_file, successful search, successful load_file, failed search, then a successful search, verbose mode", async ({
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

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/dol_ri_earnings_disparity.csv true");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText(
    "load_file data/dol_ri_earnings_disparity.csv true"
  );
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 RI");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandString2")).toHaveText("search 0 RI");
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    "Search success!"
  );
  await expect(page.getByLabel("data2", { exact: true })).toBeVisible;
  await expect(page.getByLabel("data2", { exact: true })).toBeVisible();
  // Check that all expected rows are in the table
  await expect(page.getByLabel("data2cell0,1", { exact: true })).toHaveText(
    "White"
  );
  await expect(page.getByLabel("data2cell1,1", { exact: true })).toHaveText(
    "Black"
  );
  await expect(page.getByLabel("data2cell2,1", { exact: true })).toHaveText(
    "Native American/American Indian"
  );
  await expect(page.getByLabel("data2cell3,1", { exact: true })).toHaveText(
    "Asian-Pacific Islander"
  );
  await expect(page.getByLabel("data2cell4,1", { exact: true })).toHaveText(
    "Hispanic/Latino"
  );
  await expect(page.getByLabel("data2cell5,1", { exact: true })).toHaveText(
    "Multiracial"
  );

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv true");
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  await expect(page.getByLabel("commandString3")).toHaveText(
    "load_file data/ten-star.csv true"
  );
  await expect(page.getByLabel("commandMessage3")).toHaveText("Load success!");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 RI");
  await page.getByRole("button", { name: "Submitted 4 times" }).click();
  await expect(page.getByLabel("commandString4")).toHaveText("search 0 RI");
  await expect(page.getByLabel("commandMessage4")).toHaveText(
    "Error: search unsuccessful, could not find the value in the given column."
  );
  await expect(page.getByLabel("data4", { exact: true })).toBeEmpty();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search StarID 0");
  await page.getByRole("button", { name: "Submitted 5 times" }).click();
  await expect(page.getByLabel("commandString5")).toHaveText("search StarID 0");
  await expect(page.getByLabel("commandMessage5")).toHaveText(
    "Search success!"
  );
  await expect(page.getByLabel("data5", { exact: true })).toBeVisible();
  // Check that all expected rows are in the table
  await expect(page.getByLabel("data5cell0,0", { exact: true })).toHaveText(
    "0"
  );
  await expect(page.getByLabel("data5cell0,1", { exact: true })).toHaveText(
    "Sol"
  );
  await expect(page.getByLabel("data5cell0,2", { exact: true })).toHaveText(
    "0"
  );
  await expect(page.getByLabel("data5cell0,3", { exact: true })).toHaveText(
    "0"
  );
  await expect(page.getByLabel("data5cell0,4", { exact: true })).toHaveText(
    "0"
  );
});

/**
 * This test loads a file specifying that it has no headers, and the search fails because the user specified a
 * non-numeric column to search. The user reloads the file specifying that there are headers, and the
 * search succeeds this time.
 */
test("successful load_file without headers, unsuccessful search, successful load_file with headers, successful search, verbose mode", async ({
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
  // Load file without headers
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv false");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandString1")).toHaveText(
    "load_file data/ten-star.csv false"
  );
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
  // Search unsuccessful
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search StarID 0");
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandString2")).toHaveText("search StarID 0");
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    'Error: search unsuccessful, could not search non-numeric column ID "StarID" in file with no headers.'
  );
  await expect(page.getByLabel("data2", { exact: true })).toBeEmpty();
  // Load same file with headers
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv true");
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  await expect(page.getByLabel("commandString3")).toHaveText(
    "load_file data/ten-star.csv true"
  );
  await expect(page.getByLabel("commandMessage3")).toHaveText("Load success!");
  // Search successful
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search StarID 0");
  await page.getByRole("button", { name: "Submitted 4 times" }).click();
  await expect(page.getByLabel("commandString4")).toHaveText("search StarID 0");
  await expect(page.getByLabel("commandMessage4")).toHaveText(
    "Search success!"
  );
  await expect(page.getByLabel("data4", { exact: true })).toBeVisible();
  await expect(page.getByLabel("data4", { exact: true })).toHaveText("0Sol000");
});

/**
 * This test calls search after ten-star file has been loaded, specifying that there
 * are headers, the search succeeds (we find one row matching). We load again specifying
 * that there are no headers this time, so the search finds nothing. It is in verbose mode,
 * so we check the output shown to make sure that the proper command and proper error
 * message are shown.
 */
test("call search after loaded ten-star csv, with headers, found, no headers, nothing found, verbose mode", async ({
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
  // load_file without headers
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv true");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search StarID 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    "Search success!"
  );
  await expect(page.getByLabel("data2", { exact: true })).toHaveText("0Sol000");
  // load_file with headers
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/ten-star.csv");
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  await expect(page.getByLabel("commandMessage3")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search StarID 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 4 times" }).click();
  await expect(page.getByLabel("commandMessage4")).toHaveText(
    'Error: search unsuccessful, could not search non-numeric column ID "StarID" in file with no headers.'
  );
  await expect(page.getByLabel("data4", { exact: true })).toBeEmpty();
});
