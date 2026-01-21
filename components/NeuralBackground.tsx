import React, { useEffect, useRef } from 'react';
import { Particle, MousePosition } from '../types';
import { AI_QUOTES } from '../constants';

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Increased density factor slightly for richer background
      const particleCount = Math.min(160, (canvas.width * canvas.height) / 10000);

      for (let i = 0; i < particleCount; i++) {
        // High chance of text (60%) to ensure "character fragments" are abundant
        const isText = Math.random() > 0.4; 
        const text = isText ? AI_QUOTES[Math.floor(Math.random() * AI_QUOTES.length)] : undefined;

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4, 
          vy: (Math.random() - 0.5) * 0.4, 
          size: isText ? 14 : Math.random() * 2.5 + 1.5, // Slightly larger dots
          isText,
          text,
          // Alpha range: Text is generally brighter
          alpha: isText ? Math.random() * 0.5 + 0.4 : Math.random() * 0.5 + 0.2 
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const interactionRadius = 300; // Radius for mouse interaction

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // 1. Connection to Mouse (Interaction)
        const dxMouse = p1.x - mouseRef.current.x;
        const dyMouse = p1.y - mouseRef.current.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < interactionRadius) { 
           // Calculate opacity based on distance (closer = stronger)
           const opacity = 1 - distMouse / interactionRadius;
           
           // Make lines thicker closer to mouse (Dynamic Line Width)
           ctx.lineWidth = 1.5 * opacity; 
           
           // Add a glow effect to mouse connections
           ctx.shadowBlur = 10 * opacity;
           ctx.shadowColor = "rgba(0, 242, 255, 0.8)";
           
           ctx.strokeStyle = `rgba(0, 242, 255, ${opacity})`;
           ctx.beginPath();
           ctx.moveTo(p1.x, p1.y);
           ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
           ctx.stroke();
           
           // Reset shadow for performance
           ctx.shadowBlur = 0;
        }

        // 2. Connection to Other Particles (The Mesh)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Standard connection distance
          const maxConnectDist = 140;

          if (distance < maxConnectDist) {
            let opacity = (1 - distance / maxConnectDist) * 0.3;
            let lineWidth = 0.5;

            // TRIANGULATION EFFECT:
            // If BOTH particles are close to the mouse, strengthen the link between them.
            // This creates a "web" that lights up around the cursor.
            const dxMouse2 = p2.x - mouseRef.current.x;
            const dyMouse2 = p2.y - mouseRef.current.y;
            const distMouse2 = Math.sqrt(dxMouse2 * dxMouse2 + dyMouse2 * dyMouse2);

            if (distMouse < interactionRadius && distMouse2 < interactionRadius) {
                // Boost opacity and width significantly for these connections
                opacity = Math.min(0.8, opacity * 3); 
                lineWidth = 1.2;
                ctx.strokeStyle = `rgba(189, 0, 255, ${opacity})`; // Violet for local mesh
            } else {
                ctx.strokeStyle = `rgba(100, 116, 139, ${opacity})`; // Standard slate
            }

            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // 3. Draw the Particle itself
        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce
        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

        if (p1.isText && p1.text) {
          // If close to mouse, make text pop
          const isHovered = distMouse < 150;
          
          ctx.font = isHovered ? '700 15px "Inter", sans-serif' : '500 14px "Inter", sans-serif'; 
          ctx.fillStyle = isHovered 
            ? `rgba(255, 255, 255, ${Math.min(1, p1.alpha + 0.4)})` // Bright white on hover
            : `rgba(200, 210, 230, ${p1.alpha})`; 
            
          ctx.fillText(p1.text, p1.x, p1.y);
        } else {
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
          
          // Dots glow when near mouse
          if (distMouse < interactionRadius) {
             ctx.fillStyle = `rgba(0, 242, 255, 0.9)`;
             ctx.shadowBlur = 8;
             ctx.shadowColor = "rgba(0, 242, 255, 0.8)";
          } else {
             ctx.fillStyle = `rgba(0, 242, 255, ${p1.alpha})`;
             ctx.shadowBlur = 0;
          }
          
          ctx.fill();
          ctx.shadowBlur = 0; // Reset
        }
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default NeuralBackground;