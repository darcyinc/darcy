import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface FollowersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FollowersModal({ open, onOpenChange }: FollowersModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seguidores</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
