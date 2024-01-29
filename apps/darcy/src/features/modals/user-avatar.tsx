import { Dialog, DialogContent } from '@/components/ui/dialog';

interface UserAvatarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  avatarUrl: string;
}

export default function UserAvatarModal({ avatarUrl, open, onOpenChange }: UserAvatarModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-none bg-transparent justify-center">
        <img
          alt="User profile avatar"
          className="rounded-full"
          decoding="async"
          height={320}
          loading="lazy"
          src={avatarUrl}
          width={320}
        />
      </DialogContent>
    </Dialog>
  )
}
