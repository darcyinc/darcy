'use client';

import FollowingModal from '@/features/modals/following';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!open) router.back();
  }, [router, open]);

  return (
    <FollowingModal open={open} onOpenChange={setOpen} />
  );
}
