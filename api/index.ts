import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const template = `
  <!DOCTYPE html>
  <html>
    <body>
      <script>
        window.location.href = "https://www.bilibili.com/video/BV1ZF411g7EZ?p=1&t=0"
      </script>
    </body>
  </html>
  `;
  res.end(template);
}
