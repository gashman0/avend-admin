
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  X,
  Copy,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  TrendingUp,
  Wallet,
  Clock,
  CheckCircle2,
  AlertTriangle,
  CalendarDays,
  ChartNoAxesCombined,
  CircleDollarSign,
} from "lucide-react";

type CryptoAsset = "BTC" | "ETH" | "USDT" | "BNB" | "SOL";

type InvestmentStatus =
  | "Active"
  | "Matured"
  | "Completed"
  | "Cancelled";

type Investment = {
  id: string;
  user: string;
  email: string;
  plan: string;
  asset: CryptoAsset;
  principal: number;
  usdValue: number;
  roiRate: number;
  roiEarned: number;
  projectedROI: number;
  startDate: string;
  maturityDate: string;
  durationDays: number;
  status: InvestmentStatus;
};

const initialInvestments: Investment[] = [
  {
    id: "INV-1001",
    user: "Daniel Cooper",
    email: "daniel@example.com",
    plan: "Growth Plan",
    asset: "BTC",
    principal: 0.05,
    usdValue: 4500,
    roiRate: 2,
    roiEarned: 180,
    projectedROI: 900,
    startDate: "Nov 01, 2026",
    maturityDate: "Dec 01, 2026",
    durationDays: 30,
    status: "Active",
  },
  {
    id: "INV-1002",
    user: "Sarah Johnson",
    email: "sarah@example.com",
    plan: "Starter Plan",
    asset: "USDT",
    principal: 500,
    usdValue: 500,
    roiRate: 1,
    roiEarned: 75,
    projectedROI: 150,
    startDate: "Nov 05, 2026",
    maturityDate: "Dec 05, 2026",
    durationDays: 30,
    status: "Active",
  },
  {
    id: "INV-1003",
    user: "Michael Brown",
    email: "michael@example.com",
    plan: "Premium Plan",
    asset: "ETH",
    principal: 1.5,
    usdValue: 4800,
    roiRate: 3,
    roiEarned: 432,
    projectedROI: 1440,
    startDate: "Oct 15, 2026",
    maturityDate: "Nov 14, 2026",
    durationDays: 30,
    status: "Matured",
  },
  {
    id: "INV-1004",
    user: "Emily Wilson",
    email: "emily@example.com",
    plan: "Growth Plan",
    asset: "BNB",
    principal: 4,
    usdValue: 2440,
    roiRate: 2,
    roiEarned: 195.2,
    projectedROI: 488,
    startDate: "Nov 03, 2026",
    maturityDate: "Dec 03, 2026",
    durationDays: 30,
    status: "Active",
  },
  {
    id: "INV-1005",
    user: "David Miller",
    email: "david@example.com",
    plan: "Premium Plan",
    asset: "SOL",
    principal: 20,
    usdValue: 3600,
    roiRate: 3,
    roiEarned: 324,
    projectedROI: 1080,
    startDate: "Oct 20, 2026",
    maturityDate: "Nov 19, 2026",
    durationDays: 30,
    status: "Active",
  },
  {
    id: "INV-1006",
    user: "Olivia Davis",
    email: "olivia@example.com",
    plan: "Starter Plan",
    asset: "USDT",
    principal: 300,
    usdValue: 300,
    roiRate: 1,
    roiEarned: 90,
    projectedROI: 90,
    startDate: "Aug 01, 2026",
    maturityDate: "Aug 31, 2026",
    durationDays: 30,
    status: "Completed",
  },
  {
    id: "INV-1007",
    user: "James Wilson",
    email: "james@example.com",
    plan: "Growth Plan",
    asset: "BTC",
    principal: 0.02,
    usdValue: 1800,
    roiRate: 2,
    roiEarned: 0,
    projectedROI: 360,
    startDate: "Nov 10, 2026",
    maturityDate: "Dec 10, 2026",
    durationDays: 30,
    status: "Cancelled",
  },
  {
    id: "INV-1008",
    user: "Sophia Martinez",
    email: "sophia@example.com",
    plan: "Premium Plan",
    asset: "USDT",
    principal: 2000,
    usdValue: 2000,
    roiRate: 3,
    roiEarned: 600,
    projectedROI: 600,
    startDate: "Oct 15, 2026",
    maturityDate: "Nov 14, 2026",
    durationDays: 30,
    status: "Matured",
  },
];

const assetStyles: Record<CryptoAsset, string> = {
  BTC: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  ETH: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  USDT: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  BNB: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  SOL: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const statusStyles: Record<InvestmentStatus, string> = {
  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Matured: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Completed: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

const formatAmount = (amount: number, asset: CryptoAsset) =>
  `${amount.toLocaleString("en-US", {
    maximumFractionDigits: 8,
  })} ${asset}`;

const formatUSD = (amount: number) =>
  amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

export default function Investments() {
  const [investments] = useState(initialInvestments);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("All");
  const [assetFilter, setAssetFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInvestment, setSelectedInvestment] =
    useState<Investment | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const stats = useMemo(() => {
    const active = investments.filter(
      (item) => item.status === "Active"
    );

    const matured = investments.filter(
      (item) =>
        item.status === "Matured" ||
        item.status === "Completed"
    );

    const totalInvested = active.reduce(
      (sum, item) => sum + item.usdValue,
      0
    );

    const totalROIEarned = investments
      .filter(
        (item) =>
          item.status !== "Cancelled"
      )
      .reduce((sum, item) => sum + item.roiEarned, 0);

    return {
      total: investments.length,
      active: active.length,
      matured: matured.length,
      totalInvested,
      totalROIEarned,
    };
  }, [investments]);

  const filteredInvestments = useMemo(() => {
    return investments.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(query) ||
        item.user.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.plan.toLowerCase().includes(query);

      const matchesPlan =
        planFilter === "All" || item.plan === planFilter;

      const matchesAsset =
        assetFilter === "All" || item.asset === assetFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return (
        matchesSearch &&
        matchesPlan &&
        matchesAsset &&
        matchesStatus
      );
    });
  }, [investments, search, planFilter, assetFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInvestments.length / itemsPerPage)
  );

  const paginatedInvestments = filteredInvestments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearch("");
    setPlanFilter("All");
    setAssetFilter("All");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  const copyText = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      window.prompt("Copy this value:", value);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePlanChange = (value: string) => {
    setPlanFilter(value);
    setCurrentPage(1);
  };

  const handleAssetChange = (value: string) => {
    setAssetFilter(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-[#E1161F]">
              <ChartNoAxesCombined size={21} />
            </div>
            <h1 className="text-xl font-semibold text-white sm:text-2xl">
              Investments
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Monitor investor plans, invested capital, and generated returns.
          </p>
        </div>

        <button
          onClick={resetFilters}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/5"
        >
          <RefreshCw size={15} />
          Reset filters
        </button>
      </div>

      {/* Demo notice */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <AlertTriangle
          size={19}
          className="mt-0.5 shrink-0 text-amber-400"
        />
        <div>
          <p className="text-sm font-medium text-amber-300">
            Illustrative investment records
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-400">
            The plans, rates, dates, and figures on this page are sample
            data, not confirmed investment terms or live account records.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Investments"
          value={stats.total}
          description="All investment records"
          icon={<Wallet size={19} />}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10"
        />
        <StatCard
          title="Active Investments"
          value={stats.active}
          description="Currently running investments"
          icon={<TrendingUp size={19} />}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
        />
        <StatCard
          title="Active Invested Capital"
          value={formatUSD(stats.totalInvested)}
          description="Principal in active investments"
          icon={<CircleDollarSign size={19} />}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
        />
        <StatCard
          title="ROI Earned"
          value={formatUSD(stats.totalROIEarned)}
          description="Recorded ROI credits"
          icon={<ChartNoAxesCombined size={19} />}
          iconColor="text-purple-400"
          iconBg="bg-purple-500/10"
        />
      </div>

      {/* Additional overview */}
      <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-gray-400">
              Matured / completed investments
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              {stats.matured}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Records that have reached maturity or completion
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <CheckCircle2 size={19} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-300">
          <Filter size={16} />
          Filter investments
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search investor, ID, plan..."
              className="w-full rounded-lg border border-white/10 bg-[#15181E] py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-red-500/50"
            />
          </div>

          <select
            value={planFilter}
            onChange={(event) => handlePlanChange(event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#15181E] px-3 py-2.5 text-sm text-gray-300 outline-none focus:border-red-500/50"
          >
            <option value="All">All investment plans</option>
            <option value="Starter Plan">Starter Plan</option>
            <option value="Growth Plan">Growth Plan</option>
            <option value="Premium Plan">Premium Plan</option>
          </select>

          <select
            value={assetFilter}
            onChange={(event) => handleAssetChange(event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#15181E] px-3 py-2.5 text-sm text-gray-300 outline-none focus:border-red-500/50"
          >
            <option value="All">All cryptocurrencies</option>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="USDT">Tether (USDT)</option>
            <option value="BNB">BNB</option>
            <option value="SOL">Solana (SOL)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => handleStatusChange(event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#15181E] px-3 py-2.5 text-sm text-gray-300 outline-none focus:border-red-500/50"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Matured">Matured</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-white/10 bg-[#1B1F27] lg:block">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-semibold text-white">
            Investment records
          </h2>
          <span className="text-xs text-gray-500">
            {filteredInvestments.length} records found
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="bg-[#15181E] text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Investor</th>
                <th className="px-5 py-4 font-medium">Plan</th>
                <th className="px-5 py-4 font-medium">Principal</th>
                <th className="px-5 py-4 font-medium">ROI Rate</th>
                <th className="px-5 py-4 font-medium">ROI Earned</th>
                <th className="px-5 py-4 font-medium">Maturity</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {paginatedInvestments.map((investment) => (
                <tr
                  key={investment.id}
                  className="transition hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-white">
                      {investment.user}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {investment.email}
                    </p>
                    <p className="mt-1 text-[11px] text-gray-600">
                      {investment.id}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-white">
                      {investment.plan}
                    </p>
                    <span
                      className={`mt-1 inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${assetStyles[investment.asset]}`}
                    >
                      {investment.asset}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-white">
                      {formatAmount(
                        investment.principal,
                        investment.asset
                      )}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {formatUSD(investment.usdValue)}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-300">
                    {investment.roiRate}% / day
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-emerald-400">
                      {formatUSD(investment.roiEarned)}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-400">
                    {investment.maturityDate}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={investment.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedInvestment(investment)}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-gray-300 transition hover:border-red-500/40 hover:text-white"
                    >
                      <Eye size={14} />
                      Details
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedInvestments.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No investments match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-white">Investment records</h2>
          <span className="text-xs text-gray-500">
            {filteredInvestments.length} records
          </span>
        </div>

        {paginatedInvestments.length > 0 ? (
          paginatedInvestments.map((investment) => (
            <div
              key={investment.id}
              className="rounded-xl border border-white/10 bg-[#1B1F27] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {investment.user}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {investment.id}
                  </p>
                </div>
                <StatusBadge status={investment.status} />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">
                    {investment.plan}
                  </p>
                  <span
                    className={`mt-2 inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${assetStyles[investment.asset]}`}
                  >
                    {investment.asset}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500">Principal</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {formatAmount(
                      investment.principal,
                      investment.asset
                    )}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {formatUSD(investment.usdValue)}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/5 pt-3">
                <div>
                  <p className="text-xs text-gray-500">ROI earned</p>
                  <p className="mt-1 text-sm font-medium text-emerald-400">
                    {formatUSD(investment.roiEarned)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Maturity date</p>
                  <p className="mt-1 text-sm text-gray-300">
                    {investment.maturityDate}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedInvestment(investment)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-gray-300 transition hover:border-red-500/40 hover:text-white"
              >
                <Eye size={15} />
                View investment details
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-white/10 bg-[#1B1F27] px-4 py-12 text-center text-sm text-gray-500">
            No investments match your filters.
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredInvestments.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              filteredInvestments.length
            )}{" "}
            to{" "}
            {Math.min(
              currentPage * itemsPerPage,
              filteredInvestments.length
            )}{" "}
            of {filteredInvestments.length} investments
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={17} />
            </button>

            <span className="px-2 text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      )}

      {/* Investment details modal */}
      {selectedInvestment && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-sm sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedInvestment(null);
            }
          }}
        >
          <div className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#1B1F27] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Investment details
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedInvestment.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedInvestment(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="max-h-[75vh] space-y-5 overflow-y-auto p-5 sm:p-6">
              <div className="rounded-xl border border-white/10 bg-[#15181E] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Investment plan</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {selectedInvestment.plan}
                    </p>
                  </div>
                  <StatusBadge status={selectedInvestment.status} />
                </div>

                <p className="mt-4 text-xs text-gray-500">
                  Invested principal
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {formatAmount(
                    selectedInvestment.principal,
                    selectedInvestment.asset
                  )}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  {formatUSD(selectedInvestment.usdValue)} estimated value
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DetailItem
                  label="Investor"
                  value={selectedInvestment.user}
                />
                <DetailItem
                  label="Email"
                  value={selectedInvestment.email}
                />
                <DetailItem
                  label="Cryptocurrency"
                  value={selectedInvestment.asset}
                />
                <DetailItem
                  label="Daily ROI rate"
                  value={`${selectedInvestment.roiRate}%`}
                />
                <DetailItem
                  label="Duration"
                  value={`${selectedInvestment.durationDays} days`}
                />
                <DetailItem
                  label="Start date"
                  value={selectedInvestment.startDate}
                />
                <DetailItem
                  label="Maturity date"
                  value={selectedInvestment.maturityDate}
                />
                <DetailItem
                  label="Investment ID"
                  value={selectedInvestment.id}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <p className="text-xs text-gray-400">ROI credited / earned</p>
                  <p className="mt-2 text-lg font-semibold text-emerald-400">
                    {formatUSD(selectedInvestment.roiEarned)}
                  </p>
                </div>

                <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                  <p className="text-xs text-gray-400">
                    Illustrative projected ROI
                  </p>
                  <p className="mt-2 text-lg font-semibold text-blue-400">
                    {formatUSD(selectedInvestment.projectedROI)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                <AlertTriangle
                  size={16}
                  className="mt-0.5 shrink-0 text-amber-400"
                />
                <p className="text-xs leading-5 text-gray-400">
                  ROI figures are illustrative. In the agreed investment
                  model, daily ROI is credited to the investor's available
                  wallet balance, while principal remains invested until
                  maturity. Do not add already-credited ROI to the principal
                  again when calculating portfolio totals.
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 p-5 sm:px-6">
              <button
                onClick={() => setSelectedInvestment(null)}
                className="w-full rounded-lg border border-white/10 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5"
              >
                Close details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
  iconColor,
  iconBg,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="mt-3 break-words text-xl font-semibold text-white sm:text-2xl">
            {value}
          </h3>
          <p className="mt-2 text-xs text-gray-500">{description}</p>
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: InvestmentStatus }) {
  const Icon =
    status === "Active"
      ? TrendingUp
      : status === "Cancelled"
        ? X
        : CheckCircle2;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 break-words text-sm text-gray-200">{value}</p>
    </div>
  );
}
