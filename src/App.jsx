import { useState } from 'react'
import './index.css'
import CharacterList from "./components/CharacterList";
import GalacticBackground from './components/GalacticBackground'
import Header from './components/Header';
import HudBackground from './components/HudBackground';
import AudioOrb from './components/AudioOrb';
import { useThemeMode } from './utils/useThemeMode';
import ToggleLabel from './components/ToggleLabel';

function App() {
const { isLightMode, toggleTheme } = useThemeMode('dark')

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 dark:bg-black overflow-x-hidden rounded-4xl opacity-[0.95]">
      <div className="absolute inset-0 z-0 space-bg opacity-[0.30]" />
      {/* NOTE - BB8 Toggle */}
      <ToggleLabel />
      {/* NOTE - FTL Background */}
      <GalacticBackground />
      {/* NOTE - HUD Background */}
      <HudBackground />
      {/* NOTE - Audio Orb */}
      <AudioOrb />

      <div className="relative z-20">
        {/* NOTE - Header Text */}
      <Header />
      
      <main className="max-w-6xl mx-auto">
        {/* NOTE - Character Cards */}
        <CharacterList />
      </main>
      </div>
    </div>
  );
}

export default App;


