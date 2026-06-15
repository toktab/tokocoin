import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  enabled?: boolean;
};

export function AnimatedNumber({ value, decimals = 0, suffix = "", prefix = "", enabled = true }: Props) {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const fromRef = useRef<number>(value);

  useEffect(() => {
    if (!enabled) {
      setDisplay(value);
      return;
    }
    if (value === display) return;

    const duration = 600;
    fromRef.current = display;
    startRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = fromRef.current + (value - fromRef.current) * eased;
      setDisplay(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, enabled]);

  return (
    <span className="tabular-nums">
      {prefix}{display.toFixed(decimals)}{suffix}
    </span>
  );
}
