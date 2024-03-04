'use client';

import FollowersModal from '@/features/modals/followers';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PageProps {
  params: {
    handle: string;
  };
}

export default function Page({ params }: PageProps) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!open) router.back();
  }, [router, open]);

  return <FollowersModal handle={params.handle} open={open} onOpenChange={setOpen} />;
}
