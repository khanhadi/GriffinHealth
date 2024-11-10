import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter } from '@/components/ui/card';
import { RoleSelector } from '@/components/role-selector';

export function SignInForm() {
  const [role, setRole] = useState('patient');

  const onRoleSelect = (newRole: string) => {
    setRole(newRole);
  };

  return (
    <div>
      <CardContent>
        <div className="grid w-full gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="name@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" />
          </div>
          <RoleSelector value={role} onValueChange={onRoleSelect} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <a href={role === 'patient' ? '/metrics' : '/dashboard-doc'}>
          <Button className="w-full">Sign in</Button>
        </a>
        <p className="px-6 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </p>
      </CardFooter>
    </div>
  );
}
