const message = ""
let content = ""

content = message ?? "Default message."
content = message ? message : "Default message."
console.log(content)
