"use client";

import { useState, useEffect } from "react";
import { useDraw } from "@/app/hooks/useDraw";
import { TwitterPicker } from "react-color";
import Aos from "@/app/ui/aos";

export default function Home() {
  const [color, setColor] = useState("#000");
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function drawLine({ ctx, prevPoint, currentPoint }: Draw) {
    const { x: currentX, y: currentY } = currentPoint;
    const lineWidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  } 

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col justify-center items-center gap-y-3">
      <Aos />

      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={820}
        height={640}
        className="px-3 md:px-0 bg-slate-50 border-2 border-slate-300 rounded-md"
      />

      <div className="flex flex-col" data-aos="fade-down">
        {isClient && <TwitterPicker color={color} onChange={(e) => setColor(e.hex)} />}
        <button type="button" onClick={clear} className="z-10 p-2 rounded-b-md bg-blue-500 text-white outline outline-2 outline-blue-300">Clear</button>
      </div>
    </div>
  );
}
