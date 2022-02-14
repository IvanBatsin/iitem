export default class BaseView {
  constructor(selector: string, initialData?: any) {}
  render (): Promise<void> { return Promise.resolve()}
  destroy () {}
}