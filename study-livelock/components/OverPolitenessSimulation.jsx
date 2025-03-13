import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react"; // Icon for spinning effect

const OverPolitenessSimulation = () => {
  const steps = [
    {
      worker1: "I should start the task",
      worker2: "I should start the task",
      text: "🔵 Step 1: Both workers are ready to start the shared task.",
      action: "thinking",
    },
    {
      worker1: "You go ahead",
      worker2: "No, you go ahead",
      text: "⚠️ Step 2: Workers notice each other and politely defer.",
      action: "deferring",
    },
    {
      worker1: "I insist, you start",
      worker2: "I couldn't possibly, you start",
      text: "🔴 Step 3: Both workers continue being overly polite.",
      action: "insisting",
    },
    {
      worker1: "After you, please",
      worker2: "No, after you, I insist",
      text: "⏳ Step 4: The politeness cycle continues, preventing work.",
      action: "deferring",
    },
    {
      worker1: "I should start the task",
      worker2: "I should start the task",
      text: "⏳ Step 5: Both workers try again, but will repeat the cycle.",
      action: "thinking",
    },
  ];

  const [step, setStep] = useState(0);
  const [delayedStep, setDelayedStep] = useState(0);

  // Change text immediately every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [step]);

  // Delay worker updates by 2 seconds after text changes
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDelayedStep(step);
    }, 2000);
    return () => clearTimeout(delayTimer);
  }, [step]);

  // Animation for worker bubbles
  const getAnimation = (action) => {
    switch (action) {
      case "thinking":
        return {
          scale: [1, 1.05, 1],
          transition: { repeat: Infinity, duration: 2 },
        };
      case "deferring":
        return {
          x: [0, -10, 0],
          transition: { repeat: Infinity, duration: 1.5 },
        };
      case "insisting":
        return { y: [0, -5, 0], transition: { repeat: Infinity, duration: 1 } };
      default:
        return {};
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-2xl font-bold text-blue-400">
        Over-Politeness Livelock Simulation
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

      {/* Workers Section */}
      <div className="flex justify-between w-full max-w-lg">
        {/* Worker 1 */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-2">
            <span className="text-2xl">👨‍💼</span>
          </div>
          <span className="text-blue-400 font-semibold">Worker 1</span>
          <motion.div
            key={steps[delayedStep].worker1}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              ...getAnimation(steps[delayedStep].action),
            }}
            className="mt-2 bg-blue-900 p-3 rounded-lg w-40 min-h-[80px] text-center flex items-center justify-center"
          >
            {steps[delayedStep].worker1}
          </motion.div>
        </div>

        {/* Middle Animation */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            animate={{
              rotate: steps[delayedStep].action !== "thinking" ? 360 : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="text-yellow-400 mb-2"
          >
            <RefreshCw size={24} />
          </motion.div>
          <div className="w-16 h-16 bg-yellow-600 rounded-lg flex items-center justify-center">
            <span className="text-xl">📋</span>
          </div>
          <span className="text-yellow-400 text-sm mt-1">Task</span>
        </div>

        {/* Worker 2 */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-2">
            <span className="text-2xl">👩‍💼</span>
          </div>
          <span className="text-green-400 font-semibold">Worker 2</span>
          <motion.div
            key={steps[delayedStep].worker2}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              ...getAnimation(steps[delayedStep].action),
            }}
            className="mt-2 bg-green-900 p-3 rounded-lg w-40 min-h-[80px] text-center flex items-center justify-center"
          >
            {steps[delayedStep].worker2}
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

export default OverPolitenessSimulation;
