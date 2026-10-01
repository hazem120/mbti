/**
 * Helpers for painting one continuous gradient across many separately
 * animated text units (letters or words): each unit gets the slice of the
 * gradient that spans its share of the text.
 */

/** CSS colour at fraction `f` (0–1) along evenly spaced `stops`. */
export function colorAt(stops: readonly string[], f: number): string {
  if (stops.length === 0) return "currentColor";
  if (stops.length === 1) return stops[0];
  const x = Math.min(1, Math.max(0, f)) * (stops.length - 1);
  const k = Math.min(stops.length - 2, Math.floor(x));
  const local = x - k;
  if (local <= 0) return stops[k];
  if (local >= 1) return stops[k + 1];
  const pct = Math.round((1 - local) * 1000) / 10;
  return `color-mix(in oklab, ${stops[k]} ${pct}%, ${stops[k + 1]})`;
}

/**
 * One `linear-gradient` per unit, weighted by the units' character lengths
 * so wide words get a wider slice. `rtl` flips the gradient direction so
 * the colours still flow from the start of the line to its end.
 */
export function unitGradients(
  lengths: readonly number[],
  stops: readonly string[],
  rtl = false,
): string[] {
  const total = lengths.reduce((sum, n) => sum + Math.max(0, n), 0) || 1;
  const angle = rtl ? "270deg" : "90deg";
  let acc = 0;
  return lengths.map((n) => {
    const from = acc / total;
    acc += Math.max(0, n);
    const to = acc / total;
    return `linear-gradient(${angle}, ${colorAt(stops, from)}, ${colorAt(stops, to)})`;
  });
}
