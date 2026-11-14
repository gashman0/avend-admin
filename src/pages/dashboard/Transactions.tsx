
import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Filter,
  Eye,
  X,
  Copy,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Wallet,
  TrendingUp,
  Gift,
  ArrowLeftRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";

type CryptoAsset = "BTC" | "ETH" | "USDT" | "BNB" | "SOL";

type TransactionType =
  | "Deposit"
  | "Withdrawal"
  | "Investment"
  | "ROI Credit"
  | "Referral Reward";

type TransactionStatus = "Pending" | "Completed" | "Failed" | "Rejected";

type Transaction = {
  id: string;
  user: string;
  email: string;
  type: TransactionType;
  asset: CryptoAsset;
  amount: number;
  usdValue: number;
  network: string;
  reference: string;
  date: string;
  status: TransactionStatus;
  description: string;
};

const initialTransactions: Transaction[] = [
  {
    id: "TXN-1001",
    user: "Daniel Cooper",
    email: "daniel@example.com",
    type: "Deposit",
    asset: "BTC",
    amount: 0.035,
    usdValue: 3150,
    network: "Bitcoin",
    reference: "bc1qexampletxid123456789",
    date: "Nov 14, 2026",
    status: "Completed",
    description: "Investor wallet deposit",
  },
  {
    id: "TXN-1002",
    user: "Sarah Johnson",
    email: "sarah@example.com",
    type: "Withdrawal",
    asset: "USDT",
    amount: 500,
    usdValue: 500,
    network: "TRC20",
    reference: "TExampleWithdrawalRef123456",
    date: "Nov 14, 2026",
    status: "Pending",
    description: "Investor withdrawal request",
  },
  {
    id: "TXN-1003",
    user: "Michael Brown",
    email: "michael@example.com",
    type: "Investment",
    asset: "ETH",
    amount: 0.75,
    usdValue: 2400,
    network: "Ethereum",
    reference: "INV-2026-001",
    date: "Nov 13, 2026",
    status: "Completed",
    description: "Growth plan investment",
  },
  {
    id: "TXN-1004",
    user: "Emily Wilson",
    email: "emily@example.com",
    type: "ROI Credit",
    asset: "USDT",
    amount: 18,
    usdValue: 18,
    network: "Internal wallet",
    reference: "ROI-2026-001",
    date: "Nov 13, 2026",
    status: "Completed",
    description: "Daily investment return credited",
  },
  {
    id: "TXN-1005",
    user: "David Miller",
    email: "david@example.com",
    type: "Referral Reward",
    asset: "USDT",
    amount: 20,
    usdValue: 20,
    network: "Internal wallet",
    reference: "REF-2026-001",
    date: "Nov 12, 2026",
    status: "Completed",
    description: "Referral reward credit",
  },
  {
    id: "TXN-1006",
    user: "Olivia Davis",
    email: "olivia@example.com",
    type: "Deposit",
    asset: "SOL",
    amount: 12.5,
    usdValue: 2250,
    network: "Solana",
    reference: "SolExampleTx123456789",
    date: "Nov 12, 2026",
    status: "Pending",
    description: "Investor wallet deposit awaiting review",
  },
  {
    id: "TXN-1007",
    user: "James Wilson",
    email: "james@example.com",
    type: "Withdrawal",
    asset: "BNB",
    amount: 2.4,
    usdValue: 1464,
    network: "BNB Smart Chain",
    reference: "0xexamplewithdrawal123456789",
    date: "Nov 11, 2026",
    status: "Failed",
    description: "Withdrawal payout failed",
  },
  {
    id: "TXN-1008",
    user: "Sophia Martinez",
    email: "sophia@example.com",
    type: "Investment",
    asset: "USDT",
    amount: 1000,
    usdValue: 1000,
    network: "Internal wallet",
    reference: "INV-2026-002",
    date: "Nov 10, 2026",
    status: "Completed",
    description: "Starter plan investment",
  },
  {
    id: "TXN-1009",
    user: "Noah Anderson",
    email: "noah@example.com",
    type: "Deposit",
    asset: "ETH",
    amount: 0.3,
    usdValue: 960,
    network: "Ethereum",
    reference: "0xexampledeposit123456789",
    date: "Nov 09, 2026",
    status: "Rejected",
    description: "Deposit verification unsuccessful",
  },
  {
    id: "TXN-1010",
    user: "Emma Thomas",
    email: "emma@example.com",
    type: "ROI Credit",
    asset: "USDT",
    amount: 12,
    usdValue: 12,
    network: "Internal wallet",
    reference: "ROI-2026-002",
    date: "Nov 08, 2026",
    status: "Completed",
    description: "Daily investment return credited",
  },
  {
    id: "TXN-1011",
    user: "Liam Taylor",
    email: "liam@example.com",
    type: "Withdrawal",
    asset: "BTC",
    amount: 0.01,
    usdValue: 900,
    network: "Bitcoin",
    reference: "bc1qexamplewithdrawal123",
    date: "Nov 07, 2026",
    status: "Completed",
    description: "Investor withdrawal payout",
  },
];

const assetStyles: Record<CryptoAsset, string> = {
  BTC: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  ETH: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  USDT: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  BNB: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  SOL: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const statusStyles: Record<TransactionStatus, string> = {
  Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Failed: "bg-red-500/10 text-red-400 border-red-500/20",
  Rejected: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

const typeStyles: Record<TransactionType, string> = {
  Deposit: "text-emerald-400",
  Withdrawal: "text-red-400",
  Investment: "text-blue-400",
  "ROI Credit": "text-purple-400",
  "Referral Reward": "text-amber-400",
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

function getTypeIcon(type: TransactionType) {
  switch (type) {
    case "Deposit":
      return <ArrowDownLeft size={15} />;
    case "Withdrawal":
      return <ArrowUpRight size={15} />;
    case "Investment":
      return <TrendingUp size={15} />;
    case "ROI Credit":
      return <Wallet size={15} />;
    case "Referral Reward":
      return <Gift size={15} />;
  }
}

export default function Transactions() {
  const [transactions] = useState(initialTransactions);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [assetFilter, setAssetFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const stats = useMemo(() => {
    const completed = transactions.filter(
      (item) => item.status === "Completed"
    );

    const pending = transactions.filter(
      (item) => item.status === "Pending"
    );

    const deposits = completed
      .filter((item) => item.type === "Deposit")
      .reduce((sum, item) => sum + item.usdValue, 0);

    const withdrawals = completed
      .filter((item) => item.type === "Withdrawal")
      .reduce((sum, item) => sum + item.usdValue, 0);

    const internalCredits = completed
      .filter(
        (item) =>
          item.type === "ROI Credit" ||
          item.type === "Referral Reward"
      )
      .reduce((sum, item) => sum + item.usdValue, 0);

    return {
      total: transactions.length,
      pending: pending.length,
      deposits,
      withdrawals,
      internalCredits,
    };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(query) ||
        item.user.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.reference.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "All" || item.type === typeFilter;

      const matchesAsset =
        assetFilter === "All" || item.asset === assetFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesAsset &&
        matchesStatus
      );
    });
  }, [transactions, search, typeFilter, assetFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / itemsPerPage)
  );

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("All");
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

  const handleTypeChange = (value: string) => {
    setTypeFilter(value);
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
              <ArrowLeftRight size={21} />
            </div>
            <h1 className="text-xl font-semibold text-white sm:text-2xl">
              Transactions
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            View and monitor all financial activity across AvendCrest.
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
            Illustrative transaction records
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-400">
            These transactions and values are sample data. This page is
            currently read-only and is not connected to your backend.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Transactions"
          value={stats.total}
          description="All recorded activities"
          icon={<ArrowLeftRight size={19} />}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10"
        />
        <StatCard
          title="Pending Transactions"
          value={stats.pending}
          description="Awaiting processing or review"
          icon={<Clock size={19} />}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
        />
        <StatCard
          title="Completed Deposits"
          value={formatUSD(stats.deposits)}
          description="Completed deposit value"
          icon={<ArrowDownLeft size={19} />}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
        />
        <StatCard
          title="Completed Withdrawals"
          value={formatUSD(stats.withdrawals)}
          description="Completed withdrawal value"
          icon={<ArrowUpRight size={19} />}
          iconColor="text-red-400"
          iconBg="bg-red-500/10"
        />
      </div>

      {/* Internal credits summary */}
      <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-gray-400">
              Completed internal credits
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              {formatUSD(stats.internalCredits)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              ROI credits and referral rewards combined
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
            <Gift size={19} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-300">
          <Filter size={16} />
          Filter transactions
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
              placeholder="Search user, ID, reference..."
              className="w-full rounded-lg border border-white/10 bg-[#15181E] py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-red-500/50"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(event) => handleTypeChange(event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#15181E] px-3 py-2.5 text-sm text-gray-300 outline-none focus:border-red-500/50"
          >
            <option value="All">All transaction types</option>
            <option value="Deposit">Deposits</option>
            <option value="Withdrawal">Withdrawals</option>
            <option value="Investment">Investments</option>
            <option value="ROI Credit">ROI credits</option>
            <option value="Referral Reward">Referral rewards</option>
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
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-white/10 bg-[#1B1F27] lg:block">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-semibold text-white">
            Transaction history
          </h2>
          <span className="text-xs text-gray-500">
            {filteredTransactions.length} records found
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="bg-[#15181E] text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Transaction</th>
                <th className="px-5 py-4 font-medium">Investor</th>
                <th className="px-5 py-4 font-medium">Type</th>
                <th className="px-5 py-4 font-medium">Amount</th>
                <th className="px-5 py-4 font-medium">Network</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {paginatedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="transition hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-white">
                      {transaction.id}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {transaction.reference}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-white">
                      {transaction.user}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {transaction.email}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-sm ${typeStyles[transaction.type]}`}
                    >
                      {getTypeIcon(transaction.type)}
                      {transaction.type}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-white">
                      {formatAmount(transaction.amount, transaction.asset)}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {formatUSD(transaction.usdValue)}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-400">
                    {transaction.network}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-400">
                    {transaction.date}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={transaction.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedTransaction(transaction)}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-gray-300 transition hover:border-red-500/40 hover:text-white"
                    >
                      <Eye size={14} />
                      Details
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedTransactions.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No transactions match your filters.
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
          <h2 className="font-semibold text-white">Transaction history</h2>
          <span className="text-xs text-gray-500">
            {filteredTransactions.length} records
          </span>
        </div>

        {paginatedTransactions.length > 0 ? (
          paginatedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="rounded-xl border border-white/10 bg-[#1B1F27] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {transaction.user}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {transaction.id}
                  </p>
                </div>
                <StatusBadge status={transaction.status} />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm ${typeStyles[transaction.type]}`}
                  >
                    {getTypeIcon(transaction.type)}
                    {transaction.type}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {formatAmount(transaction.amount, transaction.asset)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {formatUSD(transaction.usdValue)}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`rounded-md border px-2 py-1 text-xs font-semibold ${assetStyles[transaction.asset]}`}
                  >
                    {transaction.asset}
                  </span>
                  <p className="mt-2 text-xs text-gray-400">
                    {transaction.network}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {transaction.date}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedTransaction(transaction)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-gray-300 transition hover:border-red-500/40 hover:text-white"
              >
                <Eye size={15} />
                View transaction details
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-white/10 bg-[#1B1F27] px-4 py-12 text-center text-sm text-gray-500">
            No transactions match your filters.
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredTransactions.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              filteredTransactions.length
            )}{" "}
            to{" "}
            {Math.min(
              currentPage * itemsPerPage,
              filteredTransactions.length
            )}{" "}
            of {filteredTransactions.length} transactions
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

      {/* Transaction details modal */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-sm sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedTransaction(null);
            }
          }}
        >
          <div className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#1B1F27] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Transaction details
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedTransaction.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedTransaction(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="max-h-[75vh] space-y-5 overflow-y-auto p-5 sm:p-6">
              <div className="rounded-xl border border-white/10 bg-[#15181E] p-4">
                <p className="text-xs text-gray-500">Transaction amount</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatAmount(
                    selectedTransaction.amount,
                    selectedTransaction.asset
                  )}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  {formatUSD(selectedTransaction.usdValue)} estimated value
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <StatusBadge status={selectedTransaction.status} />
                  <span
                    className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${assetStyles[selectedTransaction.asset]}`}
                  >
                    {selectedTransaction.asset}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DetailItem
                  label="Investor"
                  value={selectedTransaction.user}
                />
                <DetailItem
                  label="Email"
                  value={selectedTransaction.email}
                />
                <DetailItem
                  label="Transaction type"
                  value={selectedTransaction.type}
                />
                <DetailItem
                  label="Network"
                  value={selectedTransaction.network}
                />
                <DetailItem
                  label="Date"
                  value={selectedTransaction.date}
                />
                <DetailItem
                  label="Description"
                  value={selectedTransaction.description}
                />
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-gray-400">
                  Transaction reference / TXID
                </p>
                <div className="flex items-start gap-2 rounded-lg border border-white/10 bg-[#15181E] p-3">
                  <p className="min-w-0 flex-1 break-all text-xs leading-5 text-gray-300">
                    {selectedTransaction.reference}
                  </p>
                  <button
                    onClick={() => copyText(selectedTransaction.reference)}
                    className="shrink-0 rounded-md p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                    title="Copy reference"
                  >
                    <Copy size={15} />
                  </button>
                </div>
              </div>

              {selectedTransaction.status === "Pending" && (
                <div className="flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                  <AlertTriangle
                    size={16}
                    className="mt-0.5 shrink-0 text-amber-400"
                  />
                  <p className="text-xs leading-5 text-gray-400">
                    This transaction is pending. Check its corresponding
                    deposit or withdrawal record to review or process it.
                    This transaction history page does not approve or send
                    funds.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-5 sm:px-6">
              <button
                onClick={() => setSelectedTransaction(null)}
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

function StatusBadge({ status }: { status: TransactionStatus }) {
  const Icon =
    status === "Pending"
      ? Clock
      : status === "Completed"
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
