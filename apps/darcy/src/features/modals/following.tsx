import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';

interface FollowingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FollowingModal({ open, onOpenChange }: FollowingModalProps) {
  const t = useTranslations('Modals.Following');

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
