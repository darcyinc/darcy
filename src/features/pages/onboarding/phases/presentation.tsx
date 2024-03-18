import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { ArrowRight } from 'lucide-react';
import type { OnboardingPhaseProps } from '..';

export default function OnboardingPresentationPhase({ setPhase }: OnboardingPhaseProps) {
  const nextPhase = () => {
    setPhase('profile');
  };

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Seja bem-vindo(a) à Darcy!</AlertDialogTitle>
          <AlertDialogDescription>Que tal começar preparando sua conta?</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction className="group gap-1" onClick={nextPhase}>
            Iniciar
            <div className="!transition-all group-hover:translate-x-1.5">
              <ArrowRight />
            </div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
