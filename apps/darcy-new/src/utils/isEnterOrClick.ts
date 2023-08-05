import { KeyboardEvent, MouseEvent } from 'react';

// eslint-disable-next-line import/no-unused-modules
export default function isEnterOrClick(event: KeyboardEvent | MouseEvent) {
  return event.type === 'click' || (event.type === 'keydown' && (event as React.KeyboardEvent<Element>).key === 'Enter');
}
