'use client';

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
} from '@drivebase/ui/components/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@drivebase/ui/components/dropdown-menu';
import { ChevronLeftIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback } from '@drivebase/ui/components/avatar';
import { useAppSelector } from '@drivebase/ui/lib/redux/hooks';
import {
  mainItems,
  settingsItems,
} from '@drivebase/frontend/constants/sidebar.items';
import SidebarUpload from './upload';

function useRelativePath() {
  const pathname = usePathname();
  return pathname.replace(/^\/workspace\/[^/]+\/?/, '/');
}

const AppSidebar = () => {
  const params = useParams();
  const pathname = useRelativePath();
  const profile = useAppSelector((s) => s.profile.user);

  const showSettings = pathname.startsWith('/settings');
  const currentItems = showSettings ? settingsItems : mainItems;

  return (
    <Sidebar className="border-transparent w-[15rem]">
      <SidebarHeader className="z-10 space-y-4 pt-4 justify-between">
        <div className="flex justify-between items-start">
          <Image
            draggable={false}
            src="/drivebase.png"
            alt="logo"
            height={40}
            width={40}
            className="rounded-xl"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-8 h-8 select-none">
                <AvatarFallback className="bg-orange-500 text-primary-foreground">
                  {profile?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <SidebarUpload />
      </SidebarHeader>

      <SidebarContent className="z-10">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center">
            {showSettings && (
              <Link
                href={`/workspace/${params.id}`}
                className="mr-2 hover:text-primary"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </Link>
            )}
            {showSettings ? 'Settings' : 'Application'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={showSettings ? 'settings' : 'main'}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <SidebarMenu>
                  {currentItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link href={`/workspace/${params.id}${item.href}`}>
                            <Icon />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </motion.div>
            </AnimatePresence>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="z-10" />

      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="pointer-events-none absolute -left-2/3 bottom-0 aspect-square w-[140%] translate-y-1/4 rounded-full bg-[conic-gradient(from_32deg_at_center,#855AFC_0deg,#3A8BFD_72deg,#00FFF9_144deg,#5CFF80_198deg,#EAB308_261deg,#f00_360deg)] opacity-15 blur-[75px]" />
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
