"use client"

import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { login } from "@/lib/api"
import { p } from "motion/react-client"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password.trim()) {
      setError("Email dan kata sandi wajib diisi.")
      return
    }

    setLoading(true)
    try {
      const res = await login(email.trim(), password)
      localStorage.setItem("hmtika_token", res.data.token)
      localStorage.setItem("hmtika_user", JSON.stringify(res.data.user))
      const user = res.data.user as { role?: string }
      if (user?.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/")
      }
    } catch (err: unknown) {
      const e = err as { message?: string }
      if (e?.message?.includes("401") || e?.message?.includes("400")) {
        setError("Email atau kata sandi salah. Silakan coba lagi.")
      } else {
        setError("Terjadi kesalahan. Silakan coba beberapa saat lagi.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-gold/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-sm space-y-8 relative z-10">
        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center justify-center size-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] mb-2 hover:border-amber-gold/30 transition-colors">
            <span className="text-xl font-bold text-amber-gold">H</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Masuk ke HMTIKA
          </h1>
          <p className="text-sm text-zinc-400">
            Selamat datang kembali. Masuk ke akun anggota Anda.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-100">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="pl-10 h-11 bg-white/[0.04] border-white/[0.08] text-zinc-100 placeholder:text-zinc-500 focus-visible:border-amber-gold/40 focus-visible:ring-amber-gold/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-zinc-100">
                Kata Sandi
              </label>
              <Link
                href="/lupa-password"
                className="text-xs text-zinc-500 hover:text-amber-gold transition-colors"
              >
                Lupa password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="pl-10 pr-10 h-11 bg-white/[0.04] border-white/[0.08] text-zinc-100 placeholder:text-zinc-500 focus-visible:border-amber-gold/40 focus-visible:ring-amber-gold/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-amber-gold text-bg-dark font-semibold hover:bg-amber-gold/90 transition-all disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Memproses...
              </span>
            ) : (
              "Masuk"
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/[0.06]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-bg-dark px-3 text-zinc-600 tracking-wider">atau</span>
          </div>
        </div>

        <p className="text-center text-sm text-zinc-500">
          Belum punya akun?{" "}
          <Link
            href="/daftar"
            className="text-amber-gold hover:text-amber-gold/80 transition-colors font-semibold"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </main>
  )
}