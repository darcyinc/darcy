'use client';

import { useId } from 'react';
import { MdVerified } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import { useTheme } from '@/hooks/useTheme';
import { $Enums } from '@prisma/client';
import clsx from 'clsx';

interface UserBadgeProps {
  badge: $Enums.VerifiedType;
}

export default function UserBadge({ badge }: UserBadgeProps) {
  const { theme } = useTheme();
  const id = useId();

  return (
    <>
      <Tooltip id={id} className="z-20" />
      {badge && (
        <MdVerified
          className={clsx(
            'flex-shrink-0',
            badge === 'ORGANIZATION' && 'text-yellow-400',
            badge === 'PERSON' && 'text-blue',
            badge === 'GOVERNMENT' && 'text-gray-400'
          )}
          data-tooltip-content="Verificado"
          data-tooltip-id={id}
          data-tooltip-place="top"
          data-tooltip-variant={theme}
        />
      )}
    </>
  );
}
