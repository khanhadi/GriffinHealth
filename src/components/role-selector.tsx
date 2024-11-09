// src/components/role-selector.tsx
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-slate-100 p-4 hover:bg-slate-200 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-2 h-6 w-6"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Patient
          </Label>
        </div>
        <div>
          <RadioGroupItem value="doctor" id="doctor" className="peer sr-only" />
          <Label
            htmlFor="doctor"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-slate-100 p-4 hover:bg-slate-200 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-2 h-6 w-6"
            >
              <path d="M8.56 3.69a9 9 0 0 0-2.92 1.95" />
              <path d="M3.69 8.56A9 9 0 0 0 3 12" />
              <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
              <path d="M8.56 20.31A9 9 0 0 0 12 21" />
              <path d="M15.44 20.31a9 9 0 0 0 2.92-1.95" />
              <path d="M20.31 15.44A9 9 0 0 0 21 12" />
              <path d="M20.31 8.56a9 9 0 0 0-1.95-2.92" />
              <path d="M15.44 3.69A9 9 0 0 0 12 3" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            Doctor
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
