'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Search, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as v from 'valibot';

export default function PostSearchForm() {
  const router = useRouter();
  const t = useTranslations('Trending.Search');

  const formSchema = v.object({
    searchText: v.pipe(v.string(), v.minLength(1, t('SearchErrors.tooSmall')), v.maxLength(100, t('SearchErrors.tooLarge')))
  });

  const form = useForm<v.InferInput<typeof formSchema>>({
    resolver: valibotResolver(formSchema)
  });

  const handleSubmit = (values: v.InferInput<typeof formSchema>) => {
    router.push(`/search?q=${encodeURIComponent(values.searchText.trim())}`, { scroll: false });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="searchText"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex px-4 bg-card focus-within:bg-transparent items-center rounded-full border border-input focus-within:ring-2 focus-within:ring-ring h-12">
                  <Search className="flex-shrink-0 text-xl text-muted-foreground" />
                  <Input
                    placeholder={t('placeholder')}
                    {...field}
                    className="border-none bg-transparent focus-visible:ring-transparent focus-visible:ring-offset-0"
                  />

                  {field.value && (
                    <Button type="reset" size="icon" className="w-fit h-fit rounded-full">
                      <XCircle size={22} />
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
