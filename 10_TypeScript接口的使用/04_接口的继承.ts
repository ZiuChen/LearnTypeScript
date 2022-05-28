interface ISwim {
  swimming: () => void
}
interface IFly {
  flying: () => void
}
interface IActions extends ISwim, IFly {}

const actions: IActions = {
  swimming() {},
  flying() {}
}
