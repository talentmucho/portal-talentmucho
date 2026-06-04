"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Award,
  Settings,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Bell,
  LogOut,
  Lock,
} from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/animate-ui/components/animate/tooltip";
import { useTransition } from "react";
import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/animate-ui/components/radix/dropdown-menu";
import { logout } from "@/app/actions/auth";

const nav = [
  { href: "/participant", label: "Dashboard", icon: LayoutDashboard },
  { href: "/participant/courses", label: "My Courses", icon: BookOpen },
  // { href: "/participant/progress", label: "Progress", icon: BarChart2, locked: true },
  { href: "/participant/certificates", label: "Certificates", icon: Award },
  { href: "/participant/settings", label: "Settings", icon: Settings },
];

interface Props {
  fullName: string;
  email: string;
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function ParticipantSidebar({ fullName, email, onClose, collapsed, onToggleCollapse }: Props) {
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside
      className="h-full flex flex-col rounded-r-3xl md:rounded-3xl overflow-hidden"
      style={{
        background: "var(--charcoal-900)",
        boxShadow:
          "0 8px 32px -4px rgb(0 0 0 / 0.30), inset -1px 0 0 rgb(255 255 255 / 0.04)",
      }}
    >
      {/* Brand */}
      <div
        className={[
          "pt-6 pb-5 flex items-center",
          collapsed
            ? "px-2 flex-col gap-3 justify-center"
            : "px-4 justify-between",
        ].join(" ")}
        style={{ borderBottom: "1px solid rgb(255 255 255 / 0.08)" }}
      >
        {collapsed ? (
          <>
            <Image
              src="/tm-logo.png"
              alt="TalentMucho"
              width={32}
              height={32}
              className="object-contain"
            />
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="hidden md:flex w-7 h-7 rounded-xl items-center justify-center transition-colors hover:bg-white/10"
                style={{ color: "rgb(255 255 255 / 0.35)" }}
                aria-label="Expand sidebar"
                title="Expand sidebar"
              >
                <PanelLeftOpen className="size-4" />
              </button>
            )}
          </>
        ) : (
          <>
            <Image
              src="/tm-logo.png"
              alt="TalentMucho"
              width={72}
              height={18}
              className="object-contain"
            />

            <div className="flex items-center gap-1 shrink-0">
              {onClose && (
                <button
                  onClick={onClose}
                  className="md:hidden w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                  style={{ color: "rgb(255 255 255 / 0.4)" }}
                  aria-label="Close menu"
                >
                  <X className="size-4" />
                </button>
              )}
              {onToggleCollapse && (
                <button
                  onClick={onToggleCollapse}
                  className="hidden md:flex w-7 h-7 rounded-xl items-center justify-center transition-colors hover:bg-white/10"
                  style={{ color: "rgb(255 255 255 / 0.35)" }}
                  aria-label="Collapse sidebar"
                  title="Collapse sidebar"
                >
                  <PanelLeftClose className="size-4" />
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto overflow-x-hidden">
        <TooltipProvider>
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;

            const content = (
              <>
                <Icon
                  className="size-4 shrink-0"
                  style={{ color: active ? "var(--clay-500)" : "inherit" }}
                />
                {!collapsed && (
                  <>
                    <span className="flex-1">{label}</span>
                    {active && (
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "var(--clay-500)" }}
                      />
                    )}
                  </>
                )}
              </>
            );

            const className = [
              "flex items-center py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
              collapsed ? "justify-center px-0 w-full" : "gap-3 px-3",
            ].join(" ");

            const style = {
              background: active ? "rgb(255 255 255 / 0.08)" : "transparent",
              color: active ? "rgb(255 255 255 / 0.95)" : "rgb(255 255 255 / 0.45)",
            };

            const linkContent = (
              <Link
                href={href}
                onClick={onClose}
                className={className}
                style={style}
                onMouseEnter={(e) => {
                  if (!active)
                    (e.currentTarget as HTMLElement).style.background =
                      "rgb(255 255 255 / 0.05)";
                  (e.currentTarget as HTMLElement).style.color =
                    active ? "rgb(255 255 255 / 0.95)" : "rgb(255 255 255 / 0.70)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = active
                    ? "rgb(255 255 255 / 0.08)"
                    : "transparent";
                  (e.currentTarget as HTMLElement).style.color = active
                    ? "rgb(255 255 255 / 0.95)"
                    : "rgb(255 255 255 / 0.45)";
                }}
              >
                {content}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={href} side="right">
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent>{label}</TooltipContent>
                </Tooltip>
              );
            }

            return <div key={href}>{linkContent}</div>;
          })}
        </TooltipProvider>
      </nav>

      {/* Bottom Profile / Actions */}
      <div
        className="shrink-0 p-3 flex flex-col gap-2"
        style={{ borderTop: "1px solid rgb(255 255 255 / 0.08)" }}
      >
        <div className={["flex items-center gap-1", collapsed ? "flex-col" : "justify-between px-2"].join(" ")}>
          <ThemeTogglerButton
            modes={["light", "dark"]}
            variant="ghost"
            size="default"
            className="w-9 h-9 rounded-xl hover:bg-white/10 text-white/45 hover:text-white/90 shrink-0"
            aria-label="Toggle theme"
          />
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all duration-150 shrink-0"
            style={{ color: "rgb(255 255 255 / 0.45)" }}
            aria-label="Notifications"
          >
            <Bell className="size-4" />
          </button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={["flex items-center gap-2 rounded-xl hover:bg-white/10 transition-all duration-150 text-left", collapsed ? "p-1.5 justify-center" : "p-2"].join(" ")}
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-white/70">
                  {initials}
                </span>
              </div>
              {!collapsed && (
                <div className="flex flex-col min-w-0 overflow-hidden">
                  <span className="text-sm font-medium text-white/90 truncate">
                    {fullName.split(" ")[0]}
                  </span>
                  <span className="text-xs text-white/40 truncate">
                    {email}
                  </span>
                </div>
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align={collapsed ? "center" : "start"} side={collapsed ? "right" : "top"} className="w-56" sideOffset={12}>
            <DropdownMenuLabel className="flex flex-col gap-0.5 py-2">
              <span className="font-semibold text-sm text-foreground">{fullName}</span>
              <span className="font-normal text-xs text-muted-foreground truncate">{email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => startTransition(() => logout())}
              className="cursor-pointer"
            >
              <LogOut className="mr-2 size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
