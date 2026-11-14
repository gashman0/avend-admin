
import {
  Bell,
  ChevronDown,
  Menu,
  ShieldCheck,
} from "lucide-react";

type AdminHeaderProps = {
  onMenuClick: () => void;
  adminName?: string;
};

const AdminHeader = ({
  onMenuClick,
  adminName = "Administrator",
}: AdminHeaderProps) => {
  const firstName = adminName.trim().split(" ")[0] || "Administrator";

  return (
    <header className="sticky top-0 z-30 flex min-h-20 w-full items-center justify-between border-b border-white/10 bg-[#15181E]/95 px-4 py-3 text-white backdrop-blur-md sm:px-6 lg:px-8">
      {/* Left section */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="shrink-0 rounded-lg p-2 text-white/70 transition hover:bg-white/5 hover:text-white md:hidden"
        >
          <Menu size={23} strokeWidth={1.8} />
        </button>

        {/* Welcome message */}
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold sm:text-xl">
            Welcome back, {firstName}
          </h1>

          <p className="mt-1 hidden text-sm text-white/45 sm:block">
            Here's what's happening across AvendCrest today.
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-5">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-white/70 transition hover:bg-white/5 hover:text-white"
        >
          <Bell size={21} strokeWidth={1.8} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#E1161F] ring-2 ring-[#15181E]" />
        </button>

        {/* Admin profile */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-1 transition hover:bg-white/5 sm:gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E1161F] text-sm font-semibold text-white sm:h-10 sm:w-10">
            {firstName.charAt(0).toUpperCase()}
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-white">
              {adminName}
            </p>

            <div className="mt-0.5 flex items-center gap-1">
              <ShieldCheck size={12} className="text-[#E1161F]" />
              <p className="text-xs text-white/45">
                Administrator
              </p>
            </div>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-white/45 sm:block"
          />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
