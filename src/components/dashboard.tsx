"use client";

import * as React from "react";
import {
  BrainCircuit,
  Compass,
  GalleryVertical,
  Lightbulb,
  Milestone,
  ScanSearch,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import SkillNavigator from "@/components/skill-navigator";
import ProjectSpark from "@/components/project-spark";
import CritiqueAI from "@/components/critique-ai";
import ConnectHub from "@/components/connect-hub";
import MyJourney from "@/components/my-journey";
import ShareSpace from "@/components/share-space";
import { DomaAILogo } from "./doma-ai-logo";

type View =
  | "skill-navigator"
  | "project-spark"
  | "critique-ai"
  | "connect-hub"
  | "my-journey"
  | "share-space";

const menuItems = [
  {
    id: "skill-navigator",
    label: "Skill Navigator",
    icon: Compass,
    component: <SkillNavigator />,
  },
  {
    id: "project-spark",
    label: "Project Spark",
    icon: Lightbulb,
    component: <ProjectSpark />,
  },
  {
    id: "critique-ai",
    label: "Critique AI",
    icon: ScanSearch,
    component: <CritiqueAI />,
  },
  { id: "connect-hub", label: "Connect Hub", icon: Users, component: <ConnectHub /> },
  { id: "my-journey", label: "My Journey", icon: Milestone, component: <MyJourney /> },
  {
    id: "share-space",
    label: "Share Space",
    icon: GalleryVertical,
    component: <ShareSpace />,
  },
] as const;

export function Dashboard() {
  const [activeView, setActiveView] = React.useState<View>("skill-navigator");
  const isMobile = useIsMobile();

  const renderContent = () => {
    const activeItem = menuItems.find((item) => item.id === activeView);
    return activeItem ? activeItem.component : null;
  };

  const activeItemDetails = menuItems.find((item) => item.id === activeView);

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <DomaAILogo />
            <h1 className="text-xl font-semibold font-headline">Domestika AI</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => setActiveView(item.id)}
                  isActive={activeView === item.id}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="flex items-center justify-between p-4 border-b md:p-6 bg-card">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="md:hidden" />
            {activeItemDetails && (
              <div className="flex items-center gap-2">
                <activeItemDetails.icon className="text-primary size-6" />
                <h2 className="text-xl font-bold tracking-tight font-headline text-primary-foreground">
                  {activeItemDetails.label}
                </h2>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-background">
          {renderContent()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
