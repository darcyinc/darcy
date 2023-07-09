export default function colorToRgba(color: string, opacity: number) {
  const hexRegex = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i;
  const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
  const hslRegex = /^hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)$/;

  const hex = color.match(hexRegex);
  const rgb = color.match(rgbRegex);
  const hsl = color.match(hslRegex);

  if (hex) {
    const [, r, g, b] = hex;
    return `rgba(${Number.parseInt(r, 16)}, ${Number.parseInt(
      g,
      16,
    )}, ${Number.parseInt(b, 16)}, ${opacity})`;
  }

  if (rgb) {
    const [, r, g, b] = rgb;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  if (hsl) {
    const [, h, s, l] = hsl;
    return `hsla(${h}, ${s}%, ${l}%, ${opacity})`;
  }

  return color;
}
