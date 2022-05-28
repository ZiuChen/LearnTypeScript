/* Example_1 */
function sum(
  e1: number | string | any[] | { length: number },
  e2: number | string | any[] | { length: number }
) {
  // if() {
  // } else if() {
  // }
  // ...
}

/* Example_2 */
function func<Type>(num1: Type): Type {
  return num1
}
// 明确传入类型
func<number>(10)
func<{ name: string }>({ name: "ziu" })
func<any[]>([123, 456])
// 通过类型推导
func(20)
func({ name: "Zhang3" })
func([123, 456])
