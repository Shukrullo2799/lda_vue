export const isShow = ({ action, itemAction }: { action?: boolean; itemAction?: boolean }) => {
  return !!(action && (itemAction ?? true))
}
