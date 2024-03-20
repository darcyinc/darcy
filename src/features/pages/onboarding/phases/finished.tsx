import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OnboardingFinishedPhase() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Check /> Cadastro concluído com sucesso!
          </AlertDialogTitle>
          <AlertDialogDescription>
            A partir de agora, você já pode utilizar sua conta. Redirecionando em 2 segundos...
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
