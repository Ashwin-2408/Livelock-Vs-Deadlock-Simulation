import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

const SpinlockLivelockSimulation = () => {
  const steps = [
    {
      worker: "Checking if monitor is active...",
      monitor: "Checking if work is done...",
      text: "🔵 Step 1: Both Worker and Monitor are active.",
      action: "checking",
    },
    {
      worker: "Monitor is active, backing off...",
      monitor: "Still checking...",
      text: "⚠️ Step 2: Worker backs off due to monitor.",
      action: "backingOff",
    },
    {
      worker: "Trying again to work...",
      monitor: "Monitor is about to check again...",
      text: "🔴 Step 3: Worker attempts again but fails.",
      action: "retrying",
    },
    {
      worker: "Monitor is active, backing off...",
      monitor: "Still checking...",
      text: "⏳ Step 4: The cycle continues without progress.",
      action: "backingOff",
    },
    {
      worker: "Checking if monitor is active...",
      monitor: "Checking if work is done...",
      text: "⏳ Step 5: Livelock repeats endlessly.",
      action: "checking",
    },
  ];

  const [step, setStep] = useState(0);
  const [delayedStep, setDelayedStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [step, steps.length]);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDelayedStep(step);
    }, 2000);
    return () => clearTimeout(delayTimer);
  }, [step]);

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-2xl font-bold text-red-400">
        Spinlock Livelock Simulation
      </h2>

      {/* Explanation Text */}
      <motion.div
        key={steps[step].text}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
        className="text-lg text-gray-300 p-4 border border-gray-600 rounded-lg bg-gray-800 w-full max-w-lg text-center"
      >
        {steps[step].text}
      </motion.div>

      {/* Worker & Monitor Section */}
      <div className="flex justify-between w-full max-w-lg">
        {/* Worker */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-2">
            <span className="text-2xl">👷‍♂️</span>
          </div>
          <span className="text-blue-400 font-semibold">Worker</span>
          <motion.div
            key={steps[delayedStep].worker}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-2 bg-blue-900 p-3 rounded-lg w-40 min-h-[80px] text-center flex items-center justify-center"
          >
            {steps[delayedStep].worker}
          </motion.div>
        </div>

        {/* Middle Animation */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-yellow-400 mb-2"
          >
            <RefreshCw size={24} />
          </motion.div>
          <div className="w-16 h-16 bg-yellow-600 rounded-lg flex items-center justify-center">
            <span className="text-xl">⚙️</span>
          </div>
          <span className="text-yellow-400 text-sm mt-1">Task</span>
        </div>

        {/* Monitor */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-2">
            <span className="text-2xl">🕵️‍♂️</span>
          </div>
          <span className="text-green-400 font-semibold">Monitor</span>
          <motion.div
            key={steps[delayedStep].monitor}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-2 bg-green-900 p-3 rounded-lg w-40 min-h-[80px] text-center flex items-center justify-center"
          >
            {steps[delayedStep].monitor}
          </motion.div>
        </div>
      </div>

      {/* Auto-Step Indicator */}
      <div className="text-sm text-gray-400">
        Step {delayedStep + 1} / {steps.length}
      </div>
    </div>
  );
};

export default SpinlockLivelockSimulation;