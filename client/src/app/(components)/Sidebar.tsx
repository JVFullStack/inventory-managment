"use client";

import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux";
import { setIsSidebarCollapsed } from "@/state";
import { cn } from "@/utils";
import SidebarLink from "@/components/SidebarLink";
import Image from "next/image";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const tooggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = cn(
    "fixed flex flex-col bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40 w-72 md:w-64",
    {
      "w-0 md:w-16": isSidebarCollapsed,
      // "w-72 md:w-64": !isSidebarCollapsed,
    }
  );

  return (
    <aside className={sidebarClassNames}>
      {/* TOP */}
      <div
        className={cn(
          "flex gap-3 justify-between md:justify-normal items-center pt-8 px-8",
          { "px-5": isSidebarCollapsed }
        )}
      >
        <Image
          src="/assets/logo.png"
          alt="Profile photo"
          width={27}
          height={27}
          className="rounded w-8"
        />
        <h1
          className={cn("font-extralight text-2xl block", {
            hidden: isSidebarCollapsed,
          })}
        >
          EVERSTOCK
        </h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={tooggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <nav className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSidebarCollapsed}
        />
      </nav>

      <div
        className={cn("block mb-10", {
          hidden: isSidebarCollapsed,
        })}
      >
        <p className="text-center text-xs text-gray-500">&copy; 2024</p>
      </div>
    </aside>
  );
}
