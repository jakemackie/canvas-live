"use client";

import { useState, useEffect } from "react";
import { useDraw } from "./hooks/useDraw";
import { ChromePicker } from "react-color";

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
    <div className="min-h-screen w-screen bg-white flex justify-center items-center">
      <div className="flex flex-col gap-10 pr-10">
        {isClient && <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />}
        <button type="button" onClick={clear} className="p-2 rounded-md border border-black">Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={750}
        height={750}
        className="border border-black rounded-md"
      />
    </div>
  );
}
