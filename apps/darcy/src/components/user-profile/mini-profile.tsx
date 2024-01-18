import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';

interface MiniProfileProps {
  username: string;
  handle: string;
  avatar: string;
}

export default function MiniProfile({ username, handle, avatar }: MiniProfileProps) {
  return (
    <>
      <Link href={`/${handle}`}>
        <div className="flex items-center gap-x-2">
          <Avatar>
            <AvatarImage src={avatar} alt={`${username}'s profile picture`} />
            {/* TODO */}
            <AvatarFallback>??</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <p className="font-bold">{username}</p>
            <span className="text-muted-foreground">@{handle}</span>
          </div>
        </div>
      </Link>
    </>
  );
}
