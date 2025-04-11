import { ReactNode } from "react";

export type DashBoardItemsData = {
    title: string;
    icon: React.ReactNode;
    path: string;
    section?: string;
    component: ReactNode;
};
export type SidebarItems = {
    title: string;
    icon: React.ReactNode;
    path: string;
    section?: string;
};