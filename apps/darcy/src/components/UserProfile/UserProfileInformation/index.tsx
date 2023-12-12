import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { MdOutlineCalendarMonth, MdOutlineLink, MdOutlineLocationOn, MdWorkOutline } from 'react-icons/md';

interface UserProfileInformationProps {
  location?: string;
  website?: string;
  job?: string;
  joinedAt: number;
}

export default function UserProfileInformation({ location, job, website, joinedAt }: UserProfileInformationProps) {
  const t = useTranslations('UserProfile.Information');
  const locale = useLocale();

  const formattedJoinedAt = new Date(joinedAt).toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="flex flex-wrap gap-x-1.5 gap-y-0.5 text-[15px] text-textSecondary">
      {job && (
        <div className="flex items-center gap-1">
          <MdWorkOutline className="h-4 w-4 flex-shrink-0" />
          <p className="break-all">{job}</p>
        </div>
      )}

      {location && (
        <div className="flex items-center gap-1 text-textSecondary">
          <MdOutlineLocationOn className="h-4 w-4 flex-shrink-0" />
          <p className="break-all">{location}</p>
        </div>
      )}

      {website && (
        <div className="flex items-center gap-1">
          <MdOutlineLink className="h-4 w-4 flex-shrink-0" />
          <Link className="hover:underline" href={website}>
            <p className="max-w-[280px] truncate break-all">{website}</p>
          </Link>
        </div>
      )}

      <div className="flex items-center gap-1">
        <MdOutlineCalendarMonth className="h-4 w-4 flex-shrink-0" />
        <time dateTime={new Date(joinedAt).toISOString()}>{t('joinedAt', { date: formattedJoinedAt })}</time>
      </div>
    </div>
  );
}
