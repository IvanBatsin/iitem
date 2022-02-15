export default class BaseView {
  constructor(selector: string, props?: any) {}
  render (): Promise<void> { return Promise.resolve()}
  destroy () {}
}