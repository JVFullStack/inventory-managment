"use client";

import { cn } from "@/utils";
import Navbar from "./(components)/Navbar";
import Sidebar from "./(components)/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";
import { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    return () => {
      document.documentElement.classList.remove("dark");
    };
  });

  return (
    <div
      className={cn("flex bg-gray-50 text-gray-900 w-full min-h-screen", {
        dark: isDarkMode,
        light: !isDarkMode,
      })}
    >
      <Sidebar />
      <main
        className={cn(
          "flex flex-col w-full h-full py-7 px-9 bg-gray-50 md:pl-72",
          {
            "md:pl-24": isSidebarCollapsed,
          }
        )}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
}
