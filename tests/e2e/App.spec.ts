import { expect, test } from "@playwright/test";

/* File for end to end testing */

test("has title", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page).toHaveTitle(/Mock/);
});
test("on page load, i see a login button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  page.setDefaultTimeout(5000);
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after log out, i dont see the input box", async ({ page }) => {
  page.setDefaultTimeout(5000);
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await page.getByLabel("Sign Out").click();
  await expect(page.getByLabel("Login")).toBeVisible();
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load and login, i see a submit button", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
});

test("entering mode brief command", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("mode brief");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByTestId("history")).toContainText("Mode set!");
});

test("mode verbose changing command testing", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("mode verbose");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByTestId("history")).toContainText("Mode set!");
});

test("mode verbose output testing", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("mode verbose");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("load_file ./data/1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByTestId("history")).toContainText(
    "Command: load_file ./data/1.csv"
  );
  await expect(page.getByTestId("history")).toContainText(
    "Output: Loaded file successfully"
  );
});

test("changing mode to something other than brief/vebose", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("mode sdfsd");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByTestId("history")).toContainText(
    'Invalid mode type. Must be either "brief" or "verbose"'
  );
});

test("load_file command testing", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_file ./data/1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByTestId("history")).toContainText(
    "Loaded file successfully"
  );
});
test("load_file incorrect path command testing", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("load_file sdfsdf");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByTestId("history")).toContainText(
    "cannot load file, make sure to enter correct file path"
  );
});
test("load_file no path command testing", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("load_file");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByTestId("history")).toContainText(
    "cannot load file, make sure to enter correct file path"
  );
});

test("view without load command testing", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("view");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByTestId("history")).toContainText(
    "Please load a file first"
  );
});

test("view command testing on file 1", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_file ./data/1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByTestId("history")).toContainText("Meghan Layson");
  await expect(page.getByTestId("history")).toContainText(
    "Alfreds Futterkiste"
  );
  await expect(page.getByTestId("history")).toContainText("Johnson Bukkardd");
  await expect(page.getByTestId("history")).toContainText("Dan Stunk");
});

test("view command testing on file 2", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_file ./data/2.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByTestId("history")).toContainText("Frosted Flakes");
  await expect(page.getByTestId("history")).toContainText("Cheerios");
  await expect(page.getByTestId("history")).toContainText("Cap'n Crunch");
  await expect(page.getByTestId("history")).toContainText(
    "Cinnamon Toast Crunch"
  );
});

test("view command testing with verbose output", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("mode verbose");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("load_file ./data/2.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByTestId("history")).toContainText("Frosted Flakes");
  await expect(page.getByTestId("history")).toContainText("Cheerios");
  await expect(page.getByTestId("history")).toContainText("Cap'n Crunch");
  await expect(page.getByTestId("history")).toContainText(
    "Cinnamon Toast Crunch"
  );
  await expect(page.getByTestId("history")).toContainText("Command: view");
});

test("search without load command testing", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("search 0 JohnsonBukkardd");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByTestId("history")).toContainText(
    "Please load a file first"
  );
});

test("search command by index testing", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_file ./data/1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("search 0 MeghanLayson");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByTestId("history")).toContainText(
    "Retrived value from Y file"
  );
});
test("search command by column name testing", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_file ./data/1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("search names MeghanLayson");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByTestId("history")).toContainText(
    "Retrived value from Y file"
  );
});
test("search command without arguments", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_file ./data/1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("search");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByTestId("history")).toContainText(
    "Search requires 2 arguments: search 0 value or search header value"
  );
});

test("search command with verbose output", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("mode verbose");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("load_file ./data/1.csv");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("search 0 MeghanLayson");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByTestId("history")).toContainText(
    "Retrived value from Y file"
  );
  await expect(page.getByTestId("history")).toContainText(
    "Command: search 0 MeghanLayson"
  );
});
