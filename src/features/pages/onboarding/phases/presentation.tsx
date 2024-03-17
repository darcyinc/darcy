import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { OnboardingPhaseProps } from '..';

export default function OnboardingPresentationPhase({ setPhase }: OnboardingPhaseProps) {
  const nextPhase = () => {
    setPhase('profile');
  };

  return (
    <div className="flex justify-center flex-col gap-1 min-h-full">
      <h1 className="font-bold text-4xl">Seja bem-vindo(a) à Darcy</h1>
      <p className="text-accent-foreground text-xl">Vamos começar?</p>

      <Button className="w-fit gap-4 mt-4 font-bold" onClick={nextPhase}>
        Definir nome e foto de perfil
        <ArrowRight />
      </Button>
    </div>
  );
}
