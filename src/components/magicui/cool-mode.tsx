import React, { useCallback, useEffect, useRef } from "react";

interface CoolModeProps {
  children: React.ReactNode;
  options?: {
    particleCount?: number;
    particleImage?: string;
    particleSize?: number;
    speed?: number;
  };
}

const colors = [
  "#FF3366", // Pink/Red
  "#20D5D2", // Cyan
  "#F5D547", // Yellow
  "#7B61FF", // Purple
  "#33FF57", // Green
  "#FF9933", // Orange
];

export function CoolMode({ children, options }: CoolModeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<
    {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      rotation: number;
      vRotation: number;
      scale: number;
      element: HTMLImageElement;
    }[]
  >([]);

  const {
    particleCount = 40,
    particleSize = 16,
    speed = 12,
  } = options || {};

  const createParticle = useCallback(
    (x: number, y: number) => {
      const element = document.createElement("div");
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      element.style.position = "fixed";
      element.style.pointerEvents = "none";
      element.style.width = `${Math.random() * (particleSize / 2) + (particleSize / 2)}px`;
      element.style.aspectRatio = "1";
      element.style.borderRadius = "50%";
      element.style.backgroundColor = color;
      element.style.left = "0px";
      element.style.top = "0px";
      element.style.transform = `translate(${x}px, ${y}px)`;
      element.style.zIndex = "9999";
      document.body.appendChild(element);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * speed + speed / 2;
      
      return {
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2, // Slight upward bias
        life: 0,
        maxLife: Math.random() * 30 + 40,
        rotation: Math.random() * 360,
        vRotation: (Math.random() - 0.5) * 10,
        scale: Math.random() * 0.5 + 0.5,
        element,
      };
    },
    [particleSize, speed]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Use e.target to get the actual clicked element (the button) rather than the wrapper
      // This is crucial for elements that are fixed or absolutely positioned
      const target = e.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      for (let i = 0; i < particleCount; i++) {
        particles.current.push(createParticle(x, y));
      }
    },
    [createParticle, particleCount]
  );

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.life++;

        if (p.life >= p.maxLife) {
          p.element.remove();
          particles.current.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // Gravity
        p.rotation += p.vRotation;
        
        // Shrink at the end of life
        const currentScale = p.life > p.maxLife * 0.8 
            ? p.scale * (1 - (p.life - p.maxLife * 0.8) / (p.maxLife * 0.2))
            : p.scale;

        p.element.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg) scale(${currentScale})`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      particles.current.forEach((p) => p.element.remove());
    };
  }, []);

  return (
    <div ref={containerRef} onClick={handleClick} className="inline-block relative">
      {children}
    </div>
  );
}
