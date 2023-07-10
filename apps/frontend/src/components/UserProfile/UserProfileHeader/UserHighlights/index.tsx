import Link from 'next/link';
import { HiOutlineIdentification, HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineLink } from 'react-icons/hi';

export default function UserProfileHighlights() {
  return (
    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
      <div className="flex cursor-default items-center gap-1 text-sm text-textSecondary">
        <HiOutlineIdentification className="text-xl" />
        <span>Programador</span>
      </div>
      <div className="flex cursor-default items-center gap-1 text-sm text-textSecondary">
        <HiOutlineLocationMarker className="text-xl" />
        <span>São Paulo, Brasil</span>
      </div>
      <div className="flex cursor-default items-center gap-1 text-sm text-textSecondary">
        <HiOutlineCalendar className="text-xl" />
        <span>Entrou em 1 de julho de 2023</span>
      </div>
      <div className="flex cursor-default items-center gap-1 text-sm text-textSecondary">
        <HiOutlineLink className="text-xl" />
        <Link className="max-w-[165px] overflow-hidden overflow-ellipsis whitespace-nowrap" href="https://google.com">
          extremely-large-website.com
        </Link>
      </div>
    </div>
  );
}
