import { AlertTriangle } from 'lucide-react';

export function DisclaimerBanner() {
  return (
    <div className="flex items-center justify-center gap-2 border-b border-coral-100 bg-coral-50 px-4 py-2 text-center text-xs font-medium text-coral-700 sm:text-sm">
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <span>
        Dados fictícios para demonstração. Nenhuma organização ou animal listado é real.
      </span>
    </div>
  );
}
