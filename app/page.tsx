"use client";

import { useDraw } from "./hooks/useDraw";

export default function Home() {

  const { canvasRef, onMouseDown } = useDraw(drawLine);

  function drawLine({ ctx, prevPoint, currentPoint }: Draw) {
    const { x: currentX, y: currentY } = currentPoint;
    const lineColor = "#000"; // black
    const lineWidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  } 

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-white">
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
