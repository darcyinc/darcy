import { PropsWithChildren } from 'react';

import MobileNavbar from '../Navbar/MobileNavbar';

export default function Feed({ children }: PropsWithChildren) {
  return (
    <div className="relative h-full overflow-y-scroll border-grayBorder sm:border-x">
      {children}
      <MobileNavbar />
    </div>
  );
}
