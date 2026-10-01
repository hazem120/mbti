/** The bits of a mouse/keyboard click event that decide navigation intent. */
export interface ClickLike {
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  defaultPrevented: boolean;
}

/**
 * True for a plain primary click (or Enter on a link, which dispatches a
 * button-0 click). Modified clicks (cmd/ctrl = new tab, shift = new window,
 * alt = download) and non-primary buttons must keep the browser default.
 */
export function isPlainPrimaryClick(e: ClickLike): boolean {
  return (
    !e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey
  );
}
