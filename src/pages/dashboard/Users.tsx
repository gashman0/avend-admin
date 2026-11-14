
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Users,
  UserRound,
  UserCheck,
  UserX,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  CalendarDays,
  Wallet,
  TrendingUp,
  Filter,
} from "lucide-react";

type UserStatus = "Active" | "Inactive" | "Suspended";

type User = {
  id: string;
  name: string;
  email: string;
  joined: string;
  balance: string;
  invested: string;
  status: UserStatus;
};

const sampleUsers: User[] = [
  {
    id: "USR-001",
    name: "Michael Anderson",
    email: "michael@example.com",
    joined: "Nov 14, 2026",
    balance: "$2,450.00",
    invested: "$5,000.00",
    status: "Active",
  },
  {
    id: "USR-002",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    joined: "Nov 13, 2026",
    balance: "$850.00",
    invested: "$3,500.00",
    status: "Active",
  },
  {
    id: "USR-003",
    name: "David Williams",
    email: "david@example.com",
    joined: "Nov 12, 2026",
    balance: "$0.00",
    invested: "$0.00",
    status: "Inactive",
  },
  {
    id: "USR-004",
    name: "Emily Brown",
    email: "emily@example.com",
    joined: "Nov 10, 2026",
    balance: "$1,200.00",
    invested: "$2,000.00",
    status: "Active",
  },
  {
    id: "USR-005",
    name: "James Wilson",
    email: "james@example.com",
    joined: "Nov 08, 2026",
    balance: "$450.00",
    invested: "$1,500.00",
    status: "Suspended",
  },
  {
    id: "USR-006",
    name: "Olivia Martinez",
    email: "olivia@example.com",
    joined: "Nov 06, 2026",
    balance: "$3,100.00",
    invested: "$7,500.00",
    status: "Active",
  },
  {
    id: "USR-007",
    name: "Daniel Thompson",
    email: "daniel@example.com",
    joined: "Nov 04, 2026",
    balance: "$120.00",
    invested: "$0.00",
    status: "Inactive",
  },
  {
    id: "USR-008",
    name: "Sophia Davis",
    email: "sophia@example.com",
    joined: "Nov 02, 2026",
    balance: "$980.00",
    invested: "$2,500.00",
    status: "Active",
  },
];

const statusStyles: Record<UserStatus, string> = {
  Active: "bg-emerald-400/10 text-emerald-400",
  Inactive: "bg-white/10 text-white/50",
  Suspended: "bg-red-400/10 text-red-400",
};

const UsersPage = () => {
  const [users] = useState<User[]>(sampleUsers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const activeCount = users.filter((user) => user.status === "Active").length;
  const inactiveCount = users.filter(
    (user) => user.status === "Inactive"
  ).length;
  const suspendedCount = users.filter(
    (user) => user.status === "Suspended"
  ).length;

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-7 text-white">
      {/* Page heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            User Management
          </h2>

          <p className="mt-2 text-sm text-white/45">
            Manage and monitor registered AvendCrest investors.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-lg border border-white/10 bg-[#1C2028] px-3 py-2 text-xs text-white/50">
          <Users size={15} className="text-[#E1161F]" />
          {users.length} Sample Users
        </div>
      </div>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#1C2028] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/50">Total Users</p>
            <Users size={20} className="text-[#E1161F]" />
          </div>
          <h3 className="mt-3 text-3xl font-bold">{users.length}</h3>
          <p className="mt-2 text-xs text-white/40">
            All registered accounts
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1C2028] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/50">Active Users</p>
            <UserCheck size={20} className="text-emerald-400" />
          </div>
          <h3 className="mt-3 text-3xl font-bold">{activeCount}</h3>
          <p className="mt-2 text-xs text-white/40">
            Active accounts
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1C2028] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/50">Inactive Users</p>
            <UserRound size={20} className="text-amber-400" />
          </div>
          <h3 className="mt-3 text-3xl font-bold">{inactiveCount}</h3>
          <p className="mt-2 text-xs text-white/40">
            Inactive accounts
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1C2028] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/50">Suspended Users</p>
            <UserX size={20} className="text-red-400" />
          </div>
          <h3 className="mt-3 text-3xl font-bold">{suspendedCount}</h3>
          <p className="mt-2 text-xs text-white/40">
            Suspended accounts
          </p>
        </div>
      </section>

      {/* User list */}
      <section className="overflow-hidden rounded-xl border border-white/10 bg-[#1C2028]">
        {/* Search and filters */}
        <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-semibold">All Users</h3>
            <p className="mt-1 text-xs text-white/40">
              Search and manage platform accounts.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex h-11 items-center gap-2 rounded-lg border border-white/10 bg-[#15181E] px-3 sm:w-64">
              <Search size={17} className="shrink-0 text-white/40" />

              <input
                type="text"
                placeholder="Search name, email or ID..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => handleSearch("")}
                  aria-label="Clear search"
                  className="text-white/40 hover:text-white"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="flex h-11 items-center gap-2 rounded-lg border border-white/10 bg-[#15181E] px-3">
              <Filter size={16} className="text-white/40" />

              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none sm:w-36"
              >
                <option value="All" className="bg-[#15181E]">
                  All Statuses
                </option>
                <option value="Active" className="bg-[#15181E]">
                  Active
                </option>
                <option value="Inactive" className="bg-[#15181E]">
                  Inactive
                </option>
                <option value="Suspended" className="bg-[#15181E]">
                  Suspended
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[850px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs text-white/40">
                <th className="px-5 py-4 font-medium">User</th>
                <th className="px-5 py-4 font-medium">User ID</th>
                <th className="px-5 py-4 font-medium">Available Balance</th>
                <th className="px-5 py-4 font-medium">Total Invested</th>
                <th className="px-5 py-4 font-medium">Joined</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/5 transition hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E1161F]/10 text-xs font-bold text-[#E1161F]">
                        {user.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="mt-1 text-xs text-white/40">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-xs text-white/50">
                    {user.id}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium">
                    {user.balance}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium">
                    {user.invested}
                  </td>

                  <td className="px-5 py-4 text-xs text-white/50">
                    {user.joined}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold ${statusStyles[user.status]}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setSelectedUser(user)}
                      aria-label={`View ${user.name}`}
                      className="rounded-lg p-2 text-white/50 transition hover:bg-[#E1161F]/10 hover:text-[#E1161F]"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile user cards */}
        <div className="divide-y divide-white/5 md:hidden">
          {paginatedUsers.map((user) => (
            <div key={user.id} className="space-y-4 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E1161F]/10 text-xs font-bold text-[#E1161F]">
                    {user.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-white/40">
                      {user.email}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[user.status]}`}
                >
                  {user.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-lg bg-[#15181E] p-3">
                <div>
                  <p className="text-[11px] text-white/40">
                    Available Balance
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {user.balance}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-white/40">
                    Total Invested
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {user.invested}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] text-white/40">
                    {user.id}
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Joined {user.joined}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedUser(user)}
                  className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-white/70 transition hover:bg-[#E1161F] hover:text-white"
                >
                  <Eye size={15} />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {paginatedUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <Users size={32} className="text-white/20" />
            <h4 className="mt-4 font-semibold">No users found</h4>
            <p className="mt-2 text-sm text-white/40">
              Try changing your search or status filter.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            Showing{" "}
            {filteredUsers.length === 0
              ? 0
              : (currentPage - 1) * pageSize + 1}
            {" - "}
            {Math.min(currentPage * pageSize, filteredUsers.length)}
            {" of "}
            {filteredUsers.length} users
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              aria-label="Previous page"
              className="rounded-lg border border-white/10 p-2 text-white/60 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={17} />
            </button>

            <span className="px-2 text-xs text-white/60">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              aria-label="Next page"
              className="rounded-lg border border-white/10 p-2 text-white/60 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* User details modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedUser(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-details-title"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#1C2028] p-5 shadow-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  id="user-details-title"
                  className="text-xl font-bold"
                >
                  User Details
                </h3>
                <p className="mt-1 text-xs text-white/40">
                  Account information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                aria-label="Close user details"
                className="rounded-lg p-2 text-white/50 transition hover:bg-white/5 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mt-7 flex flex-col items-center border-b border-white/10 pb-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E1161F]/10 text-lg font-bold text-[#E1161F]">
                {selectedUser.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <h4 className="mt-3 text-lg font-semibold">
                {selectedUser.name}
              </h4>

              <p className="mt-1 text-sm text-white/40">
                {selectedUser.email}
              </p>

              <span
                className={`mt-3 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[selectedUser.status]}`}
              >
                {selectedUser.status}
              </span>
            </div>

            <div className="mt-6 space-y-5">
              <div className="flex items-center gap-3">
                <UserRound size={18} className="text-white/40" />
                <div>
                  <p className="text-xs text-white/40">User ID</p>
                  <p className="mt-1 text-sm font-medium">
                    {selectedUser.id}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-white/40" />
                <div>
                  <p className="text-xs text-white/40">Email Address</p>
                  <p className="mt-1 break-all text-sm font-medium">
                    {selectedUser.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays size={18} className="text-white/40" />
                <div>
                  <p className="text-xs text-white/40">Registration Date</p>
                  <p className="mt-1 text-sm font-medium">
                    {selectedUser.joined}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#15181E] p-4">
                  <Wallet size={18} className="text-[#E1161F]" />
                  <p className="mt-3 text-xs text-white/40">
                    Available Balance
                  </p>
                  <p className="mt-1 text-lg font-bold">
                    {selectedUser.balance}
                  </p>
                </div>

                <div className="rounded-xl bg-[#15181E] p-4">
                  <TrendingUp size={18} className="text-[#E1161F]" />
                  <p className="mt-3 text-xs text-white/40">
                    Total Invested
                  </p>
                  <p className="mt-1 text-lg font-bold">
                    {selectedUser.invested}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5"
              >
                Close
              </button>

              <Link
                to={`/admin/users/${selectedUser.id}`}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#E1161F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c9131b]"
              >
                Full User Profile
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
