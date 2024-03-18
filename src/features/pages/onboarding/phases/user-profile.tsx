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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight } from 'lucide-react';
import type { OnboardingPhaseProps } from '..';

const AllowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

export default function OnboardingUserProfilePhase({ data, setData, setPhase }: OnboardingPhaseProps) {
  const nextPhase = () => {
    setPhase('profile');
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

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" type="text" placeholder="John Doe" required />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="bio">Biografia</Label>
            <Textarea id="bio" placeholder="" />
          </div>

          <div>
            <Label htmlFor="avatar" className="flex flex-col gap-2">
              <h1>Foto de perfil</h1>
              <div className="border w-full min-h-16 rounded-lg flex items-center justify-center p-4 cursor-pointer">
                {data.avatarBase64 ? (
                  <img src={data.avatarBase64} alt="Avatar" className="rounded-full w-36 h-36 object-cover" />
                ) : (
                  <p>Clique para selecionar uma imagem</p>
                )}
              </div>
            </Label>
            <Input type="file" id="avatar" className="hidden" onChange={handleImageChange} accept={AllowedImageTypes.join(',')} />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setPhase('presentation')}>Voltar</AlertDialogCancel>
          <AlertDialogAction className="group" onClick={nextPhase}>
            <ArrowRight />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
