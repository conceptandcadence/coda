export function preventClickIfSelectingText(e: React.MouseEvent<HTMLElement>) {
  const sel = window.getSelection?.()
  if (!sel) return
  if (sel.isCollapsed) return
  if (!sel.toString().trim()) return

  e.preventDefault()
  e.stopPropagation()
}
