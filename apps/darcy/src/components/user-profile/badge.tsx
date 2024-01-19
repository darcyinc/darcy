import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { $Enums } from '@prisma/client';
import { BadgeCheck } from 'lucide-react';

interface UserBadgeProps {
  badge: $Enums.VerifiedType;
}

export default function UserBadge({ badge }: UserBadgeProps) {
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
          <p>Verified</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
