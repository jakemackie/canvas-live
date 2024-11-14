import { useEffect, useRef } from "react";

export const useDraw = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // console.log({ x: e.clientX, y: e.clientY });
    };

    // Add event listeners
    canvasRef.current?.addEventListener("mousemove", handler);

    // Remove event listeners
    return () => canvasRef.current?.addEventListener("mousemove", handler);
  }, []);

  return { canvasRef };
};