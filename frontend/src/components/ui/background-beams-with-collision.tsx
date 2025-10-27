"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type BeamOptions = {
  initialX?: number;
  translateX?: number;
  initialY?: number;
  translateY?: number;
  rotate?: number;
  className?: string;
  duration?: number;
  delay?: number;
  repeatDelay?: number;
};

type Collision = {
  detected: boolean;
  coordinates: { x: number; y: number } | null;
};

export const BackgroundBeamsWithCollision: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

const beams: BeamOptions[] = [
  { initialX: 0, translateX: 0, duration: 8, repeatDelay: 3, delay: 0, className: 'h-20' },
  { initialX: 200, translateX: 200, duration: 6, repeatDelay: 4, delay: 1, className: 'h-16' },
  { initialX: 400, translateX: 400, duration: 7, repeatDelay: 5, delay: 2, className: 'h-18' },
  { initialX: 600, translateX: 600, duration: 9, repeatDelay: 2, delay: 0, className: 'h-14' },
  { initialX: 800, translateX: 800, duration: 5, repeatDelay: 6, delay: 1, className: 'h-22' },
  { initialX: 1000, translateX: 1000, duration: 8, repeatDelay: 3, delay: 3, className: 'h-16' },
  { initialX: 1200, translateX: 1200, duration: 7, repeatDelay: 4, delay: 2, className: 'h-24' },
  { initialX: 1400, translateX: 1400, duration: 10, repeatDelay: 5, delay: 1, className: 'h-16' },
  { initialX: 1600, translateX: 1600, duration: 6, repeatDelay: 2, delay: 0, className: 'h-20' },
  { initialX: 1800, translateX: 1800, duration: 9, repeatDelay: 3, delay: 2, className: 'h-18' },
  { initialX: 2000, translateX: 2000, duration: 8, repeatDelay: 4, delay: 1, className: 'h-16' },
  { initialX: 2200, translateX: 2200, duration: 7, repeatDelay: 2, delay: 0, className: 'h-22' },
  { initialX: 2400, translateX: 2400, duration: 6, repeatDelay: 5, delay: 3, className: 'h-24' },
  { initialX: 2600, translateX: 2600, duration: 8, repeatDelay: 3, delay: 2, className: 'h-18' },
];


  return (
    <div
      ref={parentRef}
      className={cn(
        "h-96 md:h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex items-center w-full justify-center overflow-hidden",
        className
      )}
    >
      {beams.map((beam, idx) => (
        <CollisionMechanism
          key={`beam-${idx}`}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {children}

      <div
        ref={containerRef}
        className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      />
    </div>
  );
};

const CollisionMechanism: React.FC<{
  containerRef: React.RefObject<HTMLDivElement>;
  parentRef: React.RefObject<HTMLDivElement>;
  beamOptions?: BeamOptions;
}> = ({ containerRef, parentRef, beamOptions = {} }) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<Collision>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  // ✅ Collision detection
  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: { x: relativeX, y: relativeY },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const interval = setInterval(checkCollision, 50);
    return () => clearInterval(interval);
  }, [cycleCollisionDetected, containerRef]);

  // ✅ Reset collision & trigger new cycle
  useEffect(() => {
    if (collision.detected) {
      const timeout = setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
        setBeamKey((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        initial={{
          y: beamOptions.initialY ?? -200,
          x: beamOptions.initialX ?? 0,
          rotate: beamOptions.rotate ?? 0,
        }}
        animate={{
          y: beamOptions.translateY ?? 1800,
          x: beamOptions.translateX ?? 0,
          rotate: beamOptions.rotate ?? 0,
        }}
        transition={{
          duration: beamOptions.duration ?? 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay ?? 0,
          repeatDelay: beamOptions.repeatDelay ?? 0,
        }}
        className={cn(
          "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent shadow-[0_0_20px_rgba(147,51,234,0.5)]",
          beamOptions.className
        )}
      />

      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}-${beamKey}`}
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Explosion: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: 0,
    y: 0,
    dx: Math.floor(Math.random() * 80 - 40),
    dy: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      {/* Central flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      />
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: p.x, y: p.y, opacity: 1 }}
          animate={{ x: p.dx, y: p.dy, opacity: 0 }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
        />
      ))}
    </div>
  );
};
