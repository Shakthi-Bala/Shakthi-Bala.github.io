const { test, expect } = require("@playwright/test");

const selected = ["stereo-vio", "occupancy-world-model", "imitation-learning", "deep-vio", "gap-navigation", "devresearchflow"];
const projectPath = (baseURL) => `${baseURL.replace(/\/$/, "")}/projects/`;

test("selected work contains exactly the six chosen projects", async ({ page, baseURL }) => {
  await page.goto(projectPath(baseURL));
  const featured = page.locator(".portfolio-featured-card");
  await expect(featured).toHaveCount(6);
  const links = await featured.locator("h3 a").evaluateAll((items) => items.map((item) => item.getAttribute("href")));
  expect(links.map((link) => link.split("/").filter(Boolean).pop())).toEqual(selected);
  await expect(page.locator("[data-project-card]")).toHaveCount(21);
});

test("topic filters preserve selected work and support keyboard activation", async ({ page, baseURL }) => {
  await page.goto(projectPath(baseURL));
  const visible = page.locator("[data-project-card]:visible");
  const topics = page.getByRole("group", { name: "Filter projects by topic" });
  await topics.getByRole("button", { name: "Manipulation", exact: true }).click();
  await expect(visible).toHaveCount(3);
  await expect(page.getByRole("status")).toHaveText("Showing 3 of 21 projects");
  await expect(page.locator(".portfolio-featured-card:visible")).toHaveCount(6);
  const research = topics.getByRole("button", { name: "Research tools", exact: true });
  await research.focus();
  await page.keyboard.press("Enter");
  await expect(research).toHaveAttribute("aria-pressed", "true");
  await expect(visible).toHaveCount(1);
  await expect(visible.locator("h3")).toHaveText("DevResearchFlow");
  await topics.getByRole("button", { name: "All work", exact: true }).click();
  await expect(visible).toHaveCount(21);
});

test("search combines with the topic and recovers from an empty result", async ({ page, baseURL }) => {
  await page.goto(projectPath(baseURL));
  const search = page.getByRole("searchbox", { name: "Find a project" });
  const visible = page.locator("[data-project-card]:visible");
  await search.fill("c++17");
  await expect(visible).toHaveCount(1);
  await expect(visible.locator("h3")).toHaveText("Stereo Visual-Inertial Odometry");
  await page.getByRole("button", { name: "Manipulation", exact: true }).click();
  await expect(visible).toHaveCount(0);
  await expect(page.getByText("No projects match this search and topic.")).toBeVisible();
  await page.getByRole("button", { name: "Show all projects", exact: true }).click();
  await expect(search).toHaveValue("");
  await expect(search).toBeFocused();
  await expect(visible).toHaveCount(21);
});

test("the complete collection remains available without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(projectPath(baseURL));
  await expect(page.locator(".portfolio-featured-card")).toHaveCount(6);
  await expect(page.locator("[data-project-card]:visible")).toHaveCount(21);
  await expect(page.locator("[data-project-controls]")).toBeHidden();
  await context.close();
});
