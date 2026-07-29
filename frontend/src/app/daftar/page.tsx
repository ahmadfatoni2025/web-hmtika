"use client"

import { useState } from "react"
import { User, Mail, Lock, Eye, EyeOff, Loader2, GraduationCap, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { register } from "@/lib/api"

const ANGKATAN_OPTIONS = ["2020", "2021", "2022", "2023", "2024", "2025"]
const PRODI_OPTIONS = ["Informatika", "Sistem Informasi", "Teknik Komputer"]

export default function DaftarPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
    angkatan: "",
    prodi: "Informatika",
  })

  function setField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!form.nama.trim() || !form.email.trim() || !form.password || !form.angkatan) {
      setError("Semua field wajib diisi.")
      return
    }
    if (form.password.length < 6) {
      setError("Kata sandi minimal 6 karakter.")
      return
    }
    if (form.password !== form.confirmPassword) {
      setError("Kata sandi dan konfirmasi tidak cocok.")
      return
    }

    setLoading(true)
    try {
      const res = await register({
        nama: form.nama.trim(),
        email: form.email.trim(),
        password: form.password,
        angkatan: form.angkatan,
        prodi: form.prodi,
      })
      if (!res.success || !res.data) {
        setError(res.message || "Pendaftaran gagal")
        return
      }
      localStorage.setItem("hmtika_token", res.data.token)
      localStorage.setItem("hmtika_user", JSON.stringify(res.data.user))
      setSuccess(true)
      setTimeout(() => router.push("/"), 1800)
    } catch {
      setError("Terjadi kesalahan. Silakan coba beberapa saat lagi.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-green-500/10 border border-green-500/20 mb-2">
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="text-xl font-bold text-white">Registrasi Berhasil!</h1>
          <p className="text-sm text-zinc-400">Mengalihkan ke halaman utama...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-gold/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center justify-center size-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] mb-2 hover:border-amber-gold/30 transition-colors">
            <span className="text-xl font-bold text-amber-gold">H</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Daftar Akun HMTIKA
          </h1>
          <p className="text-sm text-zinc-400">
            Bergabunglah sebagai anggota Himpunan Mahasiswa Teknik Informatika.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Nama */}
          <div className="space-y-2">
            <label htmlFor="nama" className="text-sm font-medium text-zinc-100">
              Nama Lengkap
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <Input
                id="nama"
                type="text"
                placeholder="Nama lengkap sesuai KTM"
                value={form.nama}
                onChange={(e) => setField("nama", e.target.value)}
                required
                autoComplete="name"
                className="pl-10 h-11 bg-white/[0.04] border-white/[0.08] text-zinc-100 placeholder:text-zinc-500 focus-visible:border-amber-gold/40 focus-visible:ring-amber-gold/20"
              />
            </div>
          </div>

          {/* Email */}
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
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                required
                autoComplete="email"
                className="pl-10 h-11 bg-white/[0.04] border-white/[0.08] text-zinc-100 placeholder:text-zinc-500 focus-visible:border-amber-gold/40 focus-visible:ring-amber-gold/20"
              />
            </div>
          </div>

          {/* Angkatan + Prodi */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label htmlFor="angkatan" className="text-sm font-medium text-zinc-100">
                Angkatan
              </label>
              <div className="relative">
                <GraduationCap className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                <select
                  id="angkatan"
                  value={form.angkatan}
                  onChange={(e) => setField("angkatan", e.target.value)}
                  required
                  className="w-full pl-10 pr-3 h-11 rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-100 text-sm focus:outline-none focus:border-amber-gold/40 appearance-none"
                >
                  <option value="" disabled className="bg-zinc-900 text-zinc-400">Pilih angkatan</option>
                  {ANGKATAN_OPTIONS.map((a) => (
                    <option key={a} value={a} className="bg-zinc-900">{a}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="prodi" className="text-sm font-medium text-zinc-100">
                Program Studi
              </label>
              <div className="relative">
                <BookOpen className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                <select
                  id="prodi"
                  value={form.prodi}
                  onChange={(e) => setField("prodi", e.target.value)}
                  className="w-full pl-10 pr-3 h-11 rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-100 text-sm focus:outline-none focus:border-amber-gold/40 appearance-none"
                >
                  {PRODI_OPTIONS.map((p) => (
                    <option key={p} value={p} className="bg-zinc-900">{p}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-zinc-100">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimal 6 karakter"
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
                required
                autoComplete="new-password"
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-zinc-100">
              Konfirmasi Kata Sandi
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Ulangi kata sandi"
                value={form.confirmPassword}
                onChange={(e) => setField("confirmPassword", e.target.value)}
                required
                autoComplete="new-password"
                className="pl-10 pr-10 h-11 bg-white/[0.04] border-white/[0.08] text-zinc-100 placeholder:text-zinc-500 focus-visible:border-amber-gold/40 focus-visible:ring-amber-gold/20"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {/* Password match indicator */}
            {form.confirmPassword && (
              <p className={`text-xs ${form.password === form.confirmPassword ? "text-green-400" : "text-red-400"}`}>
                {form.password === form.confirmPassword ? "✓ Kata sandi cocok" : "✗ Kata sandi tidak cocok"}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-amber-gold text-bg-dark font-semibold hover:bg-amber-gold/90 transition-all disabled:opacity-60 mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Mendaftarkan...
              </span>
            ) : (
              "Buat Akun"
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
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-amber-gold hover:text-amber-gold/80 transition-colors font-semibold"
          >
            Masuk sekarang
          </Link>
        </p>
      </div>
    </main>
  )
}
