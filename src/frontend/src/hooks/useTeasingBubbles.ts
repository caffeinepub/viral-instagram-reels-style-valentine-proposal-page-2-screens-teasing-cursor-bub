import { useState, useEffect, useCallback, useRef } from 'react';

interface TeasingBubble {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
}

const TEASING_MESSAGES = [
  "Nope, not happening 🙅‍♀️",
  "Still no? Really? 😂",
  "You're testing my patience 😜",
  "You can't escape love 💘",
  "Wait… are you sure? 🥺"
];

const IDLE_TIMEOUT = 3000; // 3 seconds of no interaction
const BUBBLE_DURATION = 2500; // Match animation duration

export function useTeasingBubbles(yesButtonRef: React.RefObject<HTMLButtonElement | null>) {
  const [bubble, setBubble] = useState<TeasingBubble | null>(null);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const bubbleIdRef = useRef(0);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomMessage = () => {
    return TEASING_MESSAGES[Math.floor(Math.random() * TEASING_MESSAGES.length)];
  };

  const getRandomRotation = () => {
    return Math.random() * 20 - 10; // -10 to +10 degrees
  };

  const getSafePosition = (x: number, y: number) => {
    // Get button bounds if available
    if (yesButtonRef.current) {
      const buttonRect = yesButtonRef.current.getBoundingClientRect();
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      const buttonRadius = Math.max(buttonRect.width, buttonRect.height) / 2 + 80; // Add padding

      // Check if position is too close to button
      const distance = Math.sqrt(
        Math.pow(x - buttonCenterX, 2) + Math.pow(y - buttonCenterY, 2)
      );

      if (distance < buttonRadius) {
        // Move bubble away from button
        const angle = Math.atan2(y - buttonCenterY, x - buttonCenterX);
        return {
          x: buttonCenterX + Math.cos(angle) * buttonRadius,
          y: buttonCenterY + Math.sin(angle) * buttonRadius
        };
      }
    }

    // Keep within viewport bounds
    const padding = 100;
    return {
      x: Math.max(padding, Math.min(window.innerWidth - padding, x)),
      y: Math.max(padding, Math.min(window.innerHeight - padding, y))
    };
  };

  const showBubble = useCallback((x: number, y: number) => {
    // Clear any existing bubble
    setBubble(null);

    // Create new bubble after a tiny delay to ensure animation restarts
    setTimeout(() => {
      const safePos = getSafePosition(x, y);
      const newBubble: TeasingBubble = {
        id: ++bubbleIdRef.current,
        text: getRandomMessage(),
        x: safePos.x,
        y: safePos.y,
        rotation: getRandomRotation()
      };
      setBubble(newBubble);

      // Auto-remove after animation completes
      setTimeout(() => {
        setBubble(prev => prev?.id === newBubble.id ? null : prev);
      }, BUBBLE_DURATION);
    }, 50);
  }, [yesButtonRef]);

  // Handle idle detection
  useEffect(() => {
    const checkIdle = () => {
      const now = Date.now();
      if (now - lastInteraction >= IDLE_TIMEOUT) {
        // Show bubble at random position
        const x = Math.random() * (window.innerWidth - 200) + 100;
        const y = Math.random() * (window.innerHeight - 200) + 100;
        showBubble(x, y);
        setLastInteraction(now);
      }
    };

    idleTimerRef.current = setInterval(checkIdle, 1000);

    return () => {
      if (idleTimerRef.current) {
        clearInterval(idleTimerRef.current);
      }
    };
  }, [lastInteraction, showBubble]);

  // Handle clicks/taps outside Yes button
  const handleInteraction = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    setLastInteraction(Date.now());

    // Check if click is on Yes button
    if (yesButtonRef.current && event.target instanceof Node) {
      if (yesButtonRef.current.contains(event.target)) {
        return; // Don't show bubble if clicking Yes button
      }
    }

    // Get position from event
    let x: number, y: number;
    if ('touches' in event && event.touches.length > 0) {
      x = event.touches[0].clientX;
      y = event.touches[0].clientY;
    } else if ('clientX' in event) {
      x = event.clientX;
      y = event.clientY;
    } else {
      return;
    }

    showBubble(x, y);
  }, [yesButtonRef, showBubble]);

  return {
    bubble,
    handleInteraction
  };
}
