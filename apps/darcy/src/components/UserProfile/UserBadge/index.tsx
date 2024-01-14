'use client';

import { useId } from 'react';
import { MdVerified } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import { useTheme } from '@/hooks/theme';

interface UserBadgeProps {
  badge: 'verified';
}

export default function UserBadge({ badge }: UserBadgeProps) {
  const { theme } = useTheme();
  const id = useId();

  return (
    <>
      <Tooltip id={id} className='z-20' />
      {badge === 'verified' && (
        <MdVerified
          className="flex-shrink-0 text-blue"
          data-tooltip-content="Verificado"
          data-tooltip-id={id}
          data-tooltip-place="top"
          data-tooltip-variant={theme === 'light' ? 'light' : 'dark'}
        />
      )}
    </>
  );
}
