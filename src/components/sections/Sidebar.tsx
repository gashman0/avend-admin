
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "../ui/Modal";
import { useLogout } from "../../network/auth/queries";

import {
  LayoutDashboard,
  Users,
  ArrowDownToLine,
  ArrowUpFromLine,
  ChartNoAxesCombined,
  Layers,
  UsersRound,
  ArrowLeftRight,
  Settings,
  LogOut,
  AlertTriangle,
  Loader2,
  X,
} from "lucide-react";

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navigation = [
  {
    section: "Overview",
    items: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    items: [
      { name: "All Users", path: "/users", icon: Users },
    ],
  },
  {
    items: [
      { name: "Deposits", path: "/deposits", icon: ArrowDownToLine },
      { name: "Withdrawals", path: "/withdrawals", icon: ArrowUpFromLine },
      { name: "Transactions", path: "/transactions", icon: ArrowLeftRight },
    ],
  },
  {
    items: [
      { name: "Investments", path: "/investments", icon: ChartNoAxesCombined },
      { name: "Investment Plans", path: "/plans", icon: Layers },
    ],
  },
  {
    items: [
      { name: "Referrals", path: "/referrals", icon: UsersRound },
    ],
  },
];

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const logoutMutation = useLogout();

  const isLoggingOut = logoutMutation.isPending;

  const handleLogout = () => {
    if (isLoggingOut) return;

    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setIsLogoutModalOpen(false);
        onClose();
      },
    });
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-40 cursor-default bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-dvh w-68 flex-col border-r border-white/10 bg-[#15181E] px-4 py-5 text-white transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="mb-8 flex shrink-0 items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <img
              src="/Avend Creast 8.svg"
              alt="AvendCrest"
              className="h-10 w-10 object-contain"
            />

            <div>
              <p className="text-xl font-bold tracking-wide">AvendCrest</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E1161F]">
                Administration
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="ml-8 rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto pb-4">
          {navigation.map((group, index) => (
            <div key={index} className="mb-5">
              {group.section && (
                <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                  {group.section}
                </p>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === "/dashboard"}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-[#E1161F] text-white shadow-lg shadow-red-950/20"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        }`
                      }
                    >
                      <Icon size={18} strokeWidth={1.8} />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="shrink-0 space-y-1 border-t border-white/10 pt-4">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Settings size={18} strokeWidth={1.8} />
            Settings
          </NavLink>

          <button
            type="button"
            onClick={() => {
              setIsLogoutModalOpen(true);
              onClose();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-white/60 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={18} strokeWidth={1.8} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Logout confirmation */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => {
          if (!isLoggingOut) {
            setIsLogoutModalOpen(false);
          }
        }}
        title="Confirm logout"
        description="Are you sure you want to sign out of the AvendCrest administration portal?"
        showCloseButton={!isLoggingOut}
        closeOnBackdrop={!isLoggingOut}
        closeOnEscape={!isLoggingOut}
        maxWidth="sm"
      >
        <div className="space-y-6">
          <div className="flex items-start gap-3 rounded-xl border border-red-500/10 bg-red-500/5 p-4">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-red-400"
            />

            <p className="text-sm leading-6 text-white/60">
              You will need to sign in again to access the administration
              portal.
            </p>
          </div>

          {logoutMutation.isError && (
            <p className="text-sm text-red-400">
              Logout failed. Please try again.
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={isLoggingOut}
              onClick={() => setIsLogoutModalOpen(false)}
              className="rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isLoggingOut}
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#E1161F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c9131b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoggingOut ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut size={17} />
                  Yes, log out
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminSidebar;
