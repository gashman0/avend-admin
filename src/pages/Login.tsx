
import { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Loader2,
} from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Temporary submit handler.
  // We'll connect this to the separate admin login endpoint next.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Admin authentication API will go here.
    console.log("Admin login submitted");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#15181E] px-4 py-10 text-white">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="mb-10 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <img
              src="/Avend Creast 8.svg"
              alt="AvendCrest"
              className="h-12 w-12 object-contain"
            />

            <span className="text-3xl font-bold tracking-wide">
              AvendCrest
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#E1161F]/20 bg-[#E1161F]/10 px-4 py-2">
            <ShieldCheck size={16} className="text-[#E1161F]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
              Administrator Portal
            </span>
          </div>
        </div>

        {/* Login card */}
        <div className="rounded-2xl border border-white/10 bg-[#1C2028] p-6 shadow-2xl sm:p-8">

          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              Welcome back
            </h1>

            <p className="mt-2 text-sm leading-6 text-white/50">
              Sign in to access your AvendCrest administration dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-sm font-medium text-white/80"
              >
                Email address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#15181E] px-4 transition focus-within:border-[#E1161F]">
                <Mail size={18} className="shrink-0 text-white/40" />

                <input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  placeholder="admin@avendcrest.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-medium text-white/80"
              >
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#15181E] px-4 transition focus-within:border-[#E1161F]">
                <LockKeyhole size={18} className="shrink-0 text-white/40" />

                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-white/40 transition hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#E1161F] text-sm font-semibold text-white transition hover:bg-[#c9131b] active:scale-[0.99]"
            >
              Sign in to Admin Portal
            </button>
          </form>

          <div className="mt-7 border-t border-white/10 pt-6">
            <div className="flex items-center justify-center gap-2 text-xs text-white/40">
              <LockKeyhole size={13} />
              Secure administrator access
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-white/30">
          © {new Date().getFullYear()} AvendCrest. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
