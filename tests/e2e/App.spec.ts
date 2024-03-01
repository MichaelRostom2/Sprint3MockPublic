import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
});

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
  // Notice: http, not https! Our front-end is not set up for HTTPs.
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

test("on page load, i see a button", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();

  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
});

test("mode brief command testing", async ({ page }) => {
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

test("mode verbose working command testing", async ({ page }) => {
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

test("mode when its not brief or verbose command testing", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("mode sdfsd");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByTestId("history")).toContainText(
    'Invalide mode type. Must be either "brief" or "verbose"'
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
test("load_file path incorrcet command testing", async ({ page }) => {
  await page.goto("http://localhost:8000");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").fill("load_file sdfsdf");

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
