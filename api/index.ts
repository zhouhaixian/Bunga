import type { VercelRequest, VercelResponse } from "@vercel/node";

const page = `
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>汪汪汪</title>
  </head>
  <body>
    <script>window.location.href = "https://www.bilibili.com/video/BV1ZF411g7EZ?p=1&t=0"</script>
  </body>
</html>
`

export default function(_: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'text/html');
  res.send(page)
}