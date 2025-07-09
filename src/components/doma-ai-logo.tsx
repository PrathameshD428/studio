import { BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DomaAILogo({ className }: { className?: string }) {
  return (
    <div className={cn("p-2 rounded-lg bg-primary text-primary-foreground", className)}>
      <BrainCircuit className="size-6" />
    </div>
  );
}
