'use client';

import LoadingSpinner from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface EmailAuthFormProps {
  onSubmit?: () => void;
  error?: string;
}

export default function EmailAuthForm({ onSubmit, error }: EmailAuthFormProps) {
  const t = useTranslations('Auth');
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    email: z.string().email({
      message: t('AuthProviders.Email.invalidEmail')
    })
  });

  useEffect(() => {
    if (error) {
      toast.error('AuthErrors.Toasts.errorSending', {
        description: t(`AuthErrors.${error}`)
      });
    }
  }, [error, t]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const handleSubmit = async (_values: z.infer<typeof formSchema>) => {
    setLoading(true);

    // TODO: send e-mail code
    await new Promise((r) => setTimeout(r, 2000));

    setLoading(false);
    onSubmit?.();

    toast.success(t('AuthProviders.Email.Toasts.sent'));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">E-mail</FormLabel>
              <FormControl>
                <Input placeholder="me@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="font-bold gap-2 text-lg w-full rounded-full">
          {loading && <LoadingSpinner />}
          {t('AuthProviders.Email.send')}
        </Button>
      </form>
    </Form>
  );
}
