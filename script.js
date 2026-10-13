
(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const seen = new Set();
  let removed = 0;
  let idle = 0;

  while (idle < 8) {
    const buttons = [...document.querySelectorAll(
      '[data-testid="removeBookmark"]'
    )];

    let fresh = 0;

    for (const button of buttons) {
      const article = button.closest('article');
      const link = article?.querySelector(
        'a[href*="/status/"]'
      );
      const id = link?.getAttribute('href') || button.outerHTML;

      if (seen.has(id)) continue;
      seen.add(id);
      fresh++;

      button.click();
      removed++;
      console.log(`Removed ${removed} bookmarks`);

      await sleep(350);
    }

    idle = fresh === 0 ? idle + 1 : 0;

    window.scrollTo(0, document.body.scrollHeight);
    await sleep(1800);
  }

  console.log(`Finished and removed ${removed} bookmarks.`);
})();
