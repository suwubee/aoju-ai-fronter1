import React from 'react';
import NeuralBackground from './components/NeuralBackground';
import Hero from './components/Hero';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-ai-dark text-slate-200 overflow-hidden selection:bg-neon-cyan/30 selection:text-white">
      {/* Background Layer: Z-0 */}
      <div className="fixed inset-0 z-0">
         {/* Deep Gradient overlay for depth */}
         <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0f172a] to-[#1e1b4b] opacity-90" />
         <NeuralBackground />
         {/* Vignette */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-60 pointer-events-none" />
      </div>

      {/* Content Layer: Z-10+ */}
      <Hero />
    </div>
  );
};

export default App;