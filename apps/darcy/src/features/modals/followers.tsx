import useUserFollowers from '@/api/queries/useUserFollowers';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface FollowersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FollowersModal({ open, onOpenChange }: FollowersModalProps) {
  const t = useTranslations('Modals.Followers');
  const { data } = useUserFollowers('Tris');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>

        <div>
          {data?.pages?.map((page) =>
            page.map((user) => (
              <Link key={user.handle} href={`/${user.handle}`} className="hover:bg-secondary">
                <div className="flex items-center gap-2 py-2">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
