import React, { useState } from 'react';
import { TECH_TAGS } from '../constants';

const Hero: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 w-full">
      
      {/* Decorative Gradient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-neon-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <main className="relative max-w-5xl w-full text-center flex flex-col items-center">
        {/* Tech Tags Carousel */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 opacity-60">
           {TECH_TAGS.slice(0, 6).map((tag, i) => (
             <span key={i} className="text-[10px] md:text-xs font-mono tracking-widest text-cyan-200/70 border border-cyan-500/20 px-3 py-1 bg-cyan-900/10 rounded backdrop-blur-sm">
               {tag}
             </span>
           ))}
        </div>

        {/* Logo Section with Cycling Animation */}
        <div className="relative mb-8 cursor-default select-none">
          {/* Back Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-neon-cyan/20 blur-[50px] rounded-full pointer-events-none animate-pulse-slow"></div>
          
          <div className="relative flex items-center justify-center gap-1 md:gap-2">
            {['A', 'O', 'J', 'U'].map((letter, i) => (
              <span 
                key={i}
                className="text-8xl md:text-9xl font-black tracking-tighter animate-text-cycle inline-block"
                style={{ 
                  animationDelay: `${i * 0.15}s`, // Stagger the animation for wave effect
                  color: 'white' 
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Tech decorative lines around logo */}
          <div className="absolute top-0 left-0 w-full h-full border-t border-b border-white/5 scale-x-110 scale-y-125 opacity-30"></div>
        </div>

        {/* Subtitle */}
        <h2 className="text-xl md:text-2xl font-light tracking-[0.6em] text-slate-300 mb-12 font-sans animate-fade-in [animation-delay:200ms] uppercase">
          Artificial Intelligence Frontier
        </h2>

        {/* Glass Card */}
        <div className="glass-panel p-10 md:p-14 rounded-2xl shadow-2xl mx-auto max-w-3xl transform transition-all duration-500 hover:scale-[1.01] hover:border-white/15 animate-fade-in [animation-delay:400ms]">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="text-left flex-1">
              <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">聚万象 · 演奥义</h3>
              <div className="h-1 w-12 bg-neon-cyan mb-5 rounded-full"></div>
              <p className="text-base md:text-lg text-slate-300 leading-relaxed font-light text-justify">
                纳数据之形，穷逻辑之理。 
                <br />
                从感知世界的广度，到认知推理的深度，
                在比特的洪流中，构建通往通用人工智能的实证之路。
              </p>
            </div>

            <div className="flex-shrink-0">
              <button 
                onClick={() => alert('正在初始化神经连接...\nConnecting to Neural Network...')}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative group overflow-hidden px-8 py-4 bg-transparent"
              >
                {/* Button Background & Border */}
                <div className="absolute inset-0 border border-neon-cyan/50 rounded transition-all duration-300 group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"></div>
                
                {/* Animated scan line inside button */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>

                <div className="relative flex items-center gap-3">
                  <span className="font-mono text-sm font-bold tracking-widest text-cyan-50 uppercase">
                    Launch Platform
                  </span>
                  <svg 
                    className={`w-4 h-4 text-neon-cyan transition-transform duration-300 ${hovered ? 'translate-x-1' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          
          {/* Decorative Footer inside Card */}
          <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-mono uppercase tracking-wider">
             <span>System Status: Optimal</span>
             <span className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               Live Connected
             </span>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="fixed bottom-6 left-0 w-full text-center text-[10px] text-slate-600 font-mono tracking-widest pointer-events-none z-0">
        AOJU INTELLIGENCE DIVISION // EST. 2025 // SECURE PROTOCOL
      </footer>
    </div>
  );
};

export default Hero;