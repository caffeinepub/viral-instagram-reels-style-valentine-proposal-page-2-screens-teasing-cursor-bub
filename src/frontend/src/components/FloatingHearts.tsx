import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
  opacity: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate initial hearts
    const initialHearts: Heart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 8 + Math.random() * 8,
      size: 20 + Math.random() * 30,
      delay: Math.random() * 5,
      opacity: 0.1 + Math.random() * 0.3
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animationDuration: `${heart.animationDuration}s`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity
          }}
        >
          💖
        </div>
      ))}
    </div>
  );
}
