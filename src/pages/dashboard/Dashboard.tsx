
import {
  Users,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  ChartNoAxesCombined,
  Clock3,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  CircleDollarSign,
  Activity,
  ExternalLink,
} from "lucide-react";

import { Link } from "react-router-dom";
import AdminStatCard from "../../components/ui/StatCard";

const stats = [
  {
    title: "Total Users",
    value: "1,248",
    icon: Users,
    trend: {
      value: "+12.5%",
      direction: "up" as const,
      label: "vs last month",
    },
  },
  {
    title: "Total Deposits",
    value: "$84,250.00",
    icon: ArrowDownToLine,
    trend: {
      value: "+8.2%",
      direction: "up" as const,
      label: "vs last month",
    },
  },
  {
    title: "Total Withdrawals",
    value: "$32,680.00",
    icon: ArrowUpFromLine,
    trend: {
      value: "+4.3%",
      direction: "up" as const,
      label: "vs last month",
    },
  },
  {
    title: "Total Invested",
    value: "$51,570.00",
    icon: ChartNoAxesCombined,
    trend: {
      value: "+15.8%",
      direction: "up" as const,
      label: "vs last month",
    },
  },
];

const pendingRequests = [
  {
    title: "Pending Deposits",
    count: 18,
    amount: "$12,450.00",
    icon: ArrowDownToLine,
    path: "/admin/deposits",
    color: "text-amber-400",
    background: "bg-amber-400/10",
  },
  {
    title: "Pending Withdrawals",
    count: 7,
    amount: "$5,280.00",
    icon: ArrowUpFromLine,
    path: "/admin/withdrawals",
    color: "text-red-400",
    background: "bg-red-400/10",
  },
];

const transactions = [
  {
    id: "TXN-001248",
    name: "Michael Anderson",
    type: "Deposit",
    asset: "USDT",
    amount: "$2,500.00",
    status: "Pending",
    date: "Nov 14, 2026",
  },
  {
    id: "TXN-001247",
    name: "Sarah Johnson",
    type: "Withdrawal",
    asset: "BTC",
    amount: "$850.00",
    status: "Completed",
    date: "Nov 14, 2026",
  },
  {
    id: "TXN-001246",
    name: "David Williams",
    type: "Deposit",
    asset: "ETH",
    amount: "$1,200.00",
    status: "Completed",
    date: "Nov 13, 2026",
  },
  {
    id: "TXN-001245",
    name: "Emily Brown",
    type: "Withdrawal",
    asset: "USDT",
    amount: "$450.00",
    status: "Pending",
    date: "Nov 13, 2026",
  },
  {
    id: "TXN-001244",
    name: "James Wilson",
    type: "Deposit",
    asset: "BNB",
    amount: "$3,000.00",
    status: "Completed",
    date: "Nov 12, 2026",
  },
];

const recentUsers = [
  {
    name: "Michael Anderson",
    email: "michael@example.com",
    date: "Nov 14, 2026",
    status: "Active",
    initials: "MA",
  },
  {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    date: "Nov 13, 2026",
    status: "Active",
    initials: "SJ",
  },
  {
    name: "David Williams",
    email: "david@example.com",
    date: "Nov 12, 2026",
    status: "Active",
    initials: "DW",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-7 text-white">

      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Dashboard Overview
          </h2>

          <p className="mt-2 text-sm text-white/45">
            Monitor your platform's performance and financial activities.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-lg border border-white/10 bg-[#1C2028] px-3 py-2 text-xs text-white/60">
          <Activity size={15} className="text-emerald-400" />
          Platform overview
        </div>
      </div>

      {/* Main statistics */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold">
            Platform Statistics
          </h3>

          <span className="text-xs text-white/40">
            Illustrative figures
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <AdminStatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>
      </section>

      {/* Pending requests */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold">
            Requires Your Attention
          </h3>

          <span className="flex items-center gap-1 text-xs text-amber-400">
            <Clock3 size={14} />
            Pending requests
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {pendingRequests.map((request) => {
            const Icon = request.icon;

            return (
              <div
                key={request.title}
                className="rounded-xl border border-white/10 bg-[#1C2028] p-5 transition hover:border-white/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${request.background} ${request.color}`}
                    >
                      <Icon size={21} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white/60">
                        {request.title}
                      </p>

                      <h4 className="mt-1 text-2xl font-bold">
                        {request.count}
                      </h4>
                    </div>
                  </div>

                  <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-400">
                    Action needed
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <div>
                    <p className="text-xs text-white/40">
                      Total pending amount
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                      {request.amount}
                    </p>
                  </div>

                  <Link
                    to={request.path}
                    className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#E1161F]"
                  >
                    Review requests
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Financial overview */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">

        {/* Investment summary */}
        <div className="rounded-xl border border-white/10 bg-[#1C2028] p-5 xl:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold">
                Investment Overview
              </h3>

              <p className="mt-1 text-xs text-white/40">
                Current platform investment activity
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E1161F]/10 text-[#E1161F]">
              <ChartNoAxesCombined size={20} />
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div>
              <p className="text-xs text-white/45">
                Active Investments
              </p>

              <h4 className="mt-2 text-2xl font-bold">
                186
              </h4>

              <p className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
                <TrendingUp size={14} />
                12.4% increase
              </p>
            </div>

            <div>
              <p className="text-xs text-white/45">
                Invested Capital
              </p>

              <h4 className="mt-2 text-2xl font-bold">
                $51,570
              </h4>

              <p className="mt-2 text-xs text-white/40">
                Across active plans
              </p>
            </div>

            <div>
              <p className="text-xs text-white/45">
                ROI Credited
              </p>

              <h4 className="mt-2 text-2xl font-bold">
                $4,820
              </h4>

              <p className="mt-2 text-xs text-white/40">
                Credited to user wallets
              </p>
            </div>
          </div>

          <div className="mt-7 border-t border-white/10 pt-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium text-white/60">
                Investment activity
              </p>

              <span className="text-xs text-white/40">
                Sample distribution
              </span>
            </div>

            <div className="flex h-3 overflow-hidden rounded-full bg-white/5">
              <div className="w-[45%] bg-[#E1161F]" />
              <div className="w-[30%] bg-red-400" />
              <div className="w-[25%] bg-white/30" />
            </div>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <div className="flex items-center gap-2 text-xs text-white/50">
                <span className="h-2 w-2 rounded-full bg-[#E1161F]" />
                Starter
              </div>

              <div className="flex items-center gap-2 text-xs text-white/50">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                Growth
              </div>

              <div className="flex items-center gap-2 text-xs text-white/50">
                <span className="h-2 w-2 rounded-full bg-white/30" />
                Premium
              </div>
            </div>
          </div>
        </div>

        {/* Financial activity card */}
        <div className="rounded-xl border border-white/10 bg-[#1C2028] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
              <CircleDollarSign size={21} />
            </div>

            <div>
              <h3 className="font-semibold">
                Financial Summary
              </h3>

              <p className="mt-1 text-xs text-white/40">
                Sample figures
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-white/50">
                Total Deposits
              </p>

              <p className="font-semibold">
                $84,250
              </p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-white/50">
                Total Withdrawals
              </p>

              <p className="font-semibold">
                $32,680
              </p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-white/50">
                Net Difference
              </p>

              <p className="font-semibold text-emerald-400">
                $51,570
              </p>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-xs leading-5 text-white/40">
                Net difference is deposits minus withdrawals. It is not
                necessarily platform profit or available cash.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent transactions */}
      <section className="overflow-hidden rounded-xl border border-white/10 bg-[#1C2028]">
        <div className="flex flex-col gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold">
              Recent Transactions
            </h3>

            <p className="mt-1 text-xs text-white/40">
              Latest financial activities on the platform
            </p>
          </div>

          <Link
            to="/admin/transactions"
            className="flex items-center gap-2 text-xs font-semibold text-[#E1161F] transition hover:text-red-400"
          >
            View all
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs text-white/40">
                <th className="px-5 py-4 font-medium">Transaction</th>
                <th className="px-5 py-4 font-medium">User</th>
                <th className="px-5 py-4 font-medium">Type</th>
                <th className="px-5 py-4 font-medium">Amount</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-white/5 last:border-0 transition hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4 text-xs font-medium text-white/80">
                    {transaction.id}
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium">
                      {transaction.name}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-xs text-white/60">
                      {transaction.type}
                    </span>
                    <p className="mt-1 text-[11px] text-white/35">
                      {transaction.asset}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold">
                    {transaction.amount}
                  </td>

                  <td className="px-5 py-4 text-xs text-white/45">
                    {transaction.date}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${
                        transaction.status === "Completed"
                          ? "bg-emerald-400/10 text-emerald-400"
                          : "bg-amber-400/10 text-amber-400"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent users */}
      <section className="rounded-xl border border-white/10 bg-[#1C2028]">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <h3 className="font-semibold">
              Recently Registered Users
            </h3>

            <p className="mt-1 text-xs text-white/40">
              Latest members who joined AvendCrest
            </p>
          </div>

          <Link
            to="/admin/users"
            aria-label="View all users"
            className="rounded-lg p-2 text-white/50 transition hover:bg-white/5 hover:text-white"
          >
            <ExternalLink size={17} />
          </Link>
        </div>

        <div className="divide-y divide-white/5">
          {recentUsers.map((user) => (
            <div
              key={user.email}
              className="flex items-center justify-between gap-3 p-4 sm:px-5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E1161F]/10 text-xs font-bold text-[#E1161F]">
                  {user.initials}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {user.name}
                  </p>

                  <p className="truncate text-xs text-white/40">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="hidden shrink-0 text-right sm:block">
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-400">
                  {user.status}
                </span>

                <p className="mt-2 text-[11px] text-white/35">
                  {user.date}
                </p>
              </div>

              <span className="shrink-0 text-xs text-emerald-400 sm:hidden">
                {user.status}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
