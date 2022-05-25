type Method = "GET" | "POST"
function request(url: string, method: Method) {}

const options = {
  url: "https://ZiuChen.org/index.html",
  method: "POST"
} as const
// request(options.url, options.method) // 报错
request(options.url, options.method)
