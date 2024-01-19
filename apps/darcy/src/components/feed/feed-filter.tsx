'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { FeedSortState, useFeedSort } from '@/hooks/useFeedSort';
import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';

type FilterOption = FeedSortState['sortMode'];

export default function FeedFilter() {
  const feedSort = useFeedSort();
  const currentUser = useCurrentUser();
  const t = useTranslations('Feed.FeedFilter');

  const handleFilter = (newFilter: FilterOption) => feedSort.setSortMode(newFilter);

  return (
    <div>
      <Tabs defaultValue="foryou" onValueChange={(value) => handleFilter(value as FilterOption)}>
        <TabsList className="h-12 flex p-0 bg-background">
          <TabsTrigger value="foryou" className="w-2/4 flex flex-col h-full hover:!bg-accent p-0 pt-2">
            <p className={cn('text-base', feedSort.sortMode === 'foryou' && 'font-bold')}>
              {t('foryou')}
              <span className={cn('block h-1 w-full mt-2 rounded-xl', feedSort.sortMode === 'foryou' && 'bg-primary')} />
            </p>
          </TabsTrigger>
          <TabsTrigger value="following" className="w-2/4 flex flex-col h-full hover:!bg-accent p-0 pt-2" disabled={!currentUser.token}>
            <p className={cn('text-base', feedSort.sortMode === 'following' && 'font-bold')}>
              {t('following')}
              <span className={cn('block h-1 w-full mt-2 rounded-xl', feedSort.sortMode === 'following' && 'bg-primary')} />
            </p>
          </TabsTrigger>

          {/* hidden because MobileNavbarProfile on mobile already shows the settings icon */}
          <Button size="icon" variant="ghost" className="mx-2 !p-0 rounded-full hidden sm:inline-flex">
            <div className="p-4">
              <Settings size={18} />
            </div>
          </Button>
        </TabsList>
      </Tabs>
    </div>
  );
}
