
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type AdminStatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    direction: "up" | "down";
    label?: string;
  };
};

const AdminStatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
}: AdminStatCardProps) => {
  const TrendIcon =
    trend?.direction === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-[#1C2028] p-4 transition duration-200 hover:border-white/20 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-white/50 sm:text-sm">
            {title}
          </p>

          <h3 className="mt-3 break-words text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {value}
          </h3>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E1161F]/15 bg-[#E1161F]/10 text-[#E1161F] sm:h-12 sm:w-12">
          <Icon size={21} strokeWidth={1.8} />
        </div>
      </div>

      {(description || trend) && (
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1">
          {trend && (
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                trend.direction === "up"
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              <TrendIcon size={14} />
              {trend.value}
            </span>
          )}

          {trend?.label && (
            <span className="text-xs text-white/40">
              {trend.label}
            </span>
          )}

          {description && (
            <span className="text-xs text-white/40">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminStatCard;
