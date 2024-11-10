import {
  Activity,
  CalendarDays,
  Users,
  Bird,
  Bell,
  LogOut,
  ChevronLeft,
  User2,
  Stethoscope,
  Clock,
  LineChart,
  MessageSquare,
  Settings,
  FolderOpen,
  type LucideIcon,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  icon: LucideIcon;
  href: string;
  badge: string | null;
}

interface MenuItemProps {
  item: NavItem;
  isCollapsed: boolean;
}

const NAV_ITEMS: {
  main: NavItem[];
  patient: NavItem[];
  admin: NavItem[];
} = {
  main: [
    {
      title: 'Dashboard',
      icon: Activity,
      href: '/dashboard-doc',
      badge: null,
    },
    {
      title: 'Schedule',
      icon: CalendarDays,
      href: '/schedule',
      badge: '5',
    },
    {
      title: 'Patients',
      icon: Users,
      href: '/patients',
      badge: null,
    },
  ],
  patient: [
    {
      title: 'Active Monitoring',
      icon: LineChart,
      href: '/monitoring',
      badge: '3',
    },
    {
      title: 'Patient Records',
      icon: FolderOpen,
      href: '/records',
      badge: null,
    },
    {
      title: 'Consultations',
      icon: Stethoscope,
      href: '/consultations',
      badge: '2',
    },
  ],
  admin: [
    {
      title: 'Messages',
      icon: MessageSquare,
      href: '/doctor/messages',
      badge: '4',
    },
    {
      title: 'Notifications',
      icon: Bell,
      href: '/doctor/notifications',
      badge: '3',
    },
    {
      title: 'On-Call Status',
      icon: Clock,
      href: '/doctor/on-call',
      badge: null,
    },
    {
      title: 'Settings',
      icon: Settings,
      href: '/doctor/settings',
      badge: null,
    },
  ],
};

const MenuItem: React.FC<MenuItemProps> = ({ item, isCollapsed }) => (
  <SidebarMenuItem key={item.href}>
    <SidebarMenuButton
      asChild
      tooltip={item.title}
      className="hover:bg-persian-green-50 dark:hover:bg-persian-green-950/50"
    >
      <a
        href={item.href}
        className={cn(
          'flex items-center gap-3',
          isCollapsed && 'justify-center px-0'
        )}
      >
        <item.icon className={cn('h-5 w-5', isCollapsed && 'mx-auto')} />
        <span className={cn(isCollapsed ? 'hidden' : 'block')}>
          {item.title}
        </span>
        {item.badge && !isCollapsed && (
          <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-persian-green-100 text-sm font-medium text-persian-green-600 dark:bg-persian-green-900/50 dark:text-persian-green-400">
            {item.badge}
          </span>
        )}
      </a>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

export default function DocSidebar() {
  const { toggleSidebar, state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      {/* Header */}
      <SidebarHeader className="relative px-2 py-4">
        <div
          className={cn(
            'flex items-center justify-between',
            isCollapsed && 'justify-center'
          )}
        >
          <div
            className={cn(
              'flex items-center',
              isCollapsed ? 'w-full justify-center' : 'gap-2 px-2'
            )}
          >
            <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-persian-green-500 to-persian-green-600 p-2">
              <Bird
                className={cn(
                  'text-white',
                  isCollapsed ? 'h-4 w-4' : 'h-5 w-5'
                )}
                strokeWidth={1.5}
              />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-semibold">GriffinHealth</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="absolute -right-3 top-16 h-6 w-6 rounded-full border bg-background"
          >
            <ChevronLeft
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                isCollapsed && 'rotate-180'
              )}
            />
          </Button>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel>{!isCollapsed && 'Main Menu'}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.main.map((item) => (
                <MenuItem
                  key={item.href}
                  item={item}
                  isCollapsed={isCollapsed}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            {!isCollapsed && 'Patient Care'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.patient.map((item) => (
                <MenuItem
                  key={item.href}
                  item={item}
                  isCollapsed={isCollapsed}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            {!isCollapsed && 'Administration'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.admin.map((item) => (
                <MenuItem
                  key={item.href}
                  item={item}
                  isCollapsed={isCollapsed}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t p-4">
        <div className="flex flex-col gap-4">
          {/* Doctor Profile Section */}
          <div
            className={cn(
              'flex items-center',
              isCollapsed ? 'justify-center' : 'gap-3 px-3 py-2'
            )}
          >
            <div className="flex items-center justify-center rounded-full bg-persian-green-100 p-2 dark:bg-persian-green-900/50">
              <User2
                className={cn(
                  'text-persian-green-600 dark:text-persian-green-400',
                  isCollapsed ? 'h-5 w-5' : 'h-6 w-6'
                )}
              />
            </div>
            {!isCollapsed && (
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-medium">Dr. James Wilson</span>
                <span className="text-xs text-muted-foreground">
                  Cardiologist
                </span>
              </div>
            )}
          </div>

          {/* Actions Section */}
          <div
            className={cn(
              'flex gap-2',
              isCollapsed
                ? 'flex-col items-center justify-center'
                : 'items-center justify-between px-2'
            )}
          >
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-9 w-9 text-red-600 hover:text-red-600 dark:text-red-400 dark:hover:text-red-400"
            >
              <a href="/sign-in">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </a>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
