import { useState } from 'react';
import QuestionScreen from '../components/QuestionScreen';
import CelebrationScreen from '../components/CelebrationScreen';
import HeartBurst from '../components/HeartBurst';

export default function ValentineScreen() {
  const [accepted, setAccepted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAccept = () => {
    setIsTransitioning(true);
    // Wait for transition animation to complete
    setTimeout(() => {
      setAccepted(true);
      setIsTransitioning(false);
    }, 1500);
  };

  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      {/* Transition overlay with fade and heart burst */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 animate-fade-in bg-gradient-to-br from-pink-100 via-pink-200 to-rose-200">
          <HeartBurst />
        </div>
      )}

      {/* Main content */}
      <div className={isTransitioning ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        {!accepted ? (
          <QuestionScreen onAccept={handleAccept} />
        ) : (
          <CelebrationScreen />
        )}
      </div>
    </div>
  );
}
