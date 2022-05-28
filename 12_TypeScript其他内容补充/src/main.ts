import { add, sub } from "./utils/math"
import { time, price } from "./utils/format"

import axios from "axios"
import lodash from "lodash"

console.log(add(10, 20))
console.log(sub(10, 20))
console.log(time.a)
console.log(time.format("123456"))
console.log(price.format(456))

axios.get("http://jsonplaceholder.typicode.com/users").then((res) => console.log(res.data))

console.log(lodash.join(["asd", "qwe"]))

console.log(E)
