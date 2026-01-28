import { useState, useRef } from 'react'
import BB8Toggle from './BB8Toggle'
import { useThemeMode } from '../utils/useThemeMode'

export default function ToggleLabel() {
  const { isLightMode, toggleTheme } = useThemeMode('dark')
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef(null)

  const handleToggle = () => {
    toggleTheme()
    setVisible(true)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setVisible(false)
    }, 5000)
  }

  return (
    <div className="fixed top-4 right-6 flex flex-col items-center gap-0.5 scale-50">
      <BB8Toggle
        checked={!isLightMode}
        onChange={handleToggle}
      />

      <span
        className={`
          font-monomaniac text-3xl
          text-yellow-400 dark:text-[#fd1b0a]
          transition-opacity duration-5000 ease-out
          ${visible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {isLightMode ? 'Welcome to the light side' : 'Welcome to the dark side'}
      </span>
    </div>
  )
}
