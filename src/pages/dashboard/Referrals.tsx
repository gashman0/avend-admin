
import { useMemo, useState } from "react";
import {
  Users,
  Gift,
  Search,
  Filter,
  Eye,
  X,
  Copy,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  CheckCircle2,
  Clock,
  XCircle,
  Wallet,
  UserPlus,
  Link2,
  CircleDollarSign,
  AlertTriangle,
} from "lucide-react";

type ReferralStatus =
  | "Pending"
  | "Approved"
  | "Reward Credited"
  | "Rejected";

type Referral = {
  id: string;
  referralCode: string;
  referrer: string;
  referrerEmail: string;
  referredUser: string;
  referredEmail: string;
  date: string;
  reward: number;
  status: ReferralStatus;
  rewardReference?: string;
};

const REWARD_AMOUNT = 20;

const initialReferrals: Referral[] = [
  {
    id: "REF-1001",
    referralCode: "DANIEL20",
    referrer: "Daniel Cooper",
    referrerEmail: "daniel@example.com",
    referredUser: "Michael Brown",
    referredEmail: "michael@example.com",
    date: "Nov 14, 2026",
    reward: REWARD_AMOUNT,
    status: "Reward Credited",
    rewardReference: "RWD-1001",
  },
  {
    id: "REF-1002",
    referralCode: "SARAH20",
    referrer: "Sarah Johnson",
    referrerEmail: "sarah@example.com",
    referredUser: "Emily Wilson",
    referredEmail: "emily@example.com",
    date: "Nov 13, 2026",
    reward: REWARD_AMOUNT,
    status: "Pending",
  },
  {
    id: "REF-1003",
    referralCode: "DAVID20",
    referrer: "David Miller",
    referrerEmail: "david@example.com",
    referredUser: "Olivia Davis",
    referredEmail: "olivia@example.com",
    date: "Nov 12, 2026",
    reward: REWARD_AMOUNT,
    status: "Approved",
  },
  {
    id: "REF-1004",
    referralCode: "EMILY20",
    referrer: "Emily Wilson",
    referrerEmail: "emily@example.com",
    referredUser: "James Wilson",
    referredEmail: "james@example.com",
    date: "Nov 11, 2026",
    reward: REWARD_AMOUNT,
    status: "Rejected",
  },
  {
    id: "REF-1005",
    referralCode: "MICHAEL20",
    referrer: "Michael Brown",
    referrerEmail: "michael@example.com",
    referredUser: "Sophia Martinez",
    referredEmail: "sophia@example.com",
    date: "Nov 10, 2026",
    reward: REWARD_AMOUNT,
    status: "Reward Credited",
    rewardReference: "RWD-1002",
  },
  {
    id: "REF-1006",
    referralCode: "OLIVIA20",
    referrer: "Olivia Davis",
    referrerEmail: "olivia@example.com",
    referredUser: "Noah Anderson",
    referredEmail: "noah@example.com",
    date: "Nov 09, 2026",
    reward: REWARD_AMOUNT,
    status: "Pending",
  },
  {
    id: "REF-1007",
    referralCode: "JAMES20",
    referrer: "James Wilson",
    referrerEmail: "james@example.com",
    referredUser: "Emma Thomas",
    referredEmail: "emma@example.com",
    date: "Nov 08, 2026",
    reward: REWARD_AMOUNT,
    status: "Reward Credited",
    rewardReference: "RWD-1003",
  },
  {
    id: "REF-1008",
    referralCode: "SOPHIA20",
    referrer: "Sophia Martinez",
    referrerEmail: "sophia@example.com",
    referredUser: "Liam Taylor",
    referredEmail: "liam@example.com",
    date: "Nov 07, 2026",
    reward: REWARD_AMOUNT,
    status: "Pending",
  },
];

const statusStyles: Record<ReferralStatus, string> = {
  Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Approved: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Reward Credited":
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
};

const formatUSD = (amount: number) =>
  amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

export default function Referrals() {
  const [referrals] = useState(initialReferrals);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReferral, setSelectedReferral] =
    useState<Referral | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const stats = useMemo(() => {
    const pending = referrals.filter(
      (item) => item.status === "Pending"
    );

    const approved = referrals.filter(
      (item) => item.status === "Approved"
    );

    const credited = referrals.filter(
      (item) => item.status === "Reward Credited"
    );

    const rejected = referrals.filter(
      (item) => item.status === "Rejected"
    );

    const totalCredited = credited.reduce(
      (sum, item) => sum + item.reward,
      0
    );

    return {
      total: referrals.length,
      pending: pending.length,
      approved: approved.length,
      credited: credited.length,
      rejected: rejected.length,
      totalCredited,
      pendingValue: pending.reduce(
        (sum, item) => sum + item.reward,
        0
      ),
    };
  }, [referrals]);

  const filteredReferrals = useMemo(() => {
    return referrals.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch =
        item.id.toLowerCase().includes(query) ||
        item.referralCode.toLowerCase().includes(query) ||
        item.referrer.toLowerCase().includes(query) ||
        item.referrerEmail.toLowerCase().includes(query) ||
        item.referredUser.toLowerCase().includes(query) ||
        item.referredEmail.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [referrals, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReferrals.length / itemsPerPage)
  );

  const paginatedReferrals = filteredReferrals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearch("");
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
              <Users size={21} />
            </div>

            <h1 className="text-xl font-semibold text-white sm:text-2xl">
              Referrals
            </h1>
          </div>

          <p className="mt-2 text-sm text-gray-400">
            Monitor referral activity, referred investors, and referral rewards.
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

      {/* Reward information */}
      <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
        <Gift
          size={19}
          className="mt-0.5 shrink-0 text-emerald-400"
        />

        <div>
          <p className="text-sm font-medium text-emerald-300">
            Fixed referral reward: {formatUSD(REWARD_AMOUNT)}
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-400">
            The agreed reward amount is $20 for each eligible referral.
            The qualification conditions have not yet been finalized.
          </p>
        </div>
      </div>

      {/* Demo notice */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <AlertTriangle
          size={19}
          className="mt-0.5 shrink-0 text-amber-400"
        />

        <div>
          <p className="text-sm font-medium text-amber-300">
            Illustrative referral records
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-400">
            The records and figures below are sample data. This page is
            currently read-only and is not connected to your referral backend.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Referrals"
          value={stats.total}
          description="All referral records"
          icon={<Users size={19} />}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10"
        />

        <StatCard
          title="Pending Referrals"
          value={stats.pending}
          description="Awaiting qualification review"
          icon={<Clock size={19} />}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
        />

        <StatCard
          title="Rewards Credited"
          value={stats.credited}
          description="Referral rewards recorded as credited"
          icon={<CheckCircle2 size={19} />}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
        />

        <StatCard
          title="Total Rewards Paid"
          value={formatUSD(stats.totalCredited)}
          description="Recorded credited referral rewards"
          icon={<CircleDollarSign size={19} />}
          iconColor="text-purple-400"
          iconBg="bg-purple-500/10"
        />
      </div>

      {/* Additional reward overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-gray-400">
                Approved referrals
              </p>
              <p className="mt-2 text-xl font-semibold text-white">
                {stats.approved}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Approved records awaiting reward credit
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <CheckCircle2 size={19} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-gray-400">
                Pending reward value
              </p>
              <p className="mt-2 text-xl font-semibold text-white">
                {formatUSD(stats.pendingValue)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Illustrative value of pending referral records
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <Wallet size={19} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-300">
          <Filter size={16} />
          Filter referrals
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                handleSearchChange(event.target.value)
              }
              placeholder="Search name, email, code, or ID..."
              className="w-full rounded-lg border border-white/10 bg-[#15181E] py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-red-500/50"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              handleStatusChange(event.target.value)
            }
            className="w-full rounded-lg border border-white/10 bg-[#15181E] px-3 py-2.5 text-sm text-gray-300 outline-none focus:border-red-500/50"
          >
            <option value="All">All referral statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Reward Credited">Reward Credited</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-white/10 bg-[#1B1F27] lg:block">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-semibold text-white">
            Referral records
          </h2>

          <span className="text-xs text-gray-500">
            {filteredReferrals.length} records found
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="bg-[#15181E] text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Referrer</th>
                <th className="px-5 py-4 font-medium">Referred user</th>
                <th className="px-5 py-4 font-medium">Referral code</th>
                <th className="px-5 py-4 font-medium">Reward</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {paginatedReferrals.map((referral) => (
                <tr
                  key={referral.id}
                  className="transition hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-white">
                      {referral.referrer}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {referral.referrerEmail}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-white">
                      {referral.referredUser}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {referral.referredEmail}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-md border border-white/10 bg-[#15181E] px-2.5 py-1.5 text-xs font-medium text-gray-300">
                      {referral.referralCode}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-white">
                    {formatUSD(referral.reward)}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-400">
                    {referral.date}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={referral.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedReferral(referral)}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-gray-300 transition hover:border-red-500/40 hover:text-white"
                    >
                      <Eye size={14} />
                      Details
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedReferrals.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No referral records match your filters.
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
          <h2 className="font-semibold text-white">Referral records</h2>
          <span className="text-xs text-gray-500">
            {filteredReferrals.length} records
          </span>
        </div>

        {paginatedReferrals.length > 0 ? (
          paginatedReferrals.map((referral) => (
            <div
              key={referral.id}
              className="rounded-xl border border-white/10 bg-[#1B1F27] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {referral.referrer}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Referred by
                  </p>
                </div>

                <StatusBadge status={referral.status} />
              </div>

              <div className="my-3 flex items-center gap-2 text-gray-500">
                <div className="h-px flex-1 bg-white/10" />
                <UserPlus size={15} />
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  {referral.referredUser}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {referral.referredEmail}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/5 pt-3">
                <div>
                  <p className="text-xs text-gray-500">Referral reward</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-400">
                    {formatUSD(referral.reward)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Referral code</p>
                  <p className="mt-1 text-sm font-medium text-gray-300">
                    {referral.referralCode}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedReferral(referral)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-gray-300 transition hover:border-red-500/40 hover:text-white"
              >
                <Eye size={15} />
                View referral details
              </button>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-white/10 bg-[#1B1F27] px-4 py-12 text-center text-sm text-gray-500">
            No referral records match your filters.
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredReferrals.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              filteredReferrals.length
            )}{" "}
            to{" "}
            {Math.min(
              currentPage * itemsPerPage,
              filteredReferrals.length
            )}{" "}
            of {filteredReferrals.length} referrals
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

      {/* Referral details modal */}
      {selectedReferral && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-sm sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedReferral(null);
            }
          }}
        >
          <div className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#1B1F27] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Referral details
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedReferral.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedReferral(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="max-h-[75vh] space-y-5 overflow-y-auto p-5 sm:p-6">
              <div className="rounded-xl border border-white/10 bg-[#15181E] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-gray-500">
                      Referral reward
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {formatUSD(selectedReferral.reward)}
                    </p>
                  </div>

                  <StatusBadge status={selectedReferral.status} />
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Referring investor
                </p>

                <div className="rounded-lg border border-white/10 bg-[#15181E] p-3">
                  <p className="text-sm font-semibold text-white">
                    {selectedReferral.referrer}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {selectedReferral.referrerEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-500">
                <div className="h-px flex-1 bg-white/10" />
                <UserPlus size={17} />
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Referred investor
                </p>

                <div className="rounded-lg border border-white/10 bg-[#15181E] p-3">
                  <p className="text-sm font-semibold text-white">
                    {selectedReferral.referredUser}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {selectedReferral.referredEmail}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-gray-400">
                  Referral code
                </p>

                <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#15181E] p-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <Link2
                      size={15}
                      className="shrink-0 text-gray-500"
                    />
                    <p className="truncate text-sm font-medium text-gray-300">
                      {selectedReferral.referralCode}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      copyText(selectedReferral.referralCode)
                    }
                    className="rounded-md p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                    title="Copy referral code"
                  >
                    <Copy size={15} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DetailItem
                  label="Referral date"
                  value={selectedReferral.date}
                />

                <DetailItem
                  label="Referral record ID"
                  value={selectedReferral.id}
                />

                <DetailItem
                  label="Reward amount"
                  value={formatUSD(selectedReferral.reward)}
                />

                <DetailItem
                  label="Reward reference"
                  value={selectedReferral.rewardReference || "Not credited"}
                />
              </div>

              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle
                    size={16}
                    className="mt-0.5 shrink-0 text-amber-400"
                  />

                  <p className="text-xs leading-5 text-gray-400">
                    Referral qualification rules have not yet been finalized.
                    This page does not determine eligibility or issue referral
                    payments. Verify the applicable rules before recording a
                    reward as credited.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 p-5 sm:px-6">
              <button
                onClick={() => setSelectedReferral(null)}
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

function StatusBadge({ status }: { status: ReferralStatus }) {
  const Icon =
    status === "Pending"
      ? Clock
      : status === "Rejected"
        ? XCircle
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

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 break-words text-sm text-gray-200">{value}</p>
    </div>
  );
}
