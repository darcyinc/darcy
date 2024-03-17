import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Page() {
  return (
    <div className="flex justify-center flex-col min-h-full">
      <h1 className="font-bold text-4xl">Seja bem-vindo(a) à Darcy</h1>
      <p className="text-xl text-accent-foreground">Vamos começar?</p>

      <Button className="w-fit mt-4 font-bold group pr-4 hover:pra-0">
        Definir nome e foto de perfil
        <ArrowRight className="ml-2 group-hover:ml-4" />
      </Button>
    </div>
  );
}
