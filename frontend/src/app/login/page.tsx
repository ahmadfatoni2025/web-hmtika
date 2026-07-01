"use client"

import { useState } from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-white/[0.04] border border-white/[0.06] mb-2">
            <span className="text-xl font-bold text-amber-gold">H</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Masuk
          </h1>
          <p className="text-sm text-zinc-400">
            Selamat datang kembali. Masuk ke akun HMTIKA Anda.
          </p>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-100">
              Email atau Username
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <Input
                id="email"
                type="text"
                placeholder="nama@email.com"
                className="pl-10 h-11 bg-white/[0.04] border-white/[0.08] text-zinc-100 placeholder:text-zinc-500 focus-visible:border-amber-gold/30 focus-visible:ring-amber-gold/20"
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

          <Button
            type="submit"
            className="w-full h-11 rounded-xl bg-amber-gold text-bg-dark font-semibold hover:bg-amber-gold/90 transition-all"
          >
            Masuk
          </Button>
        </form>

        <p className="text-center text-sm text-zinc-500">
          Belum punya akun?{" "}
          <Link
            href="/daftar"
            className="text-amber-gold hover:text-amber-gold-light transition-colors font-medium"
          >
            Daftar
          </Link>
        </p>
      </div>
    </main>
  )
}