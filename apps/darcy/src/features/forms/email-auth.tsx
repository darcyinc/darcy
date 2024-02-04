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
  const tForms = useTranslations('Forms.EmailAuth')
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    email: z.string().email({
      message: tForms('Errors.invalidEmail')
    })
  });

  useEffect(() => {
    if (error) {
      toast.error(tForms('Errors.errorSending'), {
        description: t(`AuthErrors.${error}`)
      });
    }
  }, [error, t, tForms]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const handleSubmit = async (_values: z.infer<typeof formSchema>) => {
    setLoading(true);

    // TODO: send e-mail code
    await new Promise((r) => setTimeout(r, 2000));

    setLoading(false);
    onSubmit?.();

    toast.success(tForms('emailSent'));
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
          {tForms('send')}
        </Button>
      </form>
    </Form>
  );
}
