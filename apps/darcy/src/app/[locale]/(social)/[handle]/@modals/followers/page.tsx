'use client';

import FollowersModal from '@/features/modals/followers';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!open) router.back();
  }, [router, open]);

  return (
    <FollowersModal open={open} onOpenChange={setOpen} />
  );
}
