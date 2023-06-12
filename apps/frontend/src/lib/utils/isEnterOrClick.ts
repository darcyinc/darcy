export type EnterOrClickEvent<T = any> =
  | React.KeyboardEvent<T>
  | React.MouseEvent<T>;

export default function isEnterOrClick(
  event: React.KeyboardEvent<unknown> | React.MouseEvent<unknown>
) {
  if (event.type === 'click') return true;

  const key = (event as React.KeyboardEvent<unknown>).key.toLowerCase();
  return key === 'enter' || key === ' ';
}
