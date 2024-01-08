import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("button", {
        name: "Neka",
      })
      .click();
  });
  test("search city", async ({ page }) => {
    await page.getByPlaceholder("Sök stad").first().fill("eskilstuna");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/hyra-bostad/eskilstuna");
  });
  test("visit all category", async ({ page }) => {
    await page
      .getByRole("link", {
        name: "Alla",
      })
      .first()
      .click();
    await expect(page).toHaveURL("/sv/hyra-bostad");
  });
  test("visit apartment category", async ({ page }) => {
    await page
      .getByRole("link", {
        name: "Lägenhet",
      })
      .first()
      .click();
    await expect(page).toHaveURL("/sv/hyra-lagenhet");
  });
  test("visit house category", async ({ page }) => {
    await page
      .getByRole("link", {
        name: "Hus",
      })
      .first()
      .click();
    await expect(page).toHaveURL("/sv/hyra-hus");
  });
  test("visit cottage category", async ({ page }) => {
    await page
      .getByRole("link", {
        name: "Stuga",
      })
      .first()
      .click();
    await expect(page).toHaveURL("/sv/hyra-stuga");
  });
  test("visit room category", async ({ page }) => {
    await page
      .getByRole("link", {
        name: "Rum",
      })
      .first()
      .click();
    await expect(page).toHaveURL("/sv/hyra-rum");
  });
  test("check heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: "Upptäck Sveriges hyresbostäder på ett och samma ställe!",
      }),
    ).toBeVisible();
  });
  test("check description", async ({ page }) => {
    await expect(
      page.getByText(
        "Vi samlar bostadsannonser från tusentals olika hyresvärdar så att det ska bli så enkelt som möjligt för dig att hitta din nästa bostad!",
      ),
    ).toBeVisible();
  });
  test("like listing", async ({ page }) => {
    await page.getByTestId("like").first().click();
    await expect(
      page.getByRole("heading", {
        name: "Skapa ditt konto",
      }),
    ).toBeVisible();
  });
  test("visit city page", async ({ page }) => {
    await page
      .getByRole("link", {
        name: "Stockholm",
      })
      .first()
      .click();
    await expect(page).toHaveURL("/sv/hyra-bostad/stockholm");
  });
});
