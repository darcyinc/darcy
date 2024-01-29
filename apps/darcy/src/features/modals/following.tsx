import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface FollowingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FollowingModal({ open, onOpenChange }: FollowingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seguindo</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
