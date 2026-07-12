"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff, User, GraduationCap, Loader2, ArrowLeft, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Stepper, { Step } from "@/components/ui/Stepper"
import OtpInput from "@/components/ui/OtpInput"
import { register, sendVerificationCode, verifyCode } from "@/lib/api/auth"

type View = "register" | "otp" | "success"

export default function SignUpPage() {
  const router = useRouter()
  const [nama, setNama] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [angkatan, setAngkatan] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [view, setView] = useState<View>("register")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [resendCooldown, setResendCooldown] = useState(0)
  const submitAttempted = useRef(false)

  useEffect(() => {
    if (view === "success") router.replace("/dashboard")
  }, [view, router])

  const handleSubmit = async () => {
    if (submitAttempted.current) return
    submitAttempted.current = true
    setLoading(true)
    setError("")
    try {
      const res = await register({ nama, email, password, angkatan })
      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token)
      }
      router.replace("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Pendaftaran gagal.")
      setLoading(false)
      submitAttempted.current = false
    }
  }

  const handleVerifyOtp = async () => {
    if (otp.length < 6) return
    setLoading(true)
    setError("")
    try {
      const res = await verifyCode(email, otp)
      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token)
      }
      setView("success")
    } catch {
      setError("Kode verifikasi salah.")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendCooldown > 0) return
    setError("")
    try {
      await sendVerificationCode(email)
      startResendTimer()
    } catch {
      setError("Gagal mengirim ulang kode.")
    }
  }

  const startResendTimer = () => {
    setResendCooldown(60)
    const id = setInterval(() => {
      setResendCooldown((p) => {
        if (p <= 1) {
          clearInterval(id)
          return 0
        }
        return p - 1
      })
    }, 1000)
  }

  if (view === "otp") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-8">
          <button
            onClick={() => { setView("register"); setOtp(""); setError("") }}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Kembali
          </button>

          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-amber-gold/10 border border-amber-gold/20 mb-2">
              <Mail className="size-6 text-amber-gold" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Cek Email Anda
            </h1>
            <p className="text-sm text-zinc-400">
              Kami telah mengirim kode verifikasi ke
            </p>
            <p className="text-sm font-medium text-zinc-200">{email}</p>
          </div>

          <div className="space-y-6">
            <OtpInput
              length={6}
              value={otp}
              onChange={setOtp}
              disabled={loading}
            />

            {error && (
              <p className="text-xs text-red-400 text-center">{error}</p>
            )}

            <button
              onClick={handleVerifyOtp}
              disabled={otp.length < 6 || loading}
              className="w-full h-11 rounded-xl bg-amber-gold text-bg-dark font-semibold hover:bg-amber-gold/90 transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              {loading ? "Memverifikasi…" : "Verifikasi"}
            </button>

            <p className="text-center text-xs text-zinc-500">
              Tidak menerima kode?{" "}
              <button
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className="text-amber-gold hover:text-amber-gold-light transition-colors font-medium disabled:text-zinc-600 disabled:pointer-events-none"
              >
                {resendCooldown > 0
                  ? `Kirim ulang (${resendCooldown}s)`
                  : "Kirim ulang"}
              </button>
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-white/[0.04] border border-white/[0.06] mb-2">
            <span className="text-xl font-bold text-amber-gold">H</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Buat Akun Baru</h1>
          <p className="text-sm text-zinc-400">Daftar untuk bergabung dengan HMTIKA.</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
            <AlertCircle className="size-4 text-red-400 shrink-0" />
            <p className="text-xs text-red-400">{error}</p>
          </div>
        )}

        <Stepper
          initialStep={1}
          backButtonText="Kembali"
          nextButtonText={loading ? "Memproses…" : "Daftar"}
          onComplete={handleSubmit}
        >
          <Step>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="nama" className="text-sm font-medium text-zinc-100">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                  <Input
                    id="nama"
                    type="text"
                    placeholder="Nama lengkap Anda"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="pl-10 h-11 bg-white/[0.04] border-white/[0.08] text-zinc-100 placeholder:text-zinc-500 focus-visible:border-amber-gold/30 focus-visible:ring-amber-gold/20"
                  />
                </div>
              </div>
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
                    className="pl-10 h-11 bg-white/[0.04] border-white/[0.08] text-zinc-100 placeholder:text-zinc-500 focus-visible:border-amber-gold/30 focus-visible:ring-amber-gold/20"
                  />
                </div>
              </div>
            </div>
          </Step>

          <Step>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-zinc-100">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11 bg-white/[0.04] border-white/[0.08] text-zinc-100 placeholder:text-zinc-500 focus-visible:border-amber-gold/30 focus-visible:ring-amber-gold/20"
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
              <div className="space-y-2">
                <label htmlFor="angkatan" className="text-sm font-medium text-zinc-100">
                  Angkatan
                </label>
                <div className="relative">
                  <GraduationCap className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                  <Input
                    id="angkatan"
                    type="text"
                    placeholder="Contoh: 2024"
                    value={angkatan}
                    onChange={(e) => setAngkatan(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="pl-10 h-11 bg-white/[0.04] border-white/[0.08] text-zinc-100 placeholder:text-zinc-500 focus-visible:border-amber-gold/30 focus-visible:ring-amber-gold/20"
                  />
                </div>
              </div>
            </div>
          </Step>

          <Step>
            <div className="text-center space-y-4 py-4">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-amber-gold/10 mx-auto">
                <svg className="h-8 w-8 text-amber-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Konfirmasi Pendaftaran</h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Pastikan data Anda sudah benar.
                </p>
              </div>
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-left space-y-2">
                <div className="flex items-center gap-3">
                  <User className="size-3.5 text-zinc-500 shrink-0" />
                  <span className="text-xs text-zinc-300">{nama || "—"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="size-3.5 text-zinc-500 shrink-0" />
                  <span className="text-xs text-zinc-300">{email || "—"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="size-3.5 text-zinc-500 shrink-0" />
                  <span className="text-xs text-zinc-300">Angkatan {angkatan || "—"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="size-3.5 text-zinc-500 shrink-0" />
                  <span className="text-xs text-zinc-300">{"•".repeat(password.length) || "—"}</span>
                </div>
              </div>
            </div>
          </Step>
        </Stepper>

        <p className="text-center text-sm text-zinc-500">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-amber-gold hover:text-amber-gold-light transition-colors font-medium"
          >
            Masuk
          </Link>
        </p>
      </div>
    </main>
  )
}
