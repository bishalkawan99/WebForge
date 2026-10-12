import { useEffect, useRef } from "react";

type Pixel = {
  x: number;
  y: number;
  phase: number;
  color: number;
};

export default function PixelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const root = document.documentElement;
    const pixels: Pixel[] = [];
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let colors = ["#2563eb", "#38bdf8"];
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrame = 0;
    let pixelRatio = 1;

    const updateColors = () => {
      const styles = getComputedStyle(root);
      colors = [
        styles.getPropertyValue("--root-primary").trim() || colors[0],
        styles.getPropertyValue("--root-accent").trim() || colors[1],
      ];
      if (reducedMotion.matches) draw(0);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      pixels.length = 0;
      for (let x = 12; x < width; x += 22) {
        for (let y = 12; y < height; y += 22) {
          pixels.push({
            x,
            y,
            phase: Math.random() * Math.PI * 2,
            color: Math.random() < 0.8 ? 0 : 1,
          });
        }
      }
      if (reducedMotion.matches) draw(0);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      for (const pixel of pixels) {
        const pulse = reducedMotion.matches
          ? 0.2
          : (Math.sin(time * 0.0007 + pixel.phase) + 1) / 2;
        context.globalAlpha = 0.08 + pulse * 0.24;
        context.fillStyle = colors[pixel.color];
        context.fillRect(pixel.x, pixel.y, 1.5, 1.5);
      }
      context.globalAlpha = 1;
    };

    const animate = (time: number) => {
      frame = window.requestAnimationFrame(animate);
      if (time - lastFrame < 1000 / 30) return;
      lastFrame = time;
      draw(time);
    };

    const updateMotion = () => {
      window.cancelAnimationFrame(frame);
      if (reducedMotion.matches) {
        draw(0);
        return;
      }
      frame = window.requestAnimationFrame(animate);
    };

    updateColors();
    resize();
    updateMotion();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const themeObserver = new MutationObserver(updateColors);
    themeObserver.observe(root, { attributes: true, attributeFilter: ["class"] });
    reducedMotion.addEventListener("change", updateMotion);

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      reducedMotion.removeEventListener("change", updateMotion);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />;
}
