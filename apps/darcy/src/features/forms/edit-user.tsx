'use client';

import { apiClient } from '@/api/client';
import LoadingSpinner from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  displayName: z
    .string()
    .min(1, {
      message: 'Username must be at least 1 characters.'
    })
    .max(32, { message: 'Username should not have more than 32 characters.' })
    .optional(),
  handle: z
    .string()
    .regex(/^[a-zA-Z0-9_]*$/, {
      message: 'Your handle must only contain letters, numbers and _.'
    })
    .min(2, {
      message: 'Handle must be at least 2 characters.'
    })
    .max(16, { message: 'Handle should not have more than 16 characters.' })
    .optional(),
  bio: z.string().max(120, { message: 'Biography should not have more than 120 characters.' }).optional()
});

interface EditUserFormProps {
  onSubmit?: () => void;
}

export default function EditUserForm({ onSubmit }: EditUserFormProps) {
  const [loading, setLoading] = useState(false);
  const currentUser = useCurrentUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    apiClient
      .patch('/users/@me', {
        displayName: values.displayName,
        handle: values.handle,
        bio: values.bio
      })
      .then((res) => {
        setLoading(false);
        onSubmit?.();

        if (res.status !== 200) {
          toast('Ocorreu um erro ao editar o perfil', {
            description: res.data.error
          });
          return;
        }

        currentUser.setData(res.data);
        toast('Perfil editado com sucesso!');
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Username</FormLabel>
              <FormControl>
                <Input placeholder={currentUser.displayName} {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="handle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Handle</FormLabel>
              <FormControl>
                <Input placeholder={currentUser.handle} {...field} />
              </FormControl>
              <FormDescription>This is your public handle. Users can find you quickly with your @handle.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Biography</FormLabel>
              <FormControl>
                <Textarea placeholder={currentUser.bio} {...field} />
              </FormControl>
              <FormDescription>Tell more about you.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary" className="font-bold gap-2">
          {loading && <LoadingSpinner />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
