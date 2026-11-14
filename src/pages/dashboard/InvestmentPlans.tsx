
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  Clock,
  Wallet,
  TrendingUp,
  CalendarDays,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Bitcoin,
  Coins,
  CircleDollarSign,
} from "lucide-react";

type CryptoAsset = "BTC" | "ETH" | "USDT" | "BNB" | "SOL";

type InvestmentPlan = {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  dailyROI: number;
  durationDays: number;
  supportedAssets: CryptoAsset[];
  status: "Active" | "Inactive";
  createdAt: string;
};

type PlanFormData = {
  name: string;
  description: string;
  minAmount: string;
  maxAmount: string;
  dailyROI: string;
  durationDays: string;
  supportedAssets: CryptoAsset[];
};

const initialPlans: InvestmentPlan[] = [
  {
    id: "PLAN-001",
    name: "Starter Plan",
    description: "An entry-level plan for investors getting started.",
    minAmount: 100,
    maxAmount: 999,
    dailyROI: 1,
    durationDays: 30,
    supportedAssets: ["BTC", "ETH", "USDT"],
    status: "Active",
    createdAt: "Nov 01, 2026",
  },
  {
    id: "PLAN-002",
    name: "Growth Plan",
    description: "A plan for investors looking for a larger allocation.",
    minAmount: 1000,
    maxAmount: 4999,
    dailyROI: 2,
    durationDays: 30,
    supportedAssets: ["BTC", "ETH", "USDT", "BNB"],
    status: "Active",
    createdAt: "Nov 02, 2026",
  },
  {
    id: "PLAN-003",
    name: "Premium Plan",
    description: "A higher-tier investment plan.",
    minAmount: 5000,
    maxAmount: 25000,
    dailyROI: 3,
    durationDays: 30,
    supportedAssets: ["BTC", "ETH", "USDT", "BNB", "SOL"],
    status: "Active",
    createdAt: "Nov 03, 2026",
  },
];

const supportedAssets: CryptoAsset[] = [
  "BTC",
  "ETH",
  "USDT",
  "BNB",
  "SOL",
];

const assetStyles: Record<CryptoAsset, string> = {
  BTC: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  ETH: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  USDT: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  BNB: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  SOL: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const emptyForm: PlanFormData = {
  name: "",
  description: "",
  minAmount: "",
  maxAmount: "",
  dailyROI: "",
  durationDays: "",
  supportedAssets: ["USDT"],
};

const formatUSD = (amount: number) =>
  amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

export default function InvestmentPlan() {
  const [plans, setPlans] = useState<InvestmentPlan[]>(initialPlans);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] =
    useState<InvestmentPlan | null>(null);
  const [planToDelete, setPlanToDelete] =
    useState<InvestmentPlan | null>(null);

  const [form, setForm] = useState<PlanFormData>(emptyForm);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const itemsPerPage = 6;

  const activeCount = plans.filter(
    (plan) => plan.status === "Active"
  ).length;

  const inactiveCount = plans.filter(
    (plan) => plan.status === "Inactive"
  ).length;

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const query = search.toLowerCase();

      const matchesSearch =
        plan.name.toLowerCase().includes(query) ||
        plan.id.toLowerCase().includes(query) ||
        plan.description.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || plan.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [plans, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPlans.length / itemsPerPage)
  );

  const paginatedPlans = filteredPlans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  const closeCreateModal = () => {
    setIsCreateOpen(false);
    setForm(emptyForm);
    setFormError("");
  };

  const updateForm = (
    field: keyof Omit<PlanFormData, "supportedAssets">,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const toggleAsset = (asset: CryptoAsset) => {
    setForm((previous) => {
      const exists = previous.supportedAssets.includes(asset);

      return {
        ...previous,
        supportedAssets: exists
          ? previous.supportedAssets.filter((item) => item !== asset)
          : [...previous.supportedAssets, asset],
      };
    });
  };

  const handleCreatePlan = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const minAmount = Number(form.minAmount);
    const maxAmount = Number(form.maxAmount);
    const dailyROI = Number(form.dailyROI);
    const durationDays = Number(form.durationDays);

    if (!form.name.trim()) {
      setFormError("Please enter a plan name.");
      return;
    }

    if (
      !Number.isFinite(minAmount) ||
      !Number.isFinite(maxAmount) ||
      minAmount <= 0 ||
      maxAmount < minAmount
    ) {
      setFormError(
        "Enter valid investment limits. The maximum must be greater than or equal to the minimum."
      );
      return;
    }

    if (!Number.isFinite(dailyROI) || dailyROI <= 0) {
      setFormError("Enter a valid daily ROI percentage.");
      return;
    }

    if (
      !Number.isInteger(durationDays) ||
      durationDays <= 0
    ) {
      setFormError("Duration must be a whole number of days.");
      return;
    }

    if (form.supportedAssets.length === 0) {
      setFormError("Select at least one supported cryptocurrency.");
      return;
    }

    setIsSubmitting(true);

    // DEMO ONLY:
    // Replace this local state update with your create-plan API mutation.
    const newPlan: InvestmentPlan = {
      id: `PLAN-${Date.now()}`,
      name: form.name.trim(),
      description: form.description.trim(),
      minAmount,
      maxAmount,
      dailyROI,
      durationDays,
      supportedAssets: form.supportedAssets,
      status: "Active",
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    setPlans((previous) => [newPlan, ...previous]);
    setCurrentPage(1);
    setSearch("");
    setStatusFilter("All");
    setIsSubmitting(false);
    closeCreateModal();
  };

  const handleDeletePlan = () => {
    if (!planToDelete) return;

    // DEMO ONLY:
    // Replace this local update with your delete-plan API mutation.
    setPlans((previous) =>
      previous.filter((plan) => plan.id !== planToDelete.id)
    );

    setPlanToDelete(null);
    setSelectedPlan(null);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Page heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-[#E1161F]">
              <TrendingUp size={21} />
            </div>

            <h1 className="text-xl font-semibold text-white sm:text-2xl">
              Investment Plans
            </h1>
          </div>

          <p className="mt-2 text-sm text-gray-400">
            Create, manage, and monitor the investment plans available to investors.
          </p>
        </div>

        <button
          onClick={() => {
            setForm(emptyForm);
            setFormError("");
            setIsCreateOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E1161F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <Plus size={17} />
          Create new plan
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
            Illustrative plan configuration
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-400">
            The existing plans and their ROI rates are sample values, not approved
            investment terms. Creating and deleting plans currently updates this
            page only; backend persistence has not been connected.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Plans"
          value={plans.length}
          description="All configured investment plans"
          icon={<Wallet size={19} />}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10"
        />

        <StatCard
          title="Active Plans"
          value={activeCount}
          description="Plans available to investors"
          icon={<CheckCircle2 size={19} />}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
        />

        <StatCard
          title="Inactive Plans"
          value={inactiveCount}
          description="Plans not currently available"
          icon={<Clock size={19} />}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
        />
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-300">
          <Filter size={16} />
          Find investment plans
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
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by plan name or ID..."
              className="w-full rounded-lg border border-white/10 bg-[#15181E] py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-red-500/50"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-white/10 bg-[#15181E] px-3 py-2.5 text-sm text-gray-300 outline-none focus:border-red-500/50"
          >
            <option value="All">All plan statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {(search || statusFilter !== "All") && (
          <button
            onClick={resetFilters}
            className="mt-3 inline-flex items-center gap-2 text-xs text-gray-400 transition hover:text-white"
          >
            <RefreshCw size={13} />
            Clear filters
          </button>
        )}
      </div>

      {/* Plan list */}
      <div className="hidden overflow-hidden rounded-xl border border-white/10 bg-[#1B1F27] lg:block">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-semibold text-white">Available plans</h2>
          <span className="text-xs text-gray-500">
            {filteredPlans.length} plans found
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-[#15181E] text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Plan</th>
                <th className="px-5 py-4 font-medium">Investment range</th>
                <th className="px-5 py-4 font-medium">Daily ROI</th>
                <th className="px-5 py-4 font-medium">Duration</th>
                <th className="px-5 py-4 font-medium">Assets</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {paginatedPlans.map((plan) => (
                <tr
                  key={plan.id}
                  className="transition hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-white">
                      {plan.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {plan.id}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-white">
                      {formatUSD(plan.minAmount)} - {formatUSD(plan.maxAmount)}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-emerald-400">
                      {plan.dailyROI}%
                    </span>
                    <p className="mt-1 text-xs text-gray-500">Per day</p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-300">
                    {plan.durationDays} days
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {plan.supportedAssets.map((asset) => (
                        <span
                          key={asset}
                          className={`rounded-md border px-2 py-1 text-[10px] font-semibold ${assetStyles[asset]}`}
                        >
                          {asset}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <PlanStatusBadge status={plan.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedPlan(plan)}
                        title="View plan"
                        className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-blue-500/40 hover:text-blue-400"
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        onClick={() => setSelectedPlan(plan)}
                        title="Plan details"
                        className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-white/30 hover:text-white"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() => setPlanToDelete(plan)}
                        title="Delete plan"
                        className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-red-500/40 hover:text-red-400"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {paginatedPlans.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No investment plans match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile plan cards */}
      <div className="space-y-3 lg:hidden">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-white">Available plans</h2>
          <span className="text-xs text-gray-500">
            {filteredPlans.length} plans
          </span>
        </div>

        {paginatedPlans.length > 0 ? (
          paginatedPlans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-xl border border-white/10 bg-[#1B1F27] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {plan.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{plan.id}</p>
                </div>
                <PlanStatusBadge status={plan.status} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Investment range</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {formatUSD(plan.minAmount)}
                  </p>
                  <p className="text-xs text-gray-400">
                    to {formatUSD(plan.maxAmount)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Daily ROI</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-400">
                    {plan.dailyROI}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="mt-1 text-sm text-gray-300">
                    {plan.durationDays} days
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Supported assets</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {plan.supportedAssets.map((asset) => (
                      <span
                        key={asset}
                        className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold ${assetStyles[asset]}`}
                      >
                        {asset}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2 border-t border-white/5 pt-3">
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-xs font-medium text-gray-300 transition hover:bg-white/5"
                >
                  <Eye size={14} />
                  View
                </button>

                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="flex items-center justify-center rounded-lg border border-white/10 px-3 text-gray-400 transition hover:text-white"
                  title="Plan details"
                >
                  <Pencil size={15} />
                </button>

                <button
                  onClick={() => setPlanToDelete(plan)}
                  className="flex items-center justify-center rounded-lg border border-white/10 px-3 text-red-400 transition hover:bg-red-500/10"
                  title="Delete plan"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-white/10 bg-[#1B1F27] px-4 py-12 text-center text-sm text-gray-500">
            No investment plans match your filters.
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredPlans.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              filteredPlans.length
            )}{" "}
            to{" "}
            {Math.min(
              currentPage * itemsPerPage,
              filteredPlans.length
            )}{" "}
            of {filteredPlans.length} plans
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

      {/* Create plan modal */}
      {isCreateOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-sm sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isSubmitting) {
              closeCreateModal();
            }
          }}
        >
          <div className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#1B1F27] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Create investment plan
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Configure a new plan for investors.
                </p>
              </div>

              <button
                disabled={isSubmitting}
                onClick={closeCreateModal}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleCreatePlan}>
              <div className="max-h-[70vh] space-y-5 overflow-y-auto p-5 sm:p-6">
                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-400">
                    Plan name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(event) =>
                      updateForm("name", event.target.value)
                    }
                    placeholder="e.g. Starter Plan"
                    className="w-full rounded-lg border border-white/10 bg-[#15181E] px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-red-500/50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-400">
                    Plan description
                  </label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(event) =>
                      updateForm("description", event.target.value)
                    }
                    placeholder="Briefly describe this investment plan..."
                    className="w-full resize-none rounded-lg border border-white/10 bg-[#15181E] p-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-red-500/50"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-gray-400">
                      Minimum investment (USD)
                    </label>
                    <input
                      required
                      type="number"
                      min="0.01"
                      step="any"
                      value={form.minAmount}
                      onChange={(event) =>
                        updateForm("minAmount", event.target.value)
                      }
                      placeholder="100"
                      className="w-full rounded-lg border border-white/10 bg-[#15181E] px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-red-500/50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-gray-400">
                      Maximum investment (USD)
                    </label>
                    <input
                      required
                      type="number"
                      min="0.01"
                      step="any"
                      value={form.maxAmount}
                      onChange={(event) =>
                        updateForm("maxAmount", event.target.value)
                      }
                      placeholder="1000"
                      className="w-full rounded-lg border border-white/10 bg-[#15181E] px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-red-500/50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-gray-400">
                      Daily ROI (%)
                    </label>
                    <input
                      required
                      type="number"
                      min="0.01"
                      step="any"
                      value={form.dailyROI}
                      onChange={(event) =>
                        updateForm("dailyROI", event.target.value)
                      }
                      placeholder="1"
                      className="w-full rounded-lg border border-white/10 bg-[#15181E] px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-red-500/50"
                    />
                    <p className="mt-1 text-[11px] text-gray-500">
                      Enter the daily ROI percentage for this plan.
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-gray-400">
                      Investment duration (days)
                    </label>
                    <input
                      required
                      type="number"
                      min="1"
                      step="1"
                      value={form.durationDays}
                      onChange={(event) =>
                        updateForm("durationDays", event.target.value)
                      }
                      placeholder="30"
                      className="w-full rounded-lg border border-white/10 bg-[#15181E] px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-red-500/50"
                    />
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-medium text-gray-400">
                    Supported cryptocurrencies
                  </p>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {supportedAssets.map((asset) => {
                      const checked = form.supportedAssets.includes(asset);

                      return (
                        <button
                          key={asset}
                          type="button"
                          onClick={() => toggleAsset(asset)}
                          className={`flex items-center justify-between rounded-lg border p-3 text-sm transition ${
                            checked
                              ? "border-red-500/50 bg-red-500/10 text-white"
                              : "border-white/10 bg-[#15181E] text-gray-400 hover:border-white/20"
                          }`}
                        >
                          <span className="font-semibold">{asset}</span>
                          {checked && (
                            <CheckCircle2
                              size={16}
                              className="text-[#E1161F]"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <p className="mt-2 text-[11px] text-gray-500">
                    Select every cryptocurrency that investors may use for this plan.
                  </p>
                </div>

                {formError && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs leading-5 text-red-400">
                    {formError}
                  </div>
                )}
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-white/10 p-5 sm:flex-row sm:justify-end sm:px-6">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={closeCreateModal}
                  className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E1161F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Create plan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View plan modal */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-sm sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedPlan(null);
            }
          }}
        >
          <div className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#1B1F27] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Plan details
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedPlan.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedPlan(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {selectedPlan.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {selectedPlan.description || "No description provided."}
                  </p>
                </div>

                <PlanStatusBadge status={selectedPlan.status} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <DetailCard
                  label="Minimum investment"
                  value={formatUSD(selectedPlan.minAmount)}
                />
                <DetailCard
                  label="Maximum investment"
                  value={formatUSD(selectedPlan.maxAmount)}
                />
                <DetailCard
                  label="Daily ROI"
                  value={`${selectedPlan.dailyROI}%`}
                />
                <DetailCard
                  label="Duration"
                  value={`${selectedPlan.durationDays} days`}
                />
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-gray-400">
                  Supported assets
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedPlan.supportedAssets.map((asset) => (
                    <span
                      key={asset}
                      className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${assetStyles[asset]}`}
                    >
                      {asset}
                    </span>
                  ))}
                </div>
              </div>

              <DetailRow
                label="Created"
                value={selectedPlan.createdAt}
              />

              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                <p className="text-xs leading-5 text-gray-400">
                  This is a read-only plan details view. Editing is not connected yet.
                  Existing investments should retain their original plan terms even
                  if the plan is later changed or removed from new subscriptions.
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 p-5">
              <button
                onClick={() => setSelectedPlan(null)}
                className="w-full rounded-lg border border-white/10 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {planToDelete && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPlanToDelete(null);
            }
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1B1F27] p-5 shadow-2xl sm:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <Trash2 size={22} />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-white">
              Delete investment plan?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">
                {planToDelete.name}
              </span>
              ? This action will remove the plan from this demo page.
            </p>

            <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
              <AlertTriangle
                size={15}
                className="mt-0.5 shrink-0 text-amber-400"
              />
              <p className="text-xs leading-5 text-gray-400">
                In production, deleting a plan should not erase existing
                investments or their historical terms. Consider disabling a
                plan for new investors instead.
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setPlanToDelete(null)}
                className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5"
              >
                Keep plan
              </button>

              <button
                onClick={handleDeletePlan}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E1161F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <Trash2 size={15} />
                Delete plan
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
          <h3 className="mt-3 text-2xl font-semibold text-white">
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

function PlanStatusBadge({ status }: { status: "Active" | "Inactive" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
        status === "Active"
          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
          : "border-gray-500/20 bg-gray-500/10 text-gray-400"
      }`}
    >
      {status === "Active" ? (
        <CheckCircle2 size={12} />
      ) : (
        <Clock size={12} />
      )}
      {status}
    </span>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#15181E] p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-2 break-words text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-white/5 pt-3">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-sm text-gray-300">{value}</span>
    </div>
  );
}
