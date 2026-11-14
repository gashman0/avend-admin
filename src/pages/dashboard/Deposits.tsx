
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  ArrowDownToLine,
  Clock3,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  Copy,
  ExternalLink,
  Bitcoin,
  Wallet,
  CalendarDays,
  Hash,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

type CryptoAsset = "BTC" | "ETH" | "USDT" | "BNB" | "SOL";
type DepositStatus = "Pending" | "Approved" | "Rejected";

type Deposit = {
  id: string;
  user: string;
  email: string;
  asset: CryptoAsset;
  network: string;
  amount: string;
  usdValue: string;
  txid: string;
  walletAddress: string;
  date: string;
  status: DepositStatus;
  proofImage: string;
};

const sampleDeposits: Deposit[] = [
  {
    id: "DEP-00125",
    user: "Michael Anderson",
    email: "michael@example.com",
    asset: "BTC",
    network: "Bitcoin",
    amount: "0.025 BTC",
    usdValue: "$2,500.00",
    txid: "a8f4c92d7e1b5a3f...",
    walletAddress: "bc1qexamplewalletaddress123456789",
    date: "Nov 14, 2026",
    status: "Pending",
    proofImage: "",
  },
  {
    id: "DEP-00124",
    user: "Sarah Johnson",
    email: "sarah@example.com",
    asset: "USDT",
    network: "TRC20",
    amount: "1,500 USDT",
    usdValue: "$1,500.00",
    txid: "9f3a8b7c6d5e4f2a...",
    walletAddress: "TXexamplewalletaddress123456789",
    date: "Nov 14, 2026",
    status: "Pending",
    proofImage: "",
  },
  {
    id: "DEP-00123",
    user: "David Williams",
    email: "david@example.com",
    asset: "ETH",
    network: "Ethereum",
    amount: "0.85 ETH",
    usdValue: "$2,200.00",
    txid: "0x7f4a2b9c8d6e5f1a...",
    walletAddress: "0xexamplewalletaddress123456789",
    date: "Nov 13, 2026",
    status: "Approved",
    proofImage: "",
  },
  {
    id: "DEP-00122",
    user: "Emily Brown",
    email: "emily@example.com",
    asset: "BNB",
    network: "BNB Smart Chain",
    amount: "3.2 BNB",
    usdValue: "$1,800.00",
    txid: "0x8a7b6c5d4e3f2a1b...",
    walletAddress: "0xexamplebnbwallet123456789",
    date: "Nov 13, 2026",
    status: "Pending",
    proofImage: "",
  },
  {
    id: "DEP-00121",
    user: "James Wilson",
    email: "james@example.com",
    asset: "SOL",
    network: "Solana",
    amount: "12 SOL",
    usdValue: "$1,440.00",
    txid: "5xY8exampleSolanaTransaction...",
    walletAddress: "ExampleSolanaWalletAddress123456",
    date: "Nov 12, 2026",
    status: "Rejected",
    proofImage: "",
  },
  {
    id: "DEP-00120",
    user: "Olivia Martinez",
    email: "olivia@example.com",
    asset: "USDT",
    network: "ERC20",
    amount: "2,000 USDT",
    usdValue: "$2,000.00",
    txid: "0x9b8c7d6e5f4a3b2c...",
    walletAddress: "0xexampleethereumwallet123456789",
    date: "Nov 11, 2026",
    status: "Approved",
    proofImage: "",
  },
];

const assetStyles: Record<CryptoAsset, string> = {
  BTC: "bg-orange-400/10 text-orange-400",
  ETH: "bg-indigo-400/10 text-indigo-400",
  USDT: "bg-emerald-400/10 text-emerald-400",
  BNB: "bg-yellow-400/10 text-yellow-400",
  SOL: "bg-purple-400/10 text-purple-400",
};

const statusStyles: Record<DepositStatus, string> = {
  Pending: "bg-amber-400/10 text-amber-400",
  Approved: "bg-emerald-400/10 text-emerald-400",
  Rejected: "bg-red-400/10 text-red-400",
};

const assetOptions = ["All", "BTC", "ETH", "USDT", "BNB", "SOL"];

const Deposits = () => {
  const [deposits, setDeposits] = useState(sampleDeposits);
  const [search, setSearch] = useState("");
  const [assetFilter, setAssetFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const pageSize = 5;

  const filteredDeposits = useMemo(() => {
    return deposits.filter((deposit) => {
      const matchesSearch =
        deposit.user.toLowerCase().includes(search.toLowerCase()) ||
        deposit.email.toLowerCase().includes(search.toLowerCase()) ||
        deposit.id.toLowerCase().includes(search.toLowerCase()) ||
        deposit.txid.toLowerCase().includes(search.toLowerCase());

      const matchesAsset =
        assetFilter === "All" || deposit.asset === assetFilter;

      const matchesStatus =
        statusFilter === "All" || deposit.status === statusFilter;

      return matchesSearch && matchesAsset && matchesStatus;
    });
  }, [deposits, search, assetFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDeposits.length / pageSize)
  );

  const paginatedDeposits = filteredDeposits.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const pendingCount = deposits.filter(
    (deposit) => deposit.status === "Pending"
  ).length;

  const approvedCount = deposits.filter(
    (deposit) => deposit.status === "Approved"
  ).length;

  const rejectedCount = deposits.filter(
    (deposit) => deposit.status === "Rejected"
  ).length;

  const pendingAmount = deposits
    .filter((deposit) => deposit.status === "Pending")
    .reduce(
      (total, deposit) =>
        total + Number(deposit.usdValue.replace(/[$,]/g, "")),
      0
    );

  const handleReview = (deposit: Deposit, status: DepositStatus) => {
    if (processingId) return;

    setProcessingId(deposit.id);

    // DEMO ONLY:
    // Replace this local state update with your admin review mutation.
    setTimeout(() => {
      setDeposits((previous) =>
        previous.map((item) =>
          item.id === deposit.id ? { ...item, status } : item
        )
      );

      setSelectedDeposit(null);
      setProcessingId(null);
    }, 500);
  };

  const copyText = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard may be unavailable in an insecure browser context.
    }
  };

  const handleFilters = (
    type: "asset" | "status",
    value: string
  ) => {
    setCurrentPage(1);

    if (type === "asset") setAssetFilter(value);
    if (type === "status") setStatusFilter(value);
  };

  return (
    <div className="space-y-7 text-white">

      {/* Heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Deposit Management
          </h2>

          <p className="mt-2 text-sm text-white/45">
            Review and manage cryptocurrency deposit submissions.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-lg border border-white/10 bg-[#1C2028] px-3 py-2 text-xs text-white/50">
          <Wallet size={15} className="text-[#E1161F]" />
          Five supported cryptocurrencies
        </div>
      </div>

      {/* Supported assets */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {assetOptions.slice(1).map((asset) => {
          const count = deposits.filter(
            (deposit) => deposit.asset === asset
          ).length;

          return (
            <button
              type="button"
              key={asset}
              onClick={() => handleFilters("asset", asset)}
              className={`rounded-xl border p-4 text-left transition ${
                assetFilter === asset
                  ? "border-[#E1161F]/60 bg-[#E1161F]/10"
                  : "border-white/10 bg-[#1C2028] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold ${assetStyles[asset as CryptoAsset]}`}
                >
                  {asset}
                </span>

                <span className="text-xs text-white/40">
                  {count}
                </span>
              </div>

              <p className="mt-3 text-xs text-white/45">
                Deposit requests
              </p>
            </button>
          );
        })}
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#1C2028] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/50">Total Requests</p>
            <ArrowDownToLine size={20} className="text-[#E1161F]" />
          </div>
          <h3 className="mt-3 text-3xl font-bold">
            {deposits.length}
          </h3>
          <p className="mt-2 text-xs text-white/40">
            All deposit submissions
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1C2028] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/50">Pending</p>
            <Clock3 size={20} className="text-amber-400" />
          </div>
          <h3 className="mt-3 text-3xl font-bold">
            {pendingCount}
          </h3>
          <p className="mt-2 text-xs text-white/40">
            Awaiting review
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1C2028] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/50">Approved</p>
            <CheckCircle2 size={20} className="text-emerald-400" />
          </div>
          <h3 className="mt-3 text-3xl font-bold">
            {approvedCount}
          </h3>
          <p className="mt-2 text-xs text-white/40">
            Successfully reviewed
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1C2028] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/50">Pending Value</p>
            <Wallet size={20} className="text-[#E1161F]" />
          </div>
          <h3 className="mt-3 break-words text-2xl font-bold">
            ${pendingAmount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </h3>
          <p className="mt-2 text-xs text-white/40">
            Sample USD equivalent
          </p>
        </div>
      </section>

      {/* Deposits table */}
      <section className="overflow-hidden rounded-xl border border-white/10 bg-[#1C2028]">

        {/* Filters */}
        <div className="flex flex-col gap-4 border-b border-white/10 p-4 sm:p-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h3 className="font-semibold">All Deposit Requests</h3>
            <p className="mt-1 text-xs text-white/40">
              Search and filter deposits by asset or status.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex h-11 items-center gap-2 rounded-lg border border-white/10 bg-[#15181E] px-3 sm:w-64">
              <Search size={17} className="shrink-0 text-white/40" />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search user, ID or TXID..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
              />
            </div>

            <div className="flex h-11 items-center gap-2 rounded-lg border border-white/10 bg-[#15181E] px-3">
              <Filter size={16} className="text-white/40" />

              <select
                value={assetFilter}
                onChange={(e) => handleFilters("asset", e.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none sm:w-28"
              >
                {assetOptions.map((asset) => (
                  <option
                    key={asset}
                    value={asset}
                    className="bg-[#15181E]"
                  >
                    {asset === "All" ? "All Assets" : asset}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex h-11 items-center gap-2 rounded-lg border border-white/10 bg-[#15181E] px-3">
              <select
                value={statusFilter}
                onChange={(e) => handleFilters("status", e.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none sm:w-32"
              >
                <option value="All" className="bg-[#15181E]">
                  All Statuses
                </option>
                <option value="Pending" className="bg-[#15181E]">
                  Pending
                </option>
                <option value="Approved" className="bg-[#15181E]">
                  Approved
                </option>
                <option value="Rejected" className="bg-[#15181E]">
                  Rejected
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[1000px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs text-white/40">
                <th className="px-5 py-4 font-medium">Deposit ID</th>
                <th className="px-5 py-4 font-medium">User</th>
                <th className="px-5 py-4 font-medium">Asset / Network</th>
                <th className="px-5 py-4 font-medium">Amount</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedDeposits.map((deposit) => (
                <tr
                  key={deposit.id}
                  className="border-b border-white/5 transition hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4 text-xs font-medium text-white/70">
                    {deposit.id}
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium">
                      {deposit.user}
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      {deposit.email}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-bold ${assetStyles[deposit.asset]}`}
                    >
                      {deposit.asset}
                    </span>
                    <p className="mt-2 text-xs text-white/40">
                      {deposit.network}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold">
                      {deposit.amount}
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      {deposit.usdValue}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-xs text-white/45">
                    {deposit.date}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold ${statusStyles[deposit.status]}`}
                    >
                      {deposit.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setSelectedDeposit(deposit)}
                      aria-label={`Review ${deposit.id}`}
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

        {/* Mobile deposit cards */}
        <div className="divide-y divide-white/5 md:hidden">
          {paginatedDeposits.map((deposit) => (
            <div key={deposit.id} className="space-y-4 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{deposit.user}</p>
                  <p className="mt-1 text-xs text-white/40">
                    {deposit.id}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[deposit.status]}`}
                >
                  {deposit.status}
                </span>
              </div>

              <div className="rounded-lg bg-[#15181E] p-3">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-bold ${assetStyles[deposit.asset]}`}
                  >
                    {deposit.asset}
                  </span>

                  <span className="text-xs text-white/40">
                    {deposit.network}
                  </span>
                </div>

                <p className="mt-3 text-lg font-bold">
                  {deposit.amount}
                </p>

                <p className="mt-1 text-xs text-white/40">
                  {deposit.usdValue}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-white/40">
                  {deposit.date}
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedDeposit(deposit)}
                  className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-white/70 transition hover:bg-[#E1161F] hover:text-white"
                >
                  <Eye size={15} />
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {paginatedDeposits.length === 0 && (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <Wallet size={32} className="text-white/20" />
            <h4 className="mt-4 font-semibold">No deposits found</h4>
            <p className="mt-2 text-sm text-white/40">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            Showing{" "}
            {filteredDeposits.length === 0
              ? 0
              : (currentPage - 1) * pageSize + 1}
            {" - "}
            {Math.min(currentPage * pageSize, filteredDeposits.length)}
            {" of "}
            {filteredDeposits.length} deposits
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

      {/* Deposit review modal */}
      {selectedDeposit && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !processingId) {
              setSelectedDeposit(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="deposit-modal-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[#1C2028] p-5 shadow-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="deposit-modal-title" className="text-xl font-bold">
                  Review Deposit
                </h3>
                <p className="mt-1 text-xs text-white/40">
                  {selectedDeposit.id}
                </p>
              </div>

              <button
                type="button"
                disabled={!!processingId}
                onClick={() => setSelectedDeposit(null)}
                aria-label="Close deposit details"
                className="rounded-lg p-2 text-white/50 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
              >
                <X size={19} />
              </button>
            </div>

            {/* User and amount */}
            <div className="mt-6 rounded-xl bg-[#15181E] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-white/40">Submitted by</p>
                  <p className="mt-1 font-semibold">
                    {selectedDeposit.user}
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    {selectedDeposit.email}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[selectedDeposit.status]}`}
                >
                  {selectedDeposit.status}
                </span>
              </div>

              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-xs text-white/40">Deposit amount</p>
                <p className="mt-1 text-2xl font-bold">
                  {selectedDeposit.amount}
                </p>
                <p className="mt-1 text-sm text-white/40">
                  {selectedDeposit.usdValue}
                </p>
              </div>
            </div>

            {/* Deposit information */}
            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <Wallet size={18} className="mt-0.5 text-[#E1161F]" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-white/40">Cryptocurrency</p>
                  <p className="mt-1 text-sm font-semibold">
                    {selectedDeposit.asset}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Bitcoin size={18} className="mt-0.5 text-[#E1161F]" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-white/40">Network</p>
                  <p className="mt-1 text-sm font-semibold">
                    {selectedDeposit.network}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Hash size={18} className="mt-0.5 text-[#E1161F]" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-white/40">
                    Transaction ID (TXID)
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="break-all text-xs font-medium text-white/80">
                      {selectedDeposit.txid}
                    </p>
                    <button
                      type="button"
                      onClick={() => copyText(selectedDeposit.txid)}
                      aria-label="Copy transaction ID"
                      className="shrink-0 text-white/40 hover:text-white"
                    >
                      <Copy size={15} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Wallet size={18} className="mt-0.5 text-[#E1161F]" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-white/40">
                    Receiving Wallet Address
                  </p>
                  <div className="mt-1 flex items-start gap-2">
                    <p className="break-all text-xs text-white/80">
                      {selectedDeposit.walletAddress}
                    </p>
                    <button
                      type="button"
                      onClick={() => copyText(selectedDeposit.walletAddress)}
                      aria-label="Copy wallet address"
                      className="shrink-0 text-white/40 hover:text-white"
                    >
                      <Copy size={15} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays size={18} className="mt-0.5 text-[#E1161F]" />
                <div>
                  <p className="text-xs text-white/40">Submission Date</p>
                  <p className="mt-1 text-sm font-medium">
                    {selectedDeposit.date}
                  </p>
                </div>
              </div>
            </div>

            {/* Evidence */}
            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="mb-3 flex items-center gap-2">
                <ImageIcon size={17} className="text-[#E1161F]" />
                <p className="text-sm font-semibold">
                  Payment Evidence
                </p>
              </div>

              {selectedDeposit.proofImage ? (
                <img
                  src={selectedDeposit.proofImage}
                  alt="User payment evidence"
                  className="max-h-64 w-full rounded-xl border border-white/10 object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#15181E] px-4 py-8 text-center">
                  <ImageIcon size={26} className="text-white/20" />
                  <p className="mt-3 text-sm text-white/50">
                    No payment screenshot available
                  </p>
                </div>
              )}
            </div>

            {/* Verification reminder */}
            {selectedDeposit.status === "Pending" && (
              <div className="mt-5 rounded-xl border border-amber-400/10 bg-amber-400/5 p-4">
                <p className="text-xs leading-5 text-amber-300/80">
                  Verify the transaction directly on the appropriate
                  blockchain explorer. Confirm the receiving address,
                  asset, network, amount, transaction status, and
                  confirmations. Check that the TXID has not already
                  been credited before approving.
                </p>
              </div>
            )}

            {/* Actions */}
            {selectedDeposit.status === "Pending" ? (
              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={!!processingId}
                  onClick={() =>
                    handleReview(selectedDeposit, "Rejected")
                  }
                  className="flex items-center justify-center gap-2 rounded-lg border border-red-500/20 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                >
                  <XCircle size={17} />
                  Reject Deposit
                </button>

                <button
                  type="button"
                  disabled={!!processingId}
                  onClick={() =>
                    handleReview(selectedDeposit, "Approved")
                  }
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#E1161F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c9131b] disabled:opacity-50"
                >
                  {processingId === selectedDeposit.id ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={17} />
                      Approve Deposit
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="mt-7 flex items-center justify-between gap-3">
                <p className="text-xs text-white/40">
                  This deposit has already been reviewed.
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedDeposit(null)}
                  className="rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-white/70 hover:bg-white/5"
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
};

export default Deposits;
