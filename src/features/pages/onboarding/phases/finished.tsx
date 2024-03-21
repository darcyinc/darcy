import useEditUser from '@/api/mutations/useEditUser';
import LoadingSpinner from '@/components/loading-spinner';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { OnboardingPhaseProps } from '..';

export default function OnboardingFinishedPhase({ data }: OnboardingPhaseProps) {
  const router = useRouter();
  const mutation = useEditUser();

  useEffect(() => {
    mutation.mutate({ ...data, completedOnboarding: true });
  }, [mutation, data]);

  useEffect(() => {
    if (mutation.isSuccess) {
      setTimeout(() => {
        router.replace('/');
      }, 2000);
    }
  }, [mutation.isSuccess, router]);

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {mutation.isSuccess ? (
              <div>
                <Check /> Cadastro concluído com sucesso!
              </div>
            ) : (
              <div>
                <LoadingSpinner /> Finalizando cadastro
              </div>
            )}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {mutation.isSuccess
              ? 'A partir de agora, você já pode utilizar sua conta. Redirecionando...'
              : 'Aguarde enquanto finalizamos seu cadastro. Este processo é rápido e não deve demorar muito.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
