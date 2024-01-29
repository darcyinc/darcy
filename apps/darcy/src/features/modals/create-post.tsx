import { FeedPostComposer } from '@/components/feed';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreatePostModal({ open, onOpenChange }: CreatePostModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar publicação</DialogTitle>
        </DialogHeader>

        <FeedPostComposer hideBorder />
      </DialogContent>
    </Dialog>
  );
}
