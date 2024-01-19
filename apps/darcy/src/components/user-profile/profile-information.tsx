import { Briefcase, CalendarDays, Link as LinkIcon, MapPin } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

interface UserProfileInformationProps {
  location?: string | null;
  website?: string | null;
  job?: string | null;
  createdAt: string;
}

export default function UserProfileInformation({ location, job, website, createdAt }: UserProfileInformationProps) {
  const t = useTranslations('UserProfile.Information');
  const locale = useLocale();

  const formattedCreatedAt = new Date(createdAt).toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="flex flex-wrap gap-x-1.5 gap-y-0.5 text-[15px] text-muted-foreground">
      {job && (
        <div className="flex items-center gap-1">
          <Briefcase size={16} />
          <p className="break-all">{job}</p>
        </div>
      )}

      {location && (
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin size={16} />
          <p className="break-all">{location}</p>
        </div>
      )}

      {website && (
        <div className="flex items-center gap-1">
          <LinkIcon size={16} />
          <Link className="hover:underline" href={website}>
            <p className="max-w-[280px] truncate break-all">{website}</p>
          </Link>
        </div>
      )}

      <div className="flex items-center gap-1">
        <CalendarDays size={16} />
        <time dateTime={new Date(createdAt).toISOString()}>{t('joinedAt', { date: formattedCreatedAt })}</time>
      </div>
    </div>
  );
}
