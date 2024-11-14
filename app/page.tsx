"use client";

import { useDraw } from "./hooks/useDraw";

export default function Home() {

  const { canvasRef } = useDraw();

  return (
    <div className="min-h-screen w-screen bg-white">
      <canvas
        ref={canvasRef}
        width={750}
        height={750}
        className="border border-black rounded-md"
      />
    </div>
  );
}
