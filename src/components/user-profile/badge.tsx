import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { VerificationType } from '@/types/api/user';
import { BadgeCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface UserBadgeProps {
  badge: VerificationType;
}

export default function UserBadge({ badge }: UserBadgeProps) {
  const t = useTranslations('UserProfile.Badges.Verified');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <BadgeCheck
            size={16}
            className={cn(
              'flex-shrink-0',
              badge === 'ORGANIZATION' && 'text-yellow-400',
              badge === 'PERSON' && 'text-primary',
              badge === 'GOVERNMENT' && 'text-gray-400'
            )}
          />
        </TooltipTrigger>
        <TooltipContent className="bg-background">
          <p>{t('title')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
