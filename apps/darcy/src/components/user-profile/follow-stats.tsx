'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface UserFollowStatsProps {
  following: number;
  followers: number;
}

export default function UserFollowStats({ following, followers }: UserFollowStatsProps) {
  const t = useTranslations('UserProfile.FollowStats');
  const pathname = usePathname();

  return (
    <div className="flex gap-2 text-sm">
      <Link className="decoration-textPrimary hover:underline" href={`${pathname}/following`}>
        <span className="font-bold text-textPrimary">{following}</span>
        <span className="text-muted-foreground"> {t('following')}</span>
      </Link>

      <Link className="decoration-textPrimary hover:underline" href={`${pathname}/followers`}>
        <span className="font-bold text-textPrimary">{followers}</span>
        <span className="text-muted-foreground"> {t('followers')}</span>
      </Link>
    </div>
  );
}
