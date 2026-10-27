const { test, expect } = require("@playwright/test");

const selected = ["stereo-vio", "occupancy-world-model", "imitation-learning", "deep-vio", "gap-navigation", "devresearchflow"];
const projectPath = (baseURL) => `${baseURL.replace(/\/$/, "")}/work/`;

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

test("video previews respect reduced motion and support explicit playback", async ({ page, baseURL }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(projectPath(baseURL));
  const cards = page.locator(".portfolio-featured-card");
  const first = cards.first();
  const video = first.locator("video");
  const button = first.locator("[data-video-toggle]");
  const cue = first.locator("[data-preview-cue]");
  await expect(cue).toBeVisible();
  await expect(cue).toHaveCSS("opacity", "1");
  await expect(video).not.toHaveAttribute("src");
  await first.locator("[data-video-hover]").hover();
  await expect(video).toHaveJSProperty("paused", true);
  await expect(video).not.toHaveAttribute("src");
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "true");
  await expect(video).toHaveJSProperty("paused", false);
  await expect(cue).toHaveCSS("opacity", "0");
  await expect(video).toHaveJSProperty("muted", true);
  await expect(video).toHaveJSProperty("loop", true);
  await button.click();
  await expect(video).toHaveJSProperty("paused", true);
  await expect(video).toBeHidden();
  await expect(cue).toHaveCSS("opacity", "1");
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("aria-pressed", "true");
  const next = cards.nth(1);
  await next.locator("[data-video-toggle]").click();
  await expect(next.locator("video")).toHaveJSProperty("paused", false);
  await expect(video).toHaveJSProperty("paused", true);
  await expect(button).toHaveAttribute("aria-pressed", "false");
});

test("mouse hover plays a preview and leaving restores the still", async ({ page, baseURL, isMobile }) => {
  test.skip(isMobile, "Touch devices use the explicit playback button.");
  await page.goto(projectPath(baseURL));
  const card = page.locator(".portfolio-featured-card").first();
  await card.locator("[data-video-hover]").hover();
  await expect(card.locator("video")).toHaveJSProperty("paused", false);
  await expect(card.locator("video")).toBeVisible();
  await page.mouse.move(0, 0);
  await expect(card.locator("video")).toHaveJSProperty("paused", true);
  await expect(card.locator("video")).toBeHidden();
});

test("navigation and contact links contain only ready sections", async ({ page, baseURL }) => {
  await page.goto(projectPath(baseURL));
  const nav = page.locator("#navbar a.nav-link");
  await expect(nav).toHaveText(["Home", "Projects (current)", "Writing", "Photography", "About"]);
  await expect(page.locator('footer a[href="mailto:shakthibala2004@gmail.com"]')).toHaveCount(1);
  await expect(page.locator('footer a[href="https://www.linkedin.com/in/shakthi-bala/"]')).toHaveCount(1);
});

test("Home navigation opens the current project and writing pages", async ({ page, baseURL }) => {
  await page.route("**/*", (route) => {
    const local = new URL(route.request().url()).origin === new URL(baseURL).origin;
    return local ? route.continue() : route.abort();
  });
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  const toggle = page.locator(".navbar-toggler");
  if (await toggle.isVisible()) await toggle.click();
  await page
    .locator("#navbar a.nav-link")
    .filter({ hasText: /^Projects\s*$/ })
    .click();
  await expect(page).toHaveURL(/\/work\/$/);
  await page.waitForLoadState("load");
  if (await toggle.isVisible()) await toggle.click();
  await page
    .locator("#navbar a.nav-link")
    .filter({ hasText: /^Writing\s*$/ })
    .click();
  await expect(page).toHaveURL(/\/writing\/$/);
  await expect(page.locator("#navbar a.nav-link")).toHaveText(["Home", "Projects", "Writing (current)", "Photography", "About"]);
});

test("brand palette remains readable and fits the viewport", async ({ page, baseURL }) => {
  for (const route of ["/", "/work/", "/writing/", "/photography/", "/about/"]) {
    await page.goto(`${baseURL.replace(/\/$/, "")}${route}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(9, 9, 14)");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
    const ratio = await page.evaluate(() => {
      const luminance = (color) => {
        const values = color
          .match(/\d+/g)
          .slice(0, 3)
          .map(Number)
          .map((value) => {
            const channel = value / 255;
            return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
          });
        return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
      };
      const body = getComputedStyle(document.body);
      const muted = getComputedStyle(document.querySelector(".post-description") || document.body);
      return (luminance(muted.color) + 0.05) / (luminance(body.backgroundColor) + 0.05);
    });
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  }
});

test("theme switch works and remembers the visitor choice", async ({ page, baseURL }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto(projectPath(baseURL));
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(9, 9, 14)");
  const menu = page.locator(".navbar-toggler");
  if (await menu.isVisible()) await menu.click();
  const toggle = page.getByRole("button", { name: "Change color theme" });
  await expect(toggle).toBeVisible();
  // The upstream switch cycles dark -> system -> light -> dark.
  await toggle.click();
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme-setting", "light");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(247, 245, 251)");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  if (await menu.isVisible()) await menu.click();
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(9, 9, 14)");
  const stylesheet = await page.locator('link[href*="/assets/css/main.css"]').getAttribute("href");
  expect(stylesheet).not.toContain("3116ba77db9ee1581d05bb3e86fbf7f1");
});

test("home presents the six real projects with locally hosted type and still previews", async ({ page, baseURL }) => {
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Shakthibala\s*Sivagami\s*Balamurugan\./);
  const projects = page.locator(".home-work-item");
  await expect(projects).toHaveCount(6);
  const paths = await projects
    .locator("h3 a")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href").split("/").filter(Boolean).pop()));
  expect(paths).toEqual(selected);
  const images = await projects.locator("img").evaluateAll((items) => items.map((item) => item.getAttribute("src")));
  expect(images.every((path) => path.includes("/assets/projects/covers/"))).toBe(true);
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('16px "DM Sans"') && document.fonts.check('italic 16px "Instrument Serif"'))).toBe(true);
  await expect(page.locator(".hero-experiment img")).toHaveJSProperty("complete", true);
  expect(await page.locator(".hero-experiment img").evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
});

test("photography preserves framing and supports keyboard viewing", async ({ page, baseURL }) => {
  await page.goto(`${baseURL.replace(/\/$/, "")}/photography/`);
  const prints = page.locator(".photo-print");
  await expect(prints).toHaveCount(5);
  for (const image of await prints.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => element.decode());
    expect(await image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
  }
  const first = prints.first().locator("a");
  await first.click();
  const viewer = page.getByRole("dialog", { name: "Photograph viewer" });
  await expect(viewer).toBeVisible();
  await expect(viewer.locator("[data-photo-position]")).toHaveText("1 / 5");
  await expect(viewer.locator("[data-photo-image]")).toHaveAttribute("alt", /vaulted church ceiling/);
  await page.keyboard.press("ArrowRight");
  await expect(viewer.locator("[data-photo-position]")).toHaveText("2 / 5");
  await expect(viewer.locator("[data-photo-caption]")).toHaveText("Lights after dark");
  await page.keyboard.press("ArrowLeft");
  await expect(viewer.locator("[data-photo-position]")).toHaveText("1 / 5");
  await page.keyboard.press("Escape");
  await expect(viewer).not.toBeVisible();
  await expect(first).toBeFocused();
  const sizes = await prints.locator("img").evaluateAll((images) =>
    images.map((image) => {
      const bounds = image.getBoundingClientRect();
      return {
        displayed: bounds.width / bounds.height,
        original: Number(image.getAttribute("width")) / Number(image.getAttribute("height")),
        alt: image.alt,
      };
    })
  );
  expect(sizes.every((image) => image.alt.length > 20 && Math.abs(image.displayed / image.original - 1) < 0.01)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
});

test("photographs remain accessible without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL.replace(/\/$/, "")}/photography/`);
  const photos = page.locator(".photo-print a");
  await expect(photos).toHaveCount(5);
  const response = await page.request.get(await photos.first().getAttribute("href"));
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("image/jpeg");
  await context.close();
});

test("home states career interests and directly exposes evidence-linked research questions", async ({ page, baseURL }) => {
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await expect(page.locator(".home-role-statement")).toContainText(
    "perception, localization and SLAM, autonomy and planning, AI/ML, and robot learning"
  );
  const questions = page.locator(".home-question");
  await expect(questions).toHaveCount(3);
  for (const link of await questions.locator("a").all()) {
    const response = await page.request.get(await link.getAttribute("href"));
    expect(response.ok()).toBe(true);
  }
  await page.getByRole("link", { name: "Research questions", exact: true }).click();
  await expect(page).toHaveURL(/#home-research$/);
  await expect(page.getByRole("heading", { name: "Questions behind the work", exact: true })).toBeVisible();
  const top = await page.locator("#home-research").evaluate((element) => element.getBoundingClientRect().top);
  const navBottom = await page.locator("#navbar").evaluate((element) => element.getBoundingClientRect().bottom);
  expect(top).toBeGreaterThanOrEqual(navBottom);
});

test("new project recordings use accessible native controls and downloadable evidence", async ({ page, baseURL }) => {
  for (const slug of ["gap-navigation", "devresearchflow"]) {
    await page.goto(`${baseURL.replace(/\/$/, "")}/projects/${slug}/`, { waitUntil: "domcontentloaded" });
    const video = page.locator("video");
    await expect(video).toHaveCount(1);
    await expect(video).toHaveAttribute("controls", "");
    await expect(video).toHaveAttribute("preload", "metadata");
    expect(await video.getAttribute("autoplay")).toBeNull();
    expect(await video.getAttribute("aria-label")).toBeTruthy();
    const response = await page.request.get(await video.locator("source").getAttribute("src"));
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("video/mp4");
  }
  const transcript = page.getByRole("link", { name: "Read the recording transcript" });
  const response = await page.request.get(await transcript.getAttribute("href"));
  expect(await response.text()).toContain("12 records; 0 errors");
});

test("DevResearchFlow workflow animates on hover or explicit playback while the demo stays linked", async ({ page, baseURL, isMobile }) => {
  for (const route of ["/", "/work/"]) {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(`${baseURL.replace(/\/$/, "")}${route}`, { waitUntil: "domcontentloaded" });
    const card = page.locator(route === "/" ? ".home-work-item" : ".portfolio-featured-card").filter({ hasText: "DevResearchFlow" });
    const image = card.locator("img");
    const button = card.locator("[data-preview-toggle]");
    const poster = await image.getAttribute("data-preview-poster");
    const animation = await image.getAttribute("data-preview-source");
    const cue = card.locator("[data-preview-cue]");
    await expect(cue).toHaveCSS("opacity", "1");
    await expect(image).toHaveAttribute("src", poster);
    await expect(card.locator("video")).toHaveCount(0);
    await expect(card.getByRole("link", { name: /^Demo/ })).toHaveAttribute("href", "/projects/devresearchflow/#project-demo");
    if (isMobile) await button.click();
    else await card.locator("[data-preview-hover]").hover();
    await expect(image).toHaveAttribute("src", animation);
    await expect(cue).toHaveCSS("opacity", "0");
    await expect(button).toHaveAttribute("aria-pressed", "true");
    if (isMobile) await button.click();
    else await page.mouse.move(0, 0);
    await expect(image).toHaveAttribute("src", poster);
    await expect(cue).toHaveCSS("opacity", "1");
    await page.emulateMedia({ reducedMotion: "reduce" });
    if (!isMobile) {
      await card.locator("[data-preview-hover]").hover();
      await expect(image).toHaveAttribute("src", poster);
    }
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(image).toHaveAttribute("src", animation);
  }
});
