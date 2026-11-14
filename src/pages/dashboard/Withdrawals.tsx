
import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  Search,
  Filter,
  Eye,
  X,
  CheckCircle2,
  XCircle,
  Clock,
  Wallet,
  Copy,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

type CryptoAsset = "BTC" | "ETH" | "USDT" | "BNB" | "SOL";
type WithdrawalStatus = "Pending" | "Approved" | "Rejected";

type Withdrawal = {
  id: string;
  user: string;
  email: string;
  asset: CryptoAsset;
  amount: number;
  usdValue: number;
  network: string;
  walletAddress: string;
  date: string;
  status: WithdrawalStatus;
  adminNote?: string;
};

const initialWithdrawals: Withdrawal[] = [
  {
    id: "WTH-1001",
    user: "Daniel Cooper",
    email: "daniel@example.com",
    asset: "BTC",
    amount: 0.025,
    usdValue: 2250,
    network: "Bitcoin",
    walletAddress: "bc1qexamplewalletaddress123456789",
    date: "Nov 14, 2026",
    status: "Pending",
  },
  {
    id: "WTH-1002",
    user: "Sarah Johnson",
    email: "sarah@example.com",
    asset: "USDT",
    amount: 850,
    usdValue: 850,
    network: "TRC20",
    walletAddress: "TExampleWalletAddress123456789",
    date: "Nov 13, 2026",
    status: "Pending",
  },
  {
    id: "WTH-1003",
    user: "Michael Brown",
    email: "michael@example.com",
    asset: "ETH",
    amount: 0.75,
    usdValue: 2400,
    network: "Ethereum",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
    date: "Nov 12, 2026",
    status: "Approved",
  },
  {
    id: "WTH-1004",
    user: "Emily Wilson",
    email: "emily@example.com",
    asset: "BNB",
    amount: 3.2,
    usdValue: 1950,
    network: "BNB Smart Chain",
    walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    date: "Nov 11, 2026",
    status: "Rejected",
    adminNote: "Withdrawal request requires additional review.",
  },
  {
    id: "WTH-1005",
    user: "David Miller",
    email: "david@example.com",
    asset: "SOL",
    amount: 12.5,
    usdValue: 2250,
    network: "Solana",
    walletAddress: "ExampleSolanaWalletAddress123456789",
    date: "Nov 10, 2026",
    status: "Pending",
  },
  {
    id: "WTH-1006",
    user: "Olivia Davis",
    email: "olivia@example.com",
    asset: "USDT",
    amount: 1200,
    usdValue: 1200,
    network: "ERC20",
    walletAddress: "0x9876543210abcdef9876543210abcdef98765432",
    date: "Nov 09, 2026",
    status: "Approved",
  },
];

const assetStyles: Record<CryptoAsset, string> = {
  BTC: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  ETH: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  USDT: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  BNB: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  SOL: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const statusStyles: Record<WithdrawalStatus, string> = {
  Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
};

const formatAmount = (amount: number, asset: CryptoAsset) => {
  return `${amount.toLocaleString("en-US", {
    maximumFractionDigits: 8,
  })} ${asset}`;
};

const formatUSD = (amount: number) =>
  amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

export default function Withdrawals() {
  const [withdrawals, setWithdrawals] = useState(initialWithdrawals);
  const [search, setSearch] = useState("");
  const [assetFilter, setAssetFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<Withdrawal | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [adminNote, setAdminNote] = useState("");

  const itemsPerPage = 5;

  const stats = useMemo(() => {
    const total = withdrawals.length;
    const pending = withdrawals.filter(
      (item) => item.status === "Pending"
    );
    const approved = withdrawals.filter(
      (item) => item.status === "Approved"
    );
    const rejected = withdrawals.filter(
      (item) => item.status === "Rejected"
    );

    return {
      total,
      pending: pending.length,
      approved: approved.length,
      rejected: rejected.length,
      pendingValue: pending.reduce((sum, item) => sum + item.usdValue, 0),
    };
  }, [withdrawals]);

  const filteredWithdrawals = useMemo(() => {
    return withdrawals.filter((item) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        item.user.toLowerCase().includes(searchValue) ||
        item.email.toLowerCase().includes(searchValue) ||
        item.id.toLowerCase().includes(searchValue) ||
        item.walletAddress.toLowerCase().includes(searchValue);

      const matchesAsset =
        assetFilter === "All" || item.asset === assetFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesAsset && matchesStatus;
    });
  }, [withdrawals, search, assetFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredWithdrawals.length / itemsPerPage)
  );

  const paginatedWithdrawals = filteredWithdrawals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleReview = (
    withdrawal: Withdrawal,
    decision: "Approved" | "Rejected"
  ) => {
    if (processingId) return;

    setProcessingId(withdrawal.id);

    // DEMO ONLY:
    // Replace this local update with your real admin review API.
    // Approval must not be treated as proof that a crypto transfer
    // has been executed.
    setTimeout(() => {
      setWithdrawals((previous) =>
        previous.map((item) =>
          item.id === withdrawal.id
            ? {
                ...item,
                status: decision,
                adminNote: adminNote.trim() || undefined,
              }
            : item
        )
      );

      setSelectedWithdrawal(null);
      setAdminNote("");
      setProcessingId(null);
    }, 500);
  };

  const copyText = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      window.prompt("Copy this value:", value);
    }
  };

  const openReview = (withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setAdminNote(withdrawal.adminNote || "");
  };

  const resetFilters = () => {
    setSearch("");
    setAssetFilter("All");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
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
      {/* Page heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-[#E1161F]">
              <ArrowDownToLine size={21} />
            </div>
            <h1 className="text-xl font-semibold text-white sm:text-2xl">
              Withdrawals
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Review and manage investor withdrawal requests.
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
            Illustrative withdrawal data
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-400">
            The records and figures below are sample data. Review actions
            currently update this page only and do not execute blockchain
            transfers or update investor balances.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Requests"
          value={stats.total}
          description="All withdrawal requests"
          icon={<Wallet size={19} />}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          description={`${formatUSD(stats.pendingValue)} awaiting review`}
          icon={<Clock size={19} />}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
        />
        <StatCard
          title="Approved"
          value={stats.approved}
          description="Approved requests"
          icon={<CheckCircle2 size={19} />}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          description="Rejected requests"
          icon={<XCircle size={19} />}
          iconColor="text-red-400"
          iconBg="bg-red-500/10"
        />
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-300">
          <Filter size={16} />
          Filter withdrawal requests
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search user, ID, wallet..."
              className="w-full rounded-lg border border-white/10 bg-[#15181E] py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-red-500/50"
            />
          </div>

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
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-white/10 bg-[#1B1F27] lg:block">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-semibold text-white">Withdrawal requests</h2>
          <span className="text-xs text-gray-500">
            {filteredWithdrawals.length} records found
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-[#15181E] text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Investor</th>
                <th className="px-5 py-4 font-medium">Asset</th>
                <th className="px-5 py-4 font-medium">Amount</th>
                <th className="px-5 py-4 font-medium">Network</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {paginatedWithdrawals.map((withdrawal) => (
                <tr
                  key={withdrawal.id}
                  className="transition hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-white">
                      {withdrawal.user}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {withdrawal.email}
                    </p>
                    <p className="mt-1 text-[11px] text-gray-600">
                      {withdrawal.id}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${assetStyles[withdrawal.asset]}`}
                    >
                      {withdrawal.asset}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-white">
                      {formatAmount(withdrawal.amount, withdrawal.asset)}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {formatUSD(withdrawal.usdValue)}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-400">
                    {withdrawal.network}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-400">
                    {withdrawal.date}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={withdrawal.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => openReview(withdrawal)}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-gray-300 transition hover:border-red-500/40 hover:text-white"
                    >
                      <Eye size={14} />
                      Review
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedWithdrawals.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No withdrawal requests match your filters.
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
          <h2 className="font-semibold text-white">Withdrawal requests</h2>
          <span className="text-xs text-gray-500">
            {filteredWithdrawals.length} records
          </span>
        </div>

        {paginatedWithdrawals.length > 0 ? (
          paginatedWithdrawals.map((withdrawal) => (
            <div
              key={withdrawal.id}
              className="rounded-xl border border-white/10 bg-[#1B1F27] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {withdrawal.user}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {withdrawal.id}
                  </p>
                </div>
                <StatusBadge status={withdrawal.status} />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span
                    className={`rounded-md border px-2 py-1 text-xs font-semibold ${assetStyles[withdrawal.asset]}`}
                  >
                    {withdrawal.asset}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {formatAmount(withdrawal.amount, withdrawal.asset)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {formatUSD(withdrawal.usdValue)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    {withdrawal.network}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    {withdrawal.date}
                  </p>
                </div>
              </div>

              <button
                onClick={() => openReview(withdrawal)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-gray-300 transition hover:border-red-500/40 hover:text-white"
              >
                <Eye size={15} />
                Review withdrawal
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-white/10 bg-[#1B1F27] px-4 py-12 text-center text-sm text-gray-500">
            No withdrawal requests match your filters.
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredWithdrawals.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              filteredWithdrawals.length
            )}{" "}
            to{" "}
            {Math.min(
              currentPage * itemsPerPage,
              filteredWithdrawals.length
            )}{" "}
            of {filteredWithdrawals.length} requests
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

      {/* Review modal */}
      {selectedWithdrawal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-sm sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !processingId) {
              setSelectedWithdrawal(null);
            }
          }}
        >
          <div className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#1B1F27] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Review withdrawal
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedWithdrawal.id}
                </p>
              </div>

              <button
                disabled={!!processingId}
                onClick={() => setSelectedWithdrawal(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
              >
                <X size={19} />
              </button>
            </div>

            <div className="max-h-[75vh] space-y-5 overflow-y-auto p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-gray-500">Request status</p>
                  <div className="mt-2">
                    <StatusBadge status={selectedWithdrawal.status} />
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500">Request date</p>
                  <p className="mt-1 text-sm text-gray-300">
                    {selectedWithdrawal.date}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#15181E] p-4">
                <p className="text-xs text-gray-500">Requested amount</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatAmount(
                    selectedWithdrawal.amount,
                    selectedWithdrawal.asset
                  )}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  {formatUSD(selectedWithdrawal.usdValue)} estimated value
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DetailItem
                  label="Investor"
                  value={selectedWithdrawal.user}
                />
                <DetailItem
                  label="Email"
                  value={selectedWithdrawal.email}
                />
                <DetailItem
                  label="Cryptocurrency"
                  value={selectedWithdrawal.asset}
                />
                <DetailItem
                  label="Network"
                  value={selectedWithdrawal.network}
                />
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-gray-400">
                  Destination wallet address
                </p>
                <div className="flex items-start gap-2 rounded-lg border border-white/10 bg-[#15181E] p-3">
                  <p className="min-w-0 flex-1 break-all text-xs leading-5 text-gray-300">
                    {selectedWithdrawal.walletAddress}
                  </p>
                  <button
                    onClick={() =>
                      copyText(selectedWithdrawal.walletAddress)
                    }
                    className="shrink-0 rounded-md p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                    title="Copy wallet address"
                  >
                    <Copy size={15} />
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-400">
                  Admin note
                </label>
                <textarea
                  rows={3}
                  value={adminNote}
                  onChange={(event) => setAdminNote(event.target.value)}
                  placeholder="Add an internal review note..."
                  className="w-full resize-none rounded-lg border border-white/10 bg-[#15181E] p-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-red-500/50"
                />
              </div>

              {selectedWithdrawal.status === "Pending" && (
                <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle
                      size={16}
                      className="mt-0.5 shrink-0 text-amber-400"
                    />
                    <p className="text-xs leading-5 text-gray-400">
                      Before approving, verify the user's available balance,
                      destination address, selected network, withdrawal
                      limits, and any required security checks. Approval in
                      this demo does not send cryptocurrency.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {selectedWithdrawal.status === "Pending" && (
              <div className="flex flex-col-reverse gap-3 border-t border-white/10 p-5 sm:flex-row sm:justify-end sm:px-6">
                <button
                  disabled={!!processingId}
                  onClick={() =>
                    handleReview(selectedWithdrawal, "Rejected")
                  }
                  className="flex items-center justify-center gap-2 rounded-lg border border-red-500/30 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                >
                  <XCircle size={16} />
                  Reject request
                </button>

                <button
                  disabled={!!processingId}
                  onClick={() =>
                    handleReview(selectedWithdrawal, "Approved")
                  }
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#E1161F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  {processingId === selectedWithdrawal.id ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      Approve request
                    </>
                  )}
                </button>
              </div>
            )}

            {selectedWithdrawal.status !== "Pending" && (
              <div className="border-t border-white/10 p-5 sm:px-6">
                <button
                  onClick={() => setSelectedWithdrawal(null)}
                  className="w-full rounded-lg border border-white/10 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5"
                >
                  Close
                </button>
              </div>
            )}
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
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">{value}</h3>
          <p className="mt-2 text-xs text-gray-500">{description}</p>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: WithdrawalStatus }) {
  const Icon =
    status === "Pending"
      ? Clock
      : status === "Approved"
        ? CheckCircle2
        : XCircle;

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
