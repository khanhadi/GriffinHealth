import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserCircle2, Stethoscope } from 'lucide-react';

interface RoleSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function RoleSelector({ value, onValueChange }: RoleSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Select Role</Label>
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <RadioGroupItem
            value="patient"
            id="patient"
            className="peer sr-only"
          />
          <Label
            htmlFor="patient"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-slate-100 p-4 hover:bg-slate-200 peer-data-[state=checked]:border-persian-green-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:peer-data-[state=checked]:border-persian-green-400 [&:has([data-state=checked])]:border-persian-green-600 dark:[&:has([data-state=checked])]:border-persian-green-400"
          >
            <UserCircle2
              className="mb-2 h-6 w-6 text-persian-green-600 dark:text-persian-green-400"
              strokeWidth={1.5}
            />
            Patient
          </Label>
        </div>
        <div>
          <RadioGroupItem value="doctor" id="doctor" className="peer sr-only" />
          <Label
            htmlFor="doctor"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-slate-100 p-4 hover:bg-slate-200 peer-data-[state=checked]:border-persian-green-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:peer-data-[state=checked]:border-persian-green-400 [&:has([data-state=checked])]:border-persian-green-600 dark:[&:has([data-state=checked])]:border-persian-green-400"
          >
            <Stethoscope
              className="mb-2 h-6 w-6 text-persian-green-600 dark:text-persian-green-400"
              strokeWidth={1.5}
            />
            Doctor
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
