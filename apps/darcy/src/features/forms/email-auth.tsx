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

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid e-mail address.'
  })
});

interface EmailAuthFormProps {
  onSubmit?: () => void;
  error?: string;
}

export default function EmailAuthForm({ onSubmit, error }: EmailAuthFormProps) {
  const t = useTranslations('Auth.AuthErrors');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error('Não foi possível enviar o e-mail.', {
        description: t(error)
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

    toast.success('E-mail de autenticação enviado com sucesso.');
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
                <Input placeholder={'me@example.com'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="font-bold gap-2 text-lg w-full rounded-full">
          {loading && <LoadingSpinner />}
          Enviar link de autenticação
        </Button>
      </form>
    </Form>
  );
}
