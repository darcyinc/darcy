import { cn } from '@/lib/utils';

interface PostGalleryProps {
  images: string[];
}

export default function FeedPostGallery({ images }: PostGalleryProps) {
  if (!images.length) return null;

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full my-2 place-items-center rounded-lg overflow-hidden border border-border">
      {images.map((image, index) => (
        <div
          className={cn(
            'h-full',
            images.length === 1 && 'col-span-2 row-span-2 max-w-full max-h-full',
            images.length === 2 && 'col-span-1 row-span-2',
            images.length === 3 && index === 0 && 'row-span-2',
            images.length === 3 && index === 1 && 'col-span-1 row-span-1',
            images.length === 3 && index === 2 && 'col-span-1 row-span-1'
          )}
        >
          <img className="h-full object-cover" key={image} src={image} alt="" />
        </div>
      ))}
    </div>
  );
}
