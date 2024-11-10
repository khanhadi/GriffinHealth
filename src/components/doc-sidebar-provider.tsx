import { SidebarProvider } from '@/components/ui/sidebar';
import DocSidebar from './doc-sidebar';

export function DocSidebarWithProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DocSidebar />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </SidebarProvider>
  );
}
