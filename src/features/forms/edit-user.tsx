'use client';

import useEditUser from '@/api/mutations/useEditUser';
import LoadingSpinner from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type v from 'valibot';
import { maxLength, minLength, object, optional, regex, string } from 'valibot';

interface EditUserFormProps {
  onSubmit?: () => void;
}

export default function EditUserForm({ onSubmit }: EditUserFormProps) {
  const currentUser = useCurrentUser();
  const t = useTranslations('Forms.EditUser');
  const mutation = useEditUser();

  const formSchema = object({
    displayName: optional(string([minLength(1, t('displayNameTooSmall')), maxLength(32, t('displayNameTooLarge'))])),
    handle: optional(
      string([minLength(2, t('handleTooSmall')), maxLength(16, t('handleTooLarge')), regex(/^[a-zA-Z0-9_]*$/, t('invalidHandle'))])
    ),
    bio: optional(string([maxLength(120, t('biographyTooLarge'))]))
  });

  const form = useForm<v.Input<typeof formSchema>>({
    resolver: valibotResolver(formSchema)
  });

  const handleSubmit = async (values: v.Input<typeof formSchema>) => {
    mutation.mutate(
      { ...values },
      {
        onSuccess: (data) => {
          onSubmit?.();
          currentUser.setData(data);
          toast(t('submitted'));
        },
        onError: () => {
          toast.error(t('errorSubmitting'));
        }
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">{t('displayName')}</FormLabel>
              <FormControl>
                <Input placeholder={currentUser.displayName} {...field} />
              </FormControl>
              <FormDescription>{t('displayNameDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="handle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">{t('handle')}</FormLabel>
              <FormControl>
                <Input placeholder={currentUser.handle} {...field} />
              </FormControl>
              <FormDescription>{t('handleDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">{t('biography')}</FormLabel>
              <FormControl>
                <Textarea placeholder={currentUser.bio} {...field} />
              </FormControl>
              <FormDescription>{t('biographyDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary" className="font-bold gap-2">
          {mutation.isPending && <LoadingSpinner />}
          {t('submit')}
        </Button>
      </form>
    </Form>
  );
}
