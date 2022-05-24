function useState<T>(state: T) {
  let currentState = state
  const changeState = (newState: T) => {
    currentState = newState
  }
  const tuple: [T, (newState: T) => void] = [currentState, changeState]
  return tuple
}

const [counter, setCounter] = useState(10)
setCounter(100)

const [title, setTitle] = useState("Hello.")
setTitle("Hello, TypeScript.")

const [flag, setFlag] = useState(true)
setFlag(false)

/* 补充: 函数类型 */

type MyFunc = () => void
const foo: MyFunc = () => {}

export {}
