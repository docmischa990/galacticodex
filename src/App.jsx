import { useState } from 'react'
import './App.css'
import CharacterList from "./components/CharacterList";
import GalacticBackground from './components/GalacticBackground'
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <GalacticBackground />
      <Header />

      <main className="max-w-6xl mx-auto">
        <CharacterList />
      </main>
    </div>
  );
}

export default App;


