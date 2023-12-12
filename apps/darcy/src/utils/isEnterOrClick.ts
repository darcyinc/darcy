import { KeyboardEvent, MouseEvent } from 'react';

export default function isEnterOrClick(event: KeyboardEvent | MouseEvent) {
  return event.type === 'click' || (event.type === 'keydown' && (event as React.KeyboardEvent<Element>).key === 'Enter');
}
