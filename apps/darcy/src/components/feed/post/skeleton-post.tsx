import { Skeleton } from '@/components/ui/skeleton';
import ClickablePost from './clickable-post';

export default function SkeletonPost() {
  return (
    <ClickablePost postId={''}>
      <div className="flex gap-2">
        <span className="h-10 w-10">
          <Skeleton className="h-10 w-10 rounded-full" />
        </span>

        <div className="flex flex-col gap-4 w-full">
          <header className="flex items-center gap-x-1">
            <span>
              <Skeleton className="h-4 w-40 rounded-full" />
            </span>
          </header>

          <article className="flex gap-1 flex-col">
            <Skeleton className="h-4 max-w-72 w-full rounded-full" />
            <Skeleton className="h-4 max-w-72 w-full rounded-full" />
            <Skeleton className="h-4 max-w-72 w-full rounded-full" />
          </article>
        </div>
      </div>
    </ClickablePost>
  );
}
