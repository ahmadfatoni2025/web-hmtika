"use client"

import { useRef, KeyboardEvent, ClipboardEvent } from "react"

export default function OtpInput({
  length = 6,
  value,
  onChange,
  disabled,
}: {
  length?: number
  value: string
  onChange: (val: string) => void
  disabled?: boolean
}) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const setVal = (idx: number, char: string) => {
    const chars = value.split("")
    chars[idx] = char
    const next = chars.join("").slice(0, length)
    onChange(next)
    if (char && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus()
    }
  }

  const handleKeyDown = (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
    if (pasted) {
      onChange(pasted)
      const nextFocus = Math.min(pasted.length, length - 1)
      inputsRef.current[nextFocus]?.focus()
    }
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          disabled={disabled}
          onChange={(e) => {
            const char = e.target.value.replace(/\D/g, "").slice(-1)
            setVal(i, char)
          }}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          onFocus={(e) => e.target.select()}
          className={`size-10 sm:size-12 rounded-xl border text-center text-lg font-bold text-white transition-all duration-150 outline-none
            ${value[i]
              ? "border-amber-gold/40 bg-amber-gold/10 shadow-sm shadow-amber-gold/10"
              : "border-white/[0.08] bg-white/[0.04] hover:border-white/20"
            }
            focus:border-amber-gold/50 focus:ring-2 focus:ring-amber-gold/20
            ${disabled ? "opacity-50 pointer-events-none" : ""}
          `}
        />
      ))}
    </div>
  )
}
