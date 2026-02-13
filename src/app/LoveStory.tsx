"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// --- Sub-Components ---

const FloatingHeart = ({ delay = 0 }) => {
  const [leftPos, setLeftPos] = useState<string | null>(null);

  useEffect(() => {
    setLeftPos(`${Math.random() * 100}%`);
  }, []);

  if (!leftPos) return null;

  return (
    <motion.div
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ y: "-10vh", opacity: [0, 1, 0] }}
      transition={{ duration: 10, repeat: Infinity, delay, ease: "linear" }}
      className="fixed text-rose-200 pointer-events-none z-0 text-2xl"
      style={{ left: leftPos }}
    >
      ♥
    </motion.div>
  );
};

interface TimelineItemProps {
  src: string;
  date: string;
  caption: string;
  index: number;
}

const TimelineItem = ({ src, date, caption, index }: TimelineItemProps) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between w-full mb-16 md:mb-24">
      <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 bg-rose-500 rounded-full border-4 border-white shadow-sm z-10" />

      <motion.div
        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={`order-1 md:w-[45%] flex ${
          isEven ? "md:justify-end" : "md:justify-start md:order-last"
        } mb-4 md:mb-0`}
      >
        <div
          className={`bg-white px-4 py-2 rounded-full shadow-sm border border-rose-100 text-rose-500 font-bold text-sm tracking-widest uppercase ${
            isEven ? "md:mr-8" : "md:ml-8"
          }`}
        >
          {date}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50, rotate: isEven ? -2 : 2 }}
        whileInView={{ opacity: 1, y: 0, rotate: isEven ? -2 : 2 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, type: "spring" }}
        className={`order-2 md:w-[45%] ${
          isEven ? "md:order-last" : "md:order-first"
        }`}
      >
        <div className="bg-white p-3 pb-8 shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500 border border-slate-100 max-w-75 mx-auto relative group">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-rose-100/50 -rotate-1" />
          <div className="relative aspect-square bg-slate-100 mb-4 overflow-hidden">
            <Image
              src={src}
              alt={caption}
              fill
              className="object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <p className="font-handwriting text-2xl text-center text-slate-800">
            {caption}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Page ---

export default function ValentineJourneySafe() {
  const [step, setStep] = useState(1);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    setNoPos({
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
    });
  };

  const timelineData = [
    {
      src: "/pic1.jpeg",
      date: "16 Dec, 2025",
      caption: "The First Meet Up ☕️",
    },
    { src: "/pic2.jpeg", date: "10 Jan, 2026", caption: "Our first cosy pic" },
    {
      src: "/pic3.jpeg",
      date: "15 Jan, 2026",
      caption: "Our first gold reef date",
    },
    {
      src: "/pic4.jpeg",
      date: "24 Jan, 2026",
      caption: "My favourite picture of you.",
    },
    { src: "/pic5.jpeg", date: "7 Feb, 2026", caption: "our first RYC absa" },
    { src: "/pic6.jpeg", date: "8 Feb, 2026", caption: "Sleeping beauty" },
  ];

  return (
    <div className="min-h-screen bg-[#fcfafb] text-slate-900 overflow-x-hidden font-sans selection:bg-rose-200 bg-[radial-gradient(#ffe4e6_1px,transparent_1px)] bg-size-[20px_20px]">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@400;600&display=swap");
        .font-handwriting {
          font-family: "Dancing Script", cursive;
        }
        .font-serif {
          font-family: "Playfair Display", serif;
        }
      `}</style>

      {[...Array(10)].map((_, i) => (
        <FloatingHeart key={i} delay={i * 1.5} />
      ))}

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.section
            key="ask"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex items-center justify-center p-4 relative z-20"
          >
            <div className="w-full max-w-105 bg-white rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden border border-rose-50 flex flex-col">
              <div className="relative h-32 bg-[#fff1f3] flex justify-center items-end">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffccd5_1px,transparent_1px)] bg-size-[15px_15px] opacity-20" />
                <div className="relative translate-y-1/2">
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-rose-100 relative">
                    <Image
                      src="/pic4.jpeg"
                      alt="Snow"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                    <div className="bg-rose-500 rounded-full p-1 leading-none text-white text-[10px]">
                      ♥
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-16 pb-10 px-8 text-center flex flex-col items-center">
                <span className="text-[10px] font-bold text-rose-400 tracking-[0.2em] uppercase mb-2">
                  A special message for you
                </span>
                <h1 className="text-3xl font-serif font-bold text-slate-800 leading-tight">
                  Happy Valentine's Day, <br />
                  <span className="text-rose-500 italic">Snow</span>
                </h1>
                <div className="my-4 flex items-center justify-center gap-3">
                  <div className="h-px w-8 bg-rose-100" />
                  <span className="text-rose-300 text-xs">♥</span>
                  <div className="h-px w-8 bg-rose-100" />
                </div>

                <div className="text-sm text-slate-500 leading-relaxed space-y-4 mb-10 max-w-75">
                  <p className="font-semibold text-slate-800">
                    Winnie Masoabela “Snow“
                  </p>
                  <p>
                    It’s Friday the 13th. A very unlucky day for most but not
                    for you. Why? Because I love you.
                  </p>
                  <p>
                    Since the first day we spoke, I sensed your calm and gentle
                    nature. We first met on Human Rights day and there and then
                    I knew you were the right human for me. 🥺
                  </p>
                  <p>Would you do me the honour of being my Valentine?</p>
                  <p className="font-bold text-rose-500 text-base">
                    Skhumba ❤️
                  </p>
                </div>

                <div className="w-full space-y-4 relative flex flex-col items-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-rose-200 hover:bg-rose-600 transition-colors"
                  >
                    YES! ❤️
                  </motion.button>
                  <motion.button
                    animate={{ x: noPos.x, y: noPos.y }}
                    onMouseEnter={moveNoButton}
                    onTouchStart={moveNoButton}
                    className="text-slate-300 text-xs font-medium hover:text-slate-400 transition-colors cursor-default"
                  >
                    No, maybe later
                  </motion.button>
                </div>
              </div>

              <div className="bg-slate-50/50 p-6 border-t border-slate-50 flex flex-col items-center">
                <p className="text-[9px] text-slate-400 uppercase tracking-widest mb-4">
                  A journey waiting for you...
                </p>
                <div className="flex gap-3 mb-2">
                  {timelineData.slice(0, 3).map((item, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-xl bg-slate-200 overflow-hidden border-2 border-white shadow-sm relative"
                    >
                      <Image
                        src={item.src}
                        alt="thumb"
                        fill
                        className="object-cover grayscale-50"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[9px] font-bold text-rose-300 uppercase tracking-tighter mt-2 animate-pulse">
                  Say Yes to unlock our story
                </p>
              </div>
            </div>
          </motion.section>
        ) : (
          /* PAGE 2: THE JOURNEY */
          <motion.section
            key="journey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 px-4"
          >
            <div className="text-center mb-20">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-block bg-rose-100 text-rose-600 px-4 py-1 rounded-full text-xs font-bold tracking-wider mb-4"
              >
                OUR MEMORIES
              </motion.div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-serif font-bold text-slate-800 mb-4"
              >
                Our <span className="text-rose-500 italic">Story</span>
              </motion.h1>
              <p className="text-slate-500 max-w-md mx-auto">
                Every moment somehow led us here. Here’s to the beautiful chaos
                of getting to know you.
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-rose-200 -translate-x-1/2 border-l-2 border-dashed border-rose-300" />
              <div className="pl-12 md:pl-0 pt-10 pb-20">
                {timelineData.map((item, idx) => (
                  <TimelineItem key={idx} {...item} index={idx} />
                ))}
              </div>
            </div>

            {/* CONCLUSION SECTION */}
            <div className="max-w-xl mx-auto mt-20">
              <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-rose-50 text-center">
                <h2 className="text-3xl font-serif font-bold text-slate-800 mb-10 underline decoration-rose-200 underline-offset-8">
                  Our Stats 📈
                </h2>

                <div className="grid grid-cols-1 gap-6 text-left mb-12">
                  <div className="flex justify-between items-center p-4 bg-rose-50/50 rounded-2xl">
                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      Forever & Always
                    </span>
                    <span className="text-xl font-bold text-rose-600 animate-pulse">
                      loading...
                    </span>
                  </div>
                  <div className="p-6 bg-linear-to-br from-rose-50 to-white rounded-2xl border border-rose-100 text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">
                      Times I’ve been grateful for our first meet-up
                    </p>
                    <span className="text-5xl font-handwriting text-rose-500">
                      Infinite ✨
                    </span>
                  </div>
                </div>

                <div className="relative h-24 flex flex-col items-center justify-center">
                  <motion.div
                    key="final-note"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-4"
                  >
                    <p className="text-2xl font-serif font-bold text-rose-600 leading-tight">
                      I really like what we’re building <br /> more than words
                      can explain.
                    </p>
                    <p className="text-xl font-handwriting text-slate-500 italic">
                      Slowly but surely, Snow ❤️
                    </p>
                  </motion.div>
                </div>
              </div>

              <footer className="mt-20 text-center text-slate-300 font-serif italic pb-12">
                Skhumba — February 14, 2026
              </footer>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
