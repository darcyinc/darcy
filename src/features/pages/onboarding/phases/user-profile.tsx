import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type v from 'valibot';
import { maxLength, minLength, object, optional, string } from 'valibot';
import type { OnboardingPhaseProps } from '..';

const AllowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

export default function OnboardingUserProfilePhase({ data, setData, setPhase }: OnboardingPhaseProps) {
  const formSchema = object({
    avatarBase64: optional(string()),
    displayName: optional(string([minLength(1, 'Nome muito curto.'), maxLength(32, 'Nome muito largo.')])),
    bio: optional(string([maxLength(120, 'Biografia muito longa.')]))
  });

  const form = useForm<v.Input<typeof formSchema>>({
    resolver: valibotResolver(formSchema)
  });

  // const _nextPhase = () => {
  //   setPhase('profile-v2');
  // };

  const handleSubmit = async (_values: v.Input<typeof formSchema>) => {
    return;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      if (!AllowedImageTypes.includes(file.type)) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        setData({
          ...data,
          avatarBase64: reader.result as string
        });
      });
    }
  };

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Perfil</AlertDialogTitle>
          <AlertDialogDescription>
            Defina seu nome e opcionalmente defina uma foto de perfil ou conte um pouco sobre você.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Nome</FormLabel>
                  <FormControl>
                    <Input placeholder={'John Doe'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Biografia</FormLabel>
                  <FormControl>
                    <Textarea placeholder={''} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatarBase64"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    Avatar
                    <div>
                      <div className="border w-full min-h-16 rounded-lg flex items-center justify-center p-4 cursor-pointer">
                        {data.avatarBase64 ? (
                          <img src={data.avatarBase64} alt="Avatar" className="rounded-full w-36 h-36 object-cover" />
                        ) : (
                          <p>Clique para selecionar uma imagem</p>
                        )}
                      </div>
                    </div>
                  </FormLabel>
                  <FormControl onChange={handleImageChange}>
                    <Input type="file" className="hidden" accept={AllowedImageTypes.join(',')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setPhase('presentation')}>Voltar</AlertDialogCancel>
              <AlertDialogAction type="submit" className="group">
                <ArrowRight />
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
