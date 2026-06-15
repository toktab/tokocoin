import confetti from "canvas-confetti";

export const CONFETTI_COLORS = ["#6366F1", "#A855F7", "#00FFFF", "#818CF8"];

export function fireSideCannons() {
  const end = Date.now() + 1500;

  const frame = () => {
    void confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: CONFETTI_COLORS,
    });
    void confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: CONFETTI_COLORS,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}
