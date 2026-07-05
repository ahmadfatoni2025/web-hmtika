"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Pen, Check, X } from "lucide-react"

// ─── Types ───

interface ReasonModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (text: string) => void
  label: string
  placeholder?: string
  submitLabel: string
}

// ─── Reusable Modal ───

function ReasonModal({ open, onClose, onSubmit, label, placeholder, submitLabel }: ReasonModalProps) {
  const [text, setText] = useState("")

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      setText("")
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim())
      onClose()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="w-full max-w-[448px] bg-bg-card rounded-xl shadow-xl p-4 sm:p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-white">{label}</p>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-950 border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-amber-gold/30 resize-none leading-relaxed mb-4 sm:mb-5"
        />
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-3 py-2 h-auto text-sm font-medium flex-1"
          >
            Close
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="px-3 py-2 h-auto text-sm font-medium flex-1"
          >
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─── Step Tracker ───

const STEP_LABELS = ["My items", "Return reason", "Delivery method", "Review", "Confirmation"]

function StepTracker({ activeSteps = 2 }: { activeSteps?: number }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEP_LABELS.map((label, i) => {
        const isActive = i < activeSteps
        return (
          <div key={label} className="flex items-center">
            {i > 0 && (
              <div
                className={cn(
                  "w-8 sm:w-12 h-px",
                  isActive ? "bg-amber-gold" : "bg-white/[0.1]",
                )}
              />
            )}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                  isActive ? "bg-amber-gold text-black" : "bg-white/[0.06] text-zinc-500",
                )}
              >
                {i + 1}
              </div>
              <span
                className={cn(
                  "text-xs hidden sm:inline",
                  isActive ? "text-amber-gold font-medium" : "text-zinc-500",
                )}
              >
                {label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Main Wizard Component ───

export default function ReturnReasonWizard() {
  const [condition, setCondition] = useState("I want to return a sealed item")
  const [reasons, setReasons] = useState(["Defective or Damaged Item", "Incorrect Item Received"])
  const [showConditionModal, setShowConditionModal] = useState(false)
  const [showReasonModal, setShowReasonModal] = useState(false)

  const conditions = [
    "I want to return a sealed item",
    "I want to return a mistaken order",
    "I want to return a functional but unsealed item",
    "I want to return a non-functional but unsealed item",
    "The item was not delivered",
  ]

  const reasonOptions = [
    "Defective or Damaged Item",
    "Incorrect Item Received",
    "Unsatisfactory Quality",
    "Changed Mind/Not as Expected",
    "Misleading Item Information",
  ]

  const toggleReason = (reason: string) => {
    setReasons((prev) =>
      prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason],
    )
  }

  return (
    <section className="w-full py-8 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-[1024px]">
          {/* ─── Header ─── */}
          <div className="text-center mb-8 space-y-4">
            <h1 className="text-2xl font-semibold text-white">Item return form</h1>
            <StepTracker activeSteps={2} />
          </div>

          {/* ─── Step Body ─── */}
          <div className="space-y-6">
            {/* Subtitle */}
            <div>
              <h2 className="text-xl font-semibold text-white">
                2. Select the reason for returning:
              </h2>
              <p className="text-base text-zinc-400 mt-1">
                Choose the condition and reason for your return below.
              </p>
            </div>

            {/* ─── Item Summary Card ─── */}
            <div className="rounded-xl border border-white/[0.08] bg-bg-card shadow-sm overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row md:items-center md:gap-14">
                <div className="flex-1 min-w-0 max-w-[672px]">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <a href="#" className="shrink-0">
                      <img
                        src="https://placehold.co/56x56/1a1a2e/e0e0e0?text=TS"
                        alt="Item"
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    </a>
                    <a
                      href="#"
                      className="text-base font-medium text-white hover:underline truncate"
                    >
                      HMTIKA T-Shirt &mdash; Black, Size L
                    </a>
                  </div>
                </div>
                <div className="shrink-0 space-y-1 mt-4 md:mt-0">
                  <p className="text-sm text-zinc-400">
                    <span className="text-white font-medium">Order Number:</span>{" "}
                    #ORD-HMT-2024-001
                  </p>
                  <p className="text-sm text-zinc-400">
                    <span className="text-white font-medium">Return Term:</span>{" "}
                    30 days after delivery
                  </p>
                </div>
              </div>
            </div>

            {/* ─── Picker Panels ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Condition Panel */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] shadow-sm p-4 md:p-8">
                <div className="space-y-6">
                  <p className="text-base font-medium text-white">
                    What is the condition of the item?
                  </p>
                  <div className="space-y-4">
                    {conditions.map((c) => (
                      <label
                        key={c}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="condition"
                          value={c}
                          checked={condition === c}
                          onChange={(e) => setCondition(e.target.value)}
                          className="sr-only"
                        />
                        <span
                          className={cn(
                            "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                            condition === c
                              ? "border-amber-gold"
                              : "border-white/[0.2] group-hover:border-amber-gold/50",
                          )}
                        >
                          {condition === c && (
                            <span className="w-2 h-2 rounded-full bg-amber-gold" />
                          )}
                        </span>
                        <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                          {c}
                        </span>
                      </label>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowConditionModal(true)}
                    className="px-5 py-[10px] h-auto text-sm font-medium w-full sm:w-auto"
                  >
                    Other condition
                  </Button>
                </div>
              </div>

              {/* Reason Panel */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] shadow-sm p-4 md:p-8">
                <div className="space-y-6">
                  <p className="text-base font-medium text-white">
                    What is the main reason for returning the item?
                  </p>
                  <div className="space-y-4">
                    {reasonOptions.map((r) => (
                      <label
                        key={r}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          value={r}
                          checked={reasons.includes(r)}
                          onChange={() => toggleReason(r)}
                          className="sr-only"
                        />
                        <span
                          className={cn(
                            "w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
                            reasons.includes(r)
                              ? "border-amber-gold bg-amber-gold"
                              : "border-white/[0.2] group-hover:border-amber-gold/50",
                          )}
                        >
                          {reasons.includes(r) && (
                            <Check className="w-3 h-3 text-black" />
                          )}
                        </span>
                        <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                          {r}
                        </span>
                      </label>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowReasonModal(true)}
                    className="px-5 py-[10px] h-auto text-sm font-medium w-full sm:w-auto inline-flex items-center gap-2"
                  >
                    <Pen className="w-4 h-4" />
                    I have another reason
                  </Button>
                </div>
              </div>
            </div>

            {/* ─── Informational Alert ─── */}
            <div className="w-full rounded-xl p-4 bg-amber-gold/5">
              <p className="text-sm sm:text-base text-amber-gold">
                Items must be returned within 30 days of delivery in their
                original packaging. Refunds will be processed within 5&ndash;7
                business days after we receive the item.
              </p>
            </div>

            {/* ─── Actions ─── */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                variant="outline"
                className="px-5 py-[10px] h-auto text-sm font-medium"
              >
                Prev: Choose the item
              </Button>
              <Button
                variant="default"
                className="px-5 py-[10px] h-auto text-sm font-medium"
              >
                Next: Delivery method
              </Button>
            </div>
          </div>

          {/* ─── Modals ─── */}
          <ReasonModal
            open={showConditionModal}
            onClose={() => setShowConditionModal(false)}
            onSubmit={(text) => setCondition(text)}
            label="Describe the condition"
            placeholder="Describe the condition of your item..."
            submitLabel="Add condition"
          />
          <ReasonModal
            open={showReasonModal}
            onClose={() => setShowReasonModal(false)}
            onSubmit={(text) => {
              setReasons((prev) => [...prev, text])
            }}
            label="Describe your reason"
            placeholder="Describe your reason for returning..."
            submitLabel="Add your reason"
          />
        </div>
      </div>
    </section>
  )
}
