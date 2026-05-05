"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMockData } from "@/context/MockDataContext";

const STEPS = [
  "Mapping your interests...",
  "Identifying your strengths...",
  "Matching career patterns...",
  "Personalizing recommendations..."
];

export default function ProcessingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const { updateStudent, currentUserId } = useMockData();

  useEffect(() => {
    // Step sequence
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1500);

    // Final redirection and update mock state
    const timeout = setTimeout(() => {
      updateStudent(currentUserId, { careerType: "The Problem Solver" });
      router.push("/student/career-discovery/results");
    }, 6500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router, updateStudent, currentUserId]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative overflow-hidden bg-white">
      
      {/* Subtle pulsing background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#F7F6F3_0%,_transparent_50%)]"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Rotating Sparkles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 mb-8 flex items-center justify-center text-[#111111]"
        >
          <Sparkles size={48} strokeWidth={1} />
        </motion.div>

        <h1 className="font-instrument text-[28px] md:text-[36px] mb-8 text-[#111111]">
          Analyzing your responses...
        </h1>

        {/* Fading text steps */}
        <div className="h-8 relative w-full flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="absolute font-inter text-[16px] text-[#666666]"
            >
              {STEPS[currentStep]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
    </div>
  );
}
