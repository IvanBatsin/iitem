export default interface BaseView {
  render: () => Promise<void> | void,
  destroy: () => void
}