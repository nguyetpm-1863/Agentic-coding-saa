"use client";

import { useCallback } from "react";
import { useDropdown } from "@/hooks/use-dropdown";
import { createClient } from "@/libs/supabase/client";

interface ProfileDropdownProps {
  isAdmin?: boolean;
  currentPath: string;
  triggerContent?: React.ReactNode;
}

type MenuItem = {
  label: string;
  icon: React.ReactNode;
  action: () => void;
  ariaCurrent?: "page";
  isActive?: boolean;
};

const UserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2C7.79086 2 6 3.79086 6 6C6 8.20914 7.79086 10 10 10Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.0002 18C17.0002 14.904 13.8662 12.4 10.0002 12.4C6.13424 12.4 3.00024 14.904 3.00024 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3334 14.1667L17.5001 10L13.3334 5.83334"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 10H7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DashboardIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M8.33333 2.5H2.5V8.33333H8.33333V2.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 2.5H11.6667V8.33333H17.5V2.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 11.6667H11.6667V17.5H17.5V11.6667Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.33333 11.6667H2.5V17.5H8.33333V11.6667Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function ProfileDropdown({
  isAdmin = false,
  currentPath,
  triggerContent,
}: ProfileDropdownProps) {
  const handleSignOut = useCallback(async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = "/login";
    }
  }, []);

  const menuItems: MenuItem[] = [
    {
      label: "Profile",
      icon: <UserIcon />,
      action: () => {
        window.location.href = "/profile";
      },
      isActive: currentPath === "/profile",
      ariaCurrent: currentPath === "/profile" ? "page" : undefined,
    },
    ...(isAdmin
      ? [
          {
            label: "Dashboard",
            icon: <DashboardIcon />,
            action: () => {
              window.location.href = "/admin/dashboard";
            },
            isActive: currentPath.startsWith("/admin"),
            ariaCurrent: currentPath.startsWith("/admin")
              ? ("page" as const)
              : undefined,
          },
        ]
      : []),
    {
      label: "Logout",
      icon: <LogoutIcon />,
      action: handleSignOut,
    },
  ];

  const handleSelect = useCallback(
    (index: number) => {
      menuItems[index]?.action();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [menuItems.length, handleSignOut]
  );

  const {
    isOpen,
    isClosing,
    activeIndex,
    containerRef,
    triggerProps,
    listProps,
    getItemProps,
  } = useDropdown({
    itemCount: menuItems.length,
    onSelect: handleSelect,
    role: "menu",
  });

  const showDropdown = isOpen || isClosing;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        {...triggerProps}
        aria-controls="profile-menu"
        aria-label="User menu"
        className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-white/[0.12] text-white transition-colors duration-150 hover:bg-white/[0.2] focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 aria-expanded:bg-white/[0.2] overflow-hidden"
      >
        {triggerContent ?? <UserIcon />}
      </button>

      {showDropdown && (
        <ul
          id="profile-menu"
          {...listProps}
          aria-label="User menu"
          className={`absolute top-full right-0 mt-1 z-50 bg-[var(--dropdown-bg)] border border-[var(--dropdown-border)] rounded-lg p-1.5 flex flex-col min-w-[180px] ${
            isOpen && !isClosing
              ? "animate-dropdown-open"
              : "animate-dropdown-close"
          }`}
        >
          {menuItems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={item.label}
                {...getItemProps(index)}
                {...(item.ariaCurrent
                  ? { "aria-current": item.ariaCurrent }
                  : {})}
                className={`flex items-center gap-2 px-4 h-14 rounded cursor-pointer text-white font-[family-name:var(--font-montserrat)] text-base font-bold tracking-[0.15px] leading-6 transition-colors duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 ${
                  item.isActive
                    ? "bg-[#FFEA9E]/10 [text-shadow:var(--dropdown-gold-glow)]"
                    : isActive
                      ? "bg-[var(--dropdown-item-hover-bg)]"
                      : "bg-transparent hover:bg-[var(--dropdown-item-hover-bg)]"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
