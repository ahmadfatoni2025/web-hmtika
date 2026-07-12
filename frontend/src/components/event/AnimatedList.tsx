"use client"

import { useRef, useState, useEffect, useCallback, memo, ReactNode } from "react"
import { motion, useInView } from "motion/react"
import "./AnimatedList.css"

// ─── Animated Item ─────────────────────────────────────────────────────────
const AnimatedItem = memo(function AnimatedItem({
  children,
  delay = 0,
  index,
  selected,
  onSelect,
}: {
  children: ReactNode
  delay?: number
  index: number
  selected: boolean
  onSelect: (index: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5, once: false })

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={() => onSelect(index)}
      onClick={() => onSelect(index)}
      initial={{ scale: 0.92, opacity: 0, y: 8 }}
      animate={inView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.92, opacity: 0, y: 8 }}
      transition={{ duration: 0.22, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`al-item${selected ? " al-selected" : ""}`}>
        {children}
      </div>
    </motion.div>
  )
})

// ─── AnimatedList ──────────────────────────────────────────────────────────
export interface AnimatedListProps<T> {
  items: T[]
  renderItem: (item: T, index: number, selected: boolean) => ReactNode
  onItemSelect?: (item: T, index: number) => void
  showGradients?: boolean
  enableArrowNavigation?: boolean
  className?: string
  displayScrollbar?: boolean
  initialSelectedIndex?: number
}

export default function AnimatedList<T>({
  items = [],
  renderItem,
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = "",
  displayScrollbar = true,
  initialSelectedIndex = -1,
}: AnimatedListProps<T>) {
  const listRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex)
  const [keyboardNav, setKeyboardNav] = useState(false)
  const [topOpacity, setTopOpacity] = useState(0)
  const [bottomOpacity, setBottomOpacity] = useState(1)

  const handleSelect = useCallback(
    (index: number) => {
      setSelectedIndex(index)
      onItemSelect?.(items[index], index)
    },
    [onItemSelect, items]
  )

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      setTopOpacity(Math.min(scrollTop / 50, 1))
      const bottomDist = scrollHeight - (scrollTop + clientHeight)
      setBottomOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDist / 50, 1))
    })
  }, [])

  useEffect(() => {
    if (!enableArrowNavigation) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault()
        setKeyboardNav(true)
        setSelectedIndex((p) => Math.min(p + 1, items.length - 1))
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault()
        setKeyboardNav(true)
        setSelectedIndex((p) => Math.max(p - 1, 0))
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault()
        onItemSelect?.(items[selectedIndex], selectedIndex)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation])

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return
    const container = listRef.current
    const el = container.querySelector<HTMLElement>(`[data-index="${selectedIndex}"]`)
    if (el) {
      const margin = 48
      const top = el.offsetTop
      const bottom = top + el.offsetHeight
      if (top < container.scrollTop + margin) {
        container.scrollTo({ top: top - margin, behavior: "smooth" })
      } else if (bottom > container.scrollTop + container.clientHeight - margin) {
        container.scrollTo({ top: bottom - container.clientHeight + margin, behavior: "smooth" })
      }
    }
    setKeyboardNav(false)
  }, [selectedIndex, keyboardNav])

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className={`al-container ${className}`}>
      <div
        ref={listRef}
        className={`al-scroll ${!displayScrollbar ? "al-no-scrollbar" : ""}`}
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <AnimatedItem
            key={index}
            delay={index * 0.04}
            index={index}
            selected={selectedIndex === index}
            onSelect={handleSelect}
          >
            {renderItem(item, index, selectedIndex === index)}
          </AnimatedItem>
        ))}
      </div>

      {showGradients && (
        <>
          <div className="al-top-gradient" style={{ opacity: topOpacity }} />
          <div className="al-bottom-gradient" style={{ opacity: bottomOpacity }} />
        </>
      )}
    </div>
  )
}
