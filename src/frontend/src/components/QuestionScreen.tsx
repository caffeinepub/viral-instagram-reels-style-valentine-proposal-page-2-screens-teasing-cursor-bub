import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import TeasingMessage from './TeasingMessage';

interface TeasingMessageType {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
}

const teasingMessages = [
  "Nope, not happening 🙅‍♀️",
  "Still no? Really? 😂",
  "You're testing my patience 😜",
  "You can't escape love 💘",
  "Wait… are you sure? 🥺"
];

interface QuestionScreenProps {
  onAccept: () => void;
}

export default function QuestionScreen({ onAccept }: QuestionScreenProps) {
  const [currentMessage, setCurrentMessage] = useState<TeasingMessageType | null>(null);
  const [messageIdCounter, setMessageIdCounter] = useState(0);
  const [lastCursorPos, setLastCursorPos] = useState({ x: 0, y: 0 });
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setLastCursorPos({ x: e.clientX, y: e.clientY });
      resetIdleTimer();
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Idle timer to show teasing message when user hesitates
  const resetIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    idleTimerRef.current = setTimeout(() => {
      showTeasingMessage(lastCursorPos.x || window.innerWidth / 2, lastCursorPos.y || window.innerHeight / 2);
    }, 3000); // Show message after 3 seconds of inactivity
  };

  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [lastCursorPos]);

  const showTeasingMessage = (x: number, y: number) => {
    // Get random message
    const randomMessage = teasingMessages[Math.floor(Math.random() * teasingMessages.length)];
    
    // Random rotation between -15 and 15 degrees
    const randomRotation = Math.random() * 30 - 15;
    
    // Create new message at position
    const newMessage: TeasingMessageType = {
      id: messageIdCounter,
      text: randomMessage,
      x,
      y,
      rotation: randomRotation
    };

    setCurrentMessage(newMessage);
    setMessageIdCounter(prev => prev + 1);

    // Remove message after animation
    setTimeout(() => {
      setCurrentMessage(null);
    }, 2500);
  };

  const handleScreenTap = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the tap was on the button
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }

    // Show teasing message at tap position
    showTeasingMessage(e.clientX, e.clientY);
    
    // Reset idle timer
    resetIdleTimer();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }

    const touch = e.touches[0];
    showTeasingMessage(touch.clientX, touch.clientY);
    resetIdleTimer();
  };

  return (
    <div 
      className="flex min-h-screen flex-col items-center justify-center px-6 py-12"
      onClick={handleScreenTap}
      onTouchStart={handleTouchStart}
    >
      <main className="flex flex-col items-center justify-center text-center">
        <div className="animate-fade-in space-y-8">
          <h1 className="text-4xl font-bold leading-tight text-rose-700 sm:text-5xl md:text-6xl lg:text-7xl">
            ❤️ NANDHANA ❤️
          </h1>
          
          <p className="text-2xl font-medium text-rose-600 sm:text-3xl md:text-4xl">
            Will you be my Valentine? 💖
          </p>

          <div className="pt-8">
            <Button
              onClick={onAccept}
              size="lg"
              className="transform rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-12 py-6 text-xl font-semibold text-white shadow-2xl shadow-pink-500/50 transition-all duration-300 hover:scale-110 hover:from-pink-600 hover:to-rose-600 hover:shadow-pink-500/70 active:scale-95 sm:px-16 sm:py-8 sm:text-2xl"
            >
              Yes! 💕
            </Button>
          </div>
        </div>
      </main>

      <footer className="mt-auto pb-6 text-center text-sm text-rose-500/70">
        © 2025 · Built with ❤️ using{' '}
        <a 
          href="https://caffeine.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:text-rose-600"
        >
          caffeine.ai
        </a>
      </footer>

      {/* Render single teasing message */}
      {currentMessage && (
        <TeasingMessage
          key={currentMessage.id}
          text={currentMessage.text}
          x={currentMessage.x}
          y={currentMessage.y}
          rotation={currentMessage.rotation}
        />
      )}
    </div>
  );
}
