import type { VercelRequest, VercelResponse } from "@vercel/node";
import puppeteer from "puppeteer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  let {
    body: { context },
  } = req;

  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ["--enable-automation"],
  });
  const page = await browser.newPage();

  context = await translate("https://translate.google.cn/?sl=zh-CN&tl=en");
  context = await translate("https://translate.google.cn/?sl=en&tl=fr");
  context = await translate("https://translate.google.cn/?sl=fr&tl=ru");
  context = await translate("https://translate.google.cn/?sl=ru&tl=zh-CN");

  res.end(context);

  async function translate(url: string) {
    await page.goto(url);
    await page.click(`textarea[aria-label="原文"]`, { clickCount: 3 });
    await page.type(`textarea[aria-label="原文"]`, context);
    await page.waitForSelector(`[jsname="W297wb"`, { timeout: 5000 });
    return await page.$eval(`[jsname="W297wb"`, (el) => el.innerHTML);
  }
}
