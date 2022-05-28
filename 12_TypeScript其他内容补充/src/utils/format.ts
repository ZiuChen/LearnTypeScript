// export function format1(time: string) {
//   return "2022-02-22"
// }

// export function format2(price: number) {
//   return "$99.05"
// }

export namespace time {
  export const a = "Ziu"
  export function format(time: string) {
    return "2022-02-22"
  }
}

export namespace price {
  export function format(price: number) {
    return "$99.05"
  }
}

// time.format("1234")
// price.format(6547)
