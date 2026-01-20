import { useState } from 'react'
import './App.css'
import CharacterList from "./components/CharacterList";
import GalacticBackground from './components/GalacticBackground'
import Header from './components/Header';
import HudBackground from './components/HudBackground';

function App() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden rounded-4xl opacity-[0.95]">
      <div className="absolute inset-0 z-0 space-bg opacity-[0.30]" />
      <GalacticBackground />
      <HudBackground />
      <div className="relative z-20">
      <Header />

      <main className="max-w-6xl mx-auto">
        <CharacterList />
      </main>
      </div>
    </div>
  );
}

export default App;


