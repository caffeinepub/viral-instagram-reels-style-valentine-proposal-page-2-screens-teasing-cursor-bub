import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import TeasingMessage from './TeasingMessage';
import { useTeasingBubbles } from '../hooks/useTeasingBubbles';

interface QuestionScreenProps {
  onAccept: () => void;
}

export default function QuestionScreen({ onAccept }: QuestionScreenProps) {
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const { bubble, handleInteraction } = useTeasingBubbles(yesButtonRef);

  return (
    <div 
      className="flex min-h-screen flex-col items-center justify-center px-6 py-12"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <main className="flex flex-col items-center justify-center text-center">
        <div className="animate-fade-in space-y-8">
          <h1 className="text-4xl font-bold leading-tight text-rose-700 sm:text-5xl md:text-6xl lg:text-7xl">
            ❤️ RHUTHUN❤️
          </h1>
          
          <p className="text-2xl font-medium text-rose-600 sm:text-3xl md:text-4xl">
            Will you be my Valentine? 💖
          </p>

          <div className="flex flex-col items-center gap-4 pt-8">
            <Button
              ref={yesButtonRef}
              onClick={onAccept}
              size="lg"
              className="transform rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-12 py-6 text-xl font-semibold text-white shadow-2xl shadow-pink-500/50 transition-all duration-300 hover:scale-110 hover:from-pink-600 hover:to-rose-600 hover:shadow-pink-500/70 active:scale-95 sm:px-16 sm:py-8 sm:text-2xl"
            >
              Yes! 💕
            </Button>
          </div>
        </div>
      </main>

      {/* Teasing bubble */}
      {bubble && (
        <TeasingMessage
          key={bubble.id}
          text={bubble.text}
          x={bubble.x}
          y={bubble.y}
          rotation={bubble.rotation}
        />
      )}
    </div>
  );
}
