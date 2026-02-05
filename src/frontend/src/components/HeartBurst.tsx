import { useEffect, useState } from 'react';

interface BurstHeart {
  id: number;
  angle: number;
  distance: number;
  size: number;
  duration: number;
}

export default function HeartBurst() {
  const [hearts, setHearts] = useState<BurstHeart[]>([]);

  useEffect(() => {
    // Generate burst hearts in a circle pattern
    const burstHearts: BurstHeart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      angle: (i * 360) / 20,
      distance: 150 + Math.random() * 100,
      size: 20 + Math.random() * 20,
      duration: 1 + Math.random() * 0.5
    }));
    setHearts(burstHearts);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      {hearts.map(heart => {
        const radians = (heart.angle * Math.PI) / 180;
        const x = Math.cos(radians) * heart.distance;
        const y = Math.sin(radians) * heart.distance;

        return (
          <div
            key={heart.id}
            className="absolute animate-burst"
            style={{
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.duration}s`,
              '--burst-x': `${x}px`,
              '--burst-y': `${y}px`
            } as React.CSSProperties}
          >
            💖
          </div>
        );
      })}
    </div>
  );
}
