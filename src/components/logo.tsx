import { Bird } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="rounded-full bg-gradient-to-r from-persian-green-500 to-persian-green-600 p-3">
        <Bird className="h-12 w-12 text-white" strokeWidth={1.5} />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          GriffinHealth
        </h2>
        <p className="text-sm text-muted-foreground">
          Intelligent Health Monitoring
        </p>
      </div>
    </div>
  );
}
