import { cn } from "@/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
};

export default function SidebarLink({
  href,
  icon: Icon,
  isCollapsed,
  label,
}: Props) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href == "/dashboard");
  return (
    <Link href={href}>
      <div
        className={cn(
          "cursor-pointer flex items-center justify-start px-8 py-4 hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors",
          {
            "justify-center py-4 px-0 ": isCollapsed,
            "bg-blue-200 text-white": isActive,
          }
        )}
      >
        <Icon className="w-6 h-6 !text-gray-700" />

        <span
          className={cn("block font-medium text-gray-700", {
            hidden: isCollapsed,
          })}
        >
          {label}
        </span>
      </div>
    </Link>
  );
}
