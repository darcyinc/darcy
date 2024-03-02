import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';
import EditUserForm from '../forms/edit-user';

interface FollowersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditUserModal({ open, onOpenChange }: FollowersModalProps) {
  const t = useTranslations('Modals.EditUser');

  const handleSubmit = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>

        <EditUserForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
