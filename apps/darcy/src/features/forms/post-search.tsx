'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  searchText: z
    .string()
    .min(1, { message: 'Search must be at least 1 character.' })
    .max(100, { message: 'Search should not have more than 100 characters.' })
});

export default function PostSearchForm() {
  const router = useRouter();
  const t = useTranslations('Trending');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
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
                    placeholder={t('searchPlaceholder')}
                    {...field}
                    className="border-transparent bg-transparent focus-visible:ring-transparent focus-visible:ring-offset-0"
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
