"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export function Background() {
  return (
      <div className="absolute bg-black top-0 left-0 w-full h-full overflow-hidden">
          {/* Beams and spotlight */}
          <BackgroundBeamsWithCollision className="bg-black">
              <Spotlight />
          </BackgroundBeamsWithCollision>

          {/* Bottom glow shapes */}
          {/* <div className="absolute bottom-0 w-full h-10">
              <div className="absolute bottom-0 w-full h-full rounded-t-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-70"></div>
              <div className="absolute bottom-0 w-full h-full rounded-t-full bg-purple-600 opacity-50 blur-[5px]"></div>
              <div className="absolute bottom-0 w-full h-full rounded-t-full bg-purple-400 opacity-30 blur-[7px]"></div>
          </div> */}
      </div>
  );
}
