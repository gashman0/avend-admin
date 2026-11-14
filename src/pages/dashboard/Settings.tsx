
import { Settings as SettingsIcon, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#E1161F]/20 bg-[#E1161F]/10">
          <SettingsIcon
            size={36}
            className="text-[#E1161F]"
          />
        </div>

        {/* Status */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E1161F]/20 bg-[#E1161F]/10 px-4 py-2">
          <Clock size={14} className="text-[#E1161F]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E1161F]">
            Coming Soon
          </span>
        </div>

        {/* Heading */}
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Settings
          <span className="text-[#E1161F]">.</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
          We're working on a dedicated settings experience to give you
          better control over your AvendCrest platform.
          This section will be available soon.
        </p>

        {/* Progress decoration */}
        <div className="mx-auto mb-8 h-1.5 w-40 overflow-hidden rounded-full bg-[#292D35]">
          <div className="h-full w-1/3 rounded-full bg-[#E1161F]" />
        </div>

        {/* Back to dashboard */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-[#E1161F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Footer */}
        <p className="mt-10 text-xs text-gray-500">
          AvendCrest Admin Panel
        </p>
      </div>
    </div>
  );
};

export default Settings;
