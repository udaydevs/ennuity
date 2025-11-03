'use client'
import React from "react";

import Navbar from "@/components/navbar";
import Image from "next/image";
import { SparklesCore } from "@/components/ui/sparkle";

export default function Page() {
    return (
        <div className="relative w-full  bg-transparent overflow-hidden">
            <Image
                src="https://framerusercontent.com/images/mIs3Fk4rQo6RbnLoVR28wQRzfhg.png"
                alt="Background"
                fill
                className="object-fill h-screen rotate-180 absolute   z-[-1] "
                priority
            />
            <div className="relative z-10 bg-transparent flex flex-col items-center justify-center h-screen text-white text-center px-4">
                <Navbar />
                <section className="flex flex-col items-center justify-center text-center h-[94%] bg-transparent text-white relative overflow-hidden">
                    <div className="mb-4 text-sm text-gray-300 bg-gradient-to-r from-purple-500/30 to-fuchsia-500/30 rounded-full px-4 py-1 border border-purple-400/40 backdrop-blur-sm">
                        Get on the waitlist with 3 million others.
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                        Take Full Control Of Your <br /> Money With Ease
                    </h1>

                    {/* Subtext */}
                    <p className="w-4xl text-xl text-gray-400 mb-8">
                        Track income, manage expenses, and get real time insights <br />
                        to make smarter financial decisions.
                    </p>

                    {/* CTA Button */}
                    <button className="px-6 py-3 rounded-full bg-gradient-to-t from-purple-900 via-fushsia-600 to-fuchsia-400 text-white font-semibold shadow-lg hover:shadow-fuchsia-500/50 transition-transform hover:scale-105">
                        Get Started For Free
                    </button>
                </section>
            </div>
            <Image
                src="https://framerusercontent.com/images/mIs3Fk4rQo6RbnLoVR28wQRzfhg.png"
                alt="Background"
                fill
                className="object-fill h-screen scale-115  -mb-10 absolute z-[-1] "
                priority
            />
            <div className="relative z-10 h-screen bg-transparent flex flex-col items-center justify-center h-screen text-white text-center px-4">
                

   
            </div>
        </div>
    );
}
