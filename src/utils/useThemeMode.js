import { useEffect, useState } from 'react'

/**
 * useThemeMode(defaultMode = 'dark', options = { target: 'html', persist: true })
 *
 * - defaultMode: 'dark' or 'light' initial fallback if no persisted value and DOM has no class.
 * - options.target: 'html' or 'body' — where to toggle the .dark class.
 * - options.persist: whether to save the user preference to localStorage.
 */
export function useThemeMode(defaultMode = 'dark', options = {}) {
  const { target = 'html', persist = true } = options

  const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'

  // initial state (safe on SSR)
  const [isLightMode, setIsLightMode] = useState(() => {
    if (!isClient) return defaultMode !== 'dark' // SSR-safe fallback

    // 1) persisted preference
    try {
      const saved = localStorage.getItem('theme-mode')
      if (saved === 'light') return true
      if (saved === 'dark') return false
    } catch (e) {
      // localStorage may be blocked — ignore
    }

    // 2) DOM detection (if html/body already has .dark)
    const root = document.documentElement
    const domHasDark = root.classList.contains('dark')
    if (domHasDark) return false

    // 3) fallback to defaultMode
    return defaultMode !== 'dark'
  })

  useEffect(() => {
    if (!isClient) return
    const root = target === 'body' ? document.body : document.documentElement

    if (isLightMode) {
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }

    if (persist) {
      try {
        localStorage.setItem('theme-mode', isLightMode ? 'light' : 'dark')
      } catch (e) {
        // ignore storage errors
      }
    }
  }, [isLightMode, target, persist, isClient])

  return {
    isLightMode,
    toggleTheme: () => setIsLightMode(prev => !prev),
    setLightMode: () => setIsLightMode(true),
    setDarkMode: () => setIsLightMode(false),
  }
}
