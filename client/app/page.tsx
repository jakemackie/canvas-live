"use client";

import { useState, useEffect } from "react";
import { useDraw } from "@/app/hooks/useDraw";
import { TwitterPicker } from "react-color";
import { io } from "socket.io-client";
import { drawLine } from "@/utils/drawLine";
import Aos from "@/components/ui/aos";

const socket = io("http://localhost:3001");

export default function Home() {
  const [color, setColor] = useState("#000");
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);
  const [isClient, setIsClient] = useState(false);

  type DrawLineProps = {
    prevPoint: Point | null;
    currentPoint: Point;
    color: string;
  }

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    socket.emit("client-ready");

    socket.on("get-canvas-state", () => {
      if(!canvasRef.current?.toDataURL()) return;
      socket.emit("canvas-state", canvasRef.current.toDataURL());
    });

    socket.on("canvas-state-from-server", (state: string) => {
      const img = new Image();
      img.src = state;
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      }
    });

    socket.on("draw-line", ({ prevPoint, currentPoint, color }: DrawLineProps) => {
      if(!ctx) return;
      drawLine({ prevPoint, currentPoint, ctx, color });
    });

    socket.on("clear", clear);

    setIsClient(true);

    return () => {
      socket.off("get-canvas-state");
      socket.off("canvas-state-from-server");
      socket.off("draw-line");
      socket.off("clear");
    }
  }, [canvasRef]);

  function createLine({prevPoint, currentPoint, ctx}: Draw) {
    socket.emit("draw-line", ({ prevPoint, currentPoint, color }));
    drawLine({ prevPoint, currentPoint, ctx, color })
  }

  return (
    <div className="overflow-hidden px-4 min-h-screen w-screen bg-white flex flex-col justify-center items-center gap-y-3">
      <Aos />

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
          onClick={() => socket.emit("clear")}
          className="z-10 p-2 rounded-b-md bg-blue-500 text-white outline outline-2 focus:outline-4 outline-blue-300 hover:bg-red-500 hover:outline-red-300 transition-colors duration-300"
        >
            Clear
          </button>
      </div>
    </div>
  );
}
