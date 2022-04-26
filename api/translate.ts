import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function (req: VercelRequest, res: VercelResponse) {
  const key = process.env.TRANSLATOR_KEY!;
  const region = process.env.TRANSLATOR_REGION!;

  let {
    body: { context },
  } = req;

  context = await translate("zh-Hans", "en");
  context = await translate("en", "zh-Hans");
  res.setHeader("Content-Type", "text/plain");
  res.send(context);

  async function translate(from: "zh-Hans" | "en", to: "zh-Hans" | "en") {
    const {
      data: [
        {
          translations: [{ text: result }],
        },
      ],
    } = await axios({
      baseURL: "https://api.cognitive.microsofttranslator.com",
      url: "/translate",
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Ocp-Apim-Subscription-Region": region,
        "Context-Type": "application/json; charset=UTF-8",
      },
      params: {
        "api-version": "3.0",
        from: from,
        to: to,
      },
      data: [
        {
          text: context,
        },
      ],
      responseType: "json",
    });
    return result;
  }
}
