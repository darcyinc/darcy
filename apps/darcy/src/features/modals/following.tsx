import useUserFollowing from '@/api/queries/useUserFollowing';
import { FeedPostLoader } from '@/components/feed';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface FollowingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handle: string;
}

export default function FollowingModal({ open, onOpenChange, handle }: FollowingModalProps) {
  const t = useTranslations('Modals.Following');
  const { data, fetchNextPage } = useUserFollowing(handle);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>

        <div className="max-h-80 overflow-y-scroll">
          {data?.pages?.map((page) =>
            page.map((user) => (
              <Link key={user.handle} href={`/${user.handle}`}>
                <div className="flex items-center gap-2 py-2 rounded-lg px-2 hover:bg-accent">
                  <img
                    alt="User profile avatar"
                    className="rounded-full"
                    decoding="async"
                    height={42}
                    loading="lazy"
                    src={user.avatarUrl}
                    width={42}
                  />
                  <div>
                    <p className="flex gap-1">
                      <span className="font-bold">{user.displayName}</span>
                      <span className="text-muted-foreground">{user.handle}</span>
                    </p>
                    {user.bio}
                  </div>
                </div>
              </Link>
            ))
          )}

          <FeedPostLoader onVisible={fetchNextPage} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
