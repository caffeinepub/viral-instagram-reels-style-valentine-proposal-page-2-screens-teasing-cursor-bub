interface TeasingMessageProps {
  text: string;
  x: number;
  y: number;
  rotation: number;
}

export default function TeasingMessage({ text, x, y, rotation }: TeasingMessageProps) {
  return (
    <div
      className="pointer-events-none fixed z-50 animate-teasing-bubble rounded-2xl bg-rose-500/95 px-5 py-3 text-sm font-medium text-white shadow-xl backdrop-blur-sm sm:text-base"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`
      }}
    >
      {text}
    </div>
  );
}
