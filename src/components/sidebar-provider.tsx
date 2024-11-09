// src/components/AppSidebarWithProvider.tsx
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from './app-sidebar';

export function AppSidebarWithProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </SidebarProvider>
  );
}
