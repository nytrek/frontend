import { expect, test } from "@playwright/test";

test.describe("user page", () => {
  test.beforeEach(async ({ page }) => {
    await page.setExtraHTTPHeaders({
      Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Imluc18yYUpmODJnODNyUnVaVXlRcTF2VlN6OGR0cWIiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjIwMjAwNzMzNDMsImlhdCI6MTcwNDcxMzM0MywiaXNzIjoiaHR0cHM6Ly9mbHlpbmctc25hcHBlci01NS5jbGVyay5hY2NvdW50cy5kZXYiLCJqdGkiOiJhNGNhNTc5ZjcyYTdhNzA4YmExNiIsIm5iZiI6MTcwNDcxMzMzOCwic3ViIjoidXNlcl8yYWZMUldZM21IaGxBakNsTWFWWmZETWYxSVoiLCJ1c2VySWQiOiJ1c2VyXzJhZkxSV1kzbUhobEFqQ2xNYVZaZkRNZjFJWiJ9.h9cdqZWwc83TGyHvzJDxOk9PbkYQt0x3naFr4OESL9j7NOgz9a4i37F24T2uf23qj0qi7y_TUnupJRERDiilLzULUtg4qIs413Q_CnpPzbg1V6-dpSYGztQh5XZYsiBUuWa740nmpzRsHpLmTiL1JrTLeuADcwaguIu636Rk0bvUcl76biUPnYWKaDtGOicx6R5EkHNqoIjMTkjthnVx4Lu7ldFP8O_ArA42oOQB6VyYyc1UYK21IZXLpjO_GEarb7UN_zJoLbSU6eps6xsXMun64bH8TSQ4PMyDM-Nb3UUvxpbKcXgq2ymM1q1fab4GZ9uoJusCrz6cmHbXN8rLRQ`,
    });
    await page.goto("/u");
    await page
      .getByRole("button", {
        name: "Neka",
      })
      .click();
  });
  test("check heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: "Mina annonser",
      }),
    ).toBeVisible();
  });
});
