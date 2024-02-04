import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';

interface FollowersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FollowersModal({ open, onOpenChange }: FollowersModalProps) {
  const t = useTranslations('Modals.Followers');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
