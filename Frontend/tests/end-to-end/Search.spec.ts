import { test, expect } from "@playwright/test";

/**
 * This test calls search before loading, without parameters, which fails.
 * It is in brief mode, so we check the output shown to make sure that the
 * proper error message is shown.
 */
test("call search without loading, without parameters, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: CSV file could not be searched. Load correct filepath first."
  );
});

/**
 * This test calls search before loading, with parameters, which fails.
 * It is in brief mode, so we check the output shown to make sure that the
 * proper error message is shown.
 */
test("call search without loading, with parameters, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Wrtite into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: CSV file could not be searched. Load correct filepath first."
  );
});

/**
 * This test calls search with no parameters, without loading, and after a gibberish
 * command, which fails. It is in brief mode, so we check the output shown to make
 * sure that the proper error message is shown.
 */
test("call search after gibberish command, without parameters, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Failed load_file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("hello");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: Please provide a valid command. Valid commands: mode, load_file <csv-file-path>, view, or search <column> <value>"
  );
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    "Error: CSV file could not be searched. Load correct filepath first."
  );
});

/**
 * This test calls search with no parameters, after load_file call failed, so
 * search fails. It is in brief mode, so we check the output shown to make
 * sure that the proper error message is shown.
 */
test("call search after failed load_file, without parameters, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // Failed load_file
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/non-existent-file.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText(
    "Error: data/non-existent-file.csv not found"
  );
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    "Error: CSV file could not be searched. Load correct filepath first."
  );
});

/**
 * This test calls search with no parameters, after load_file call failed, so
 * search fails. It is in verbose mode, so we check the output shown to make
 * sure that the proper command and proper error message are shown.
 */
test("call search after failed load_file, without parameters, verbose mode", async ({
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
    .fill("load_file data/non-existent-file.csv");
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
});

/**
 * This test calls search after an empty file has been loaded, but with no
 * parameters, so search fails. It is in brief mode, so we check the output
 * shown to make sure that the proper error message is shown.
 */
test("call search after loaded empty csv, without parameters, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // load_file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/empty.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    "Error: incorrect number of arguments given to search command. Two arguments expected: <column> <value>."
  );
});

/**
 * This test calls search after an empty file has been loaded, but the search
 * finds no matching results. It is in brief mode, so we check the output
 * shown to make sure that the proper success message is shown.
 */
test("call search after loaded empty csv, with parameters, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // load_file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/empty.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    'Search success! However, no rows matching the search criteria "search 0 0" were found.'
  );
});

/**
 * This test calls search after ten-star file has been loaded, but with no
 * parameters, so search fails. It is in brief mode, so we check the output
 * shown to make sure that the proper error message is shown.
 */
test("call search after loaded ten-star csv, without parameters, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // load_file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/ten-star.csv");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    "Error: incorrect number of arguments given to search command. Two arguments expected: <column> <value>."
  );
  await expect(page.getByLabel("data1", { exact: true })).toBeEmpty();
});

/**
 * This test calls search after ten-star file has been loaded, but no matching
 * rows are found in the data. It is in brief mode, so we check the output
 * shown to make sure that the proper success message is shown.
 */
test("call search after loaded ten-star csv, with parameters, no rows found, brief mode", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  // load_file
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv true");
  await page.getByRole("button", { name: "Submitted 0 times" }).click();
  await expect(page.getByLabel("commandMessage0")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search StarID 4");
  // Submit command
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText(
    'Search success! However, no rows matching the search criteria "search StarID 4" were found.'
  );
  await expect(page.getByLabel("data1", { exact: true })).toBeEmpty();
});

/**
 * This test calls search after ten-star file has been loaded, and one matching row
 * is found. It is in verbose mode, so we check the output shown to make sure that
 * the proper command, proper success message, and proper row of data are shown.
 */
test("call search after loaded ten-star csv, with parameters, one row found, verbose mode", async ({
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
  // load_file
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
  // Check that table shows up
  await expect(page.getByLabel("data2", { exact: true })).toBeVisible();
  // Check that the expected row is in the table
  await expect(page.getByLabel("data2", { exact: true })).toHaveText("0Sol000");
});

/**
 * This test calls search after ten-star file has been loaded, specifying that there
 * are headers. One matching rowis found. It is in verbose mode, so we check the output
 * shown to make sure that the proper command, proper success message, and proper row of
 * data are shown.
 */
test("call search after loaded ten-star csv, with headers, one row found, verbose mode", async ({
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
  // load_file
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
  // Check that table shows up
  await expect(page.getByLabel("data2", { exact: true })).toBeVisible();
  // Check that the expected row is in the table
  await expect(page.getByLabel("data2", { exact: true })).toHaveText("0Sol000");
});

/**
 * This test calls search after ten-star file has been loaded, specifying that
 * the file has no headers. One matching row is found. It is in verbose mode, so we
 * check the output shown to make sure that the proper command, proper success message,
 * and proper row of data are shown.
 */
test("call search after loaded ten-star csv, one row found, no headers, verbose mode", async ({
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
  // load_file
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv false");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    "Search success!"
  );
  // Check that table shows up
  await expect(page.getByLabel("data2", { exact: true })).toBeVisible();
  // Check that the expected row is in the table
  await expect(page.getByLabel("data2", { exact: true })).toHaveText("0Sol000");
});

/**
 * This test calls search after ten-star file has been loaded, specifying that there
 * are no headers. We try to search a non-numeric column ID, even though there are
 * no headers, so the search finds nothing. It is in verbose mode, so we check the
 * output shown to make sure that the proper command and proper error message are shown.
 */
test("call search after loaded ten-star csv, one row found, no headers, nothing found, verbose mode", async ({
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
  // load_file
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv false");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search StarID 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    'Error: search unsuccessful, could not search non-numeric column ID "StarID" in file with no headers.'
  );
  await expect(page.getByLabel("data2", { exact: true })).toBeEmpty();
});

/**
 * This test calls search after ten-star file has been loaded, specifying that there
 * are no headers. We try to search a non-numeric column ID, even though there are
 * no headers, so the search finds nothing. Then load again, now with headers, and
 * the search succeeds (we find one row matching). It is in verbose mode, so we check the
 * output shown to make sure that the proper command and proper error message are shown.
 */
test("call search after loaded ten-star csv, no headers, nothing found, headers, found, verbose mode", async ({
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
  await page.getByLabel("Command input").fill("load_file data/ten-star.csv");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search StarID 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    'Error: search unsuccessful, could not search non-numeric column ID "StarID" in file with no headers.'
  );
  await expect(page.getByLabel("data2", { exact: true })).toBeEmpty();
  // load_file with headers
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/ten-star.csv true");
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  await expect(page.getByLabel("commandMessage3")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search StarID 0");
  // Submit command
  await page.getByRole("button", { name: "Submitted 4 times" }).click();
  await expect(page.getByLabel("commandMessage4")).toHaveText(
    "Search success!"
  );
  await expect(page.getByLabel("data4", { exact: true })).toHaveText("0Sol000");
});

/**
 * This test calls search after ten-star file has been loaded, multiple matching rows are found.
 * It is in verbose mode, so we check the output shown to make sure that the proper command,
 * proper success message, and proper rows of data are shown.
 */
test("call search after loaded earnings disparity csv, with parameters, multiple rows found, verbose mode", async ({
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
  // load_file
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/dol_ri_earnings_disparity.csv true");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search State RI");
  // Submit command
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    "Search success!"
  );
  // Check that table shows up
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
});

/**
 * This test calls search after ten-star file has been loaded, and the search string contains
 * a space in the column name. One matching row is found.
 * It is in verbose mode, so we check the output shown to make sure that the proper command,
 * proper success message, and proper rows of data are shown.
 */
test("call search after loaded earnings disparity csv, col string has space, verbose mode", async ({
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
  // load_file
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/dol_ri_earnings_disparity.csv true");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search "Data Type" White');
  // Submit command
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    "Search success!"
  );
  // Check that table shows up
  await expect(page.getByLabel("data2", { exact: true })).toBeVisible();
  // Check that all expected rows are in the table
  await expect(page.getByLabel("data2cell0,1", { exact: true })).toHaveText(
    "White"
  );
});

/**
 * This test calls search after ten-star file has been loaded, and the search string contains
 * a space in the column name and the value name. One matching row is found.
 * It is in verbose mode, so we check the output shown to make sure that the proper command,
 * proper success message, and proper rows of data are shown.
 */
test("call search after loaded earnings disparity csv, col and val string has space, verbose mode", async ({
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
  // load_file
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/dol_ri_earnings_disparity.csv true");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill('search "Data Type" "Native American/American Indian"');
  // Submit command
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    "Search success!"
  );
  // Check that table shows up
  await expect(page.getByLabel("data2", { exact: true })).toBeVisible();
  // Check that all expected rows are in the table
  await expect(page.getByLabel("data2cell0,0", { exact: true })).toHaveText(
    "RI"
  );
  await expect(page.getByLabel("data2cell0,1", { exact: true })).toHaveText(
    "Native American/American Indian"
  );
  await expect(page.getByLabel("data2cell0,2", { exact: true })).toHaveText(
    "$471.07"
  );
  await expect(page.getByLabel("data2cell0,3", { exact: true })).toHaveText(
    "2315.505646"
  );
  await expect(page.getByLabel("data2cell0,4", { exact: true })).toHaveText(
    "$0.45"
  );
  await expect(page.getByLabel("data2cell0,5", { exact: true })).toHaveText(
    "0%"
  );
});

/**
 * This test calls search after one-column file has been loaded, and searches the only
 * existing column. Multiple identical rows are found (which are one cell each).
 * It is in verbose mode, so we check the output shown to make sure that the proper command,
 * proper success message, and proper rows of data are shown.
 */
test("call search after loaded earnings one-col csv, multiple identical rows, verbose mode", async ({
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
  // load_file
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file data/one-column.csv true");
  await page.getByRole("button", { name: "Submitted 1 times" }).click();
  await expect(page.getByLabel("commandMessage1")).toHaveText("Load success!");
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 0 B");
  // Submit command
  await page.getByRole("button", { name: "Submitted 2 times" }).click();
  await expect(page.getByLabel("commandMessage2")).toHaveText(
    "Search success!"
  );
  // Check that table shows up
  await expect(page.getByLabel("data2", { exact: true })).toBeVisible();
  // Write into command box
  await expect(page.getByLabel("Command input")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill('search "Letter" B');
  // Submit command
  await page.getByRole("button", { name: "Submitted 3 times" }).click();
  await expect(page.getByLabel("commandMessage3")).toHaveText(
    "Search success!"
  );
  // Check that table shows up
  await expect(page.getByLabel("data3", { exact: true })).toBeVisible();
  await expect(page.getByLabel("data3cell0,0", { exact: true })).toHaveText(
    "B"
  );
  await expect(page.getByLabel("data3cell1,0", { exact: true })).toHaveText(
    "B"
  );
});
