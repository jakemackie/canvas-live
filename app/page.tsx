"use client";

import { useState, useEffect } from "react";
import { useDraw } from "@/app/hooks/useDraw";
import { TwitterPicker } from "react-color";
import Aos from "@/components/ui/aos";

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
    <div className="!overflow-x-hidden px-4 min-h-screen w-screen bg-white flex flex-col justify-center items-center gap-y-3">
      <Aos />

      <div className="mx-auto md:max-w-lg flex flex-col justify-start">
        <h1 className="mb-4    text-4xl md:text-6xl font-bold leading-normal bg-clip-text text-transparent bg-gradient-to-b from-black to-slate-600" data-aos="zoom-out">
          Hiyield Gamejam
        </h1>
        <span 
          className="mb-4 text-2xl leading-normal"
          data-aos="fade-right"
          data-aos-delay="300"  
        >
          by Jake
        </span>
      </div>

      <div className="z-10 relative px-3 md:px-0">
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          width={820}
          height={640}
          className="relative z-20 bg-slate-50 border-2 border-slate-300 rounded-md"
        />
        <div className="-z-50 absolute top-0 left-0 size-96 bg-blue-300 rounded-full filter blur-3xl opacity-9"></div>
        <div className="-z-50 absolute bottom-0 left-0 size-96 bg-purple-300 rounded-full filter blur-3xl opacity-9"></div>

        <div className="-z-50 absolute top-0 right-0 size-96 bg-orange-300 rounded-full filter blur-3xl opacity-9"></div>
        <div className="-z-50 absolute bottom-0 right-0 size-96 bg-red-300 rounded-full filter blur-3xl opacity-9"></div>
      </div>

      <div className="flex flex-col" data-aos="fade-up" data-aos-delay="300">
        {isClient && <TwitterPicker color={color} onChange={(e) => setColor(e.hex)} />}
        <button 
          type="button" 
          onClick={clear} 
          className="z-10 p-2 rounded-b-md bg-blue-500 text-white outline outline-2 focus:outline-4 outline-blue-300 hover:bg-red-500 hover:outline-red-300 transition-colors duration-300"
        >
            Clear
          </button>
      </div>
    </div>
  );
}
