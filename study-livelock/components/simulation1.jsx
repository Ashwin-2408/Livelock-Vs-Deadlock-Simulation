import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react"; // Icon for switching effect

const LivelockSimulation = () => {
  const steps = [
    {
      cpu: "High Priority Process",
      queue: ["Low Priority Process"],
      text: "🔵 Step 1: High-priority process (P2) is placed in the CPU.",
      switching: false,
    },
    {
      cpu: "Low Priority Process",
      queue: ["High Priority Process"],
      text: "⚠️ Step 2: P2 requires P1 to complete, so P1 moves to the CPU.",
      switching: true,
    },
    {
      cpu: "High Priority Process",
      queue: ["Low Priority Process"],
      text: "🔴 Step 3: Scheduler sees P2 in the queue and moves it back to the CPU.",
      switching: true,
    },
    {
      cpu: "Low Priority Process",
      queue: ["High Priority Process"],
      text: "⏳ Step 4: The switching continues indefinitely, causing livelock.",
      switching: true,
    },
  ];

  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 5000); // 5-second delay per step
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-2xl font-bold text-blue-400">Livelock Simulation</h2>

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

      {/* CPU Section */}
      <div className="w-64 min-h-[50px] border-2 border-blue-400 rounded-lg bg-gray-800 p-4">
        <h3 className="text-blue-400 text-sm font-semibold text-center">CPU</h3>
        <motion.div
          key={steps[step].cpu}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className={`text-lg text-center text-black px-2 py-1 mt-2 rounded-lg ${
            steps[step].cpu == "High Priority Process"
              ? "bg-red-400"
              : "bg-green-400"
          }`}
        >
          {steps[step].cpu}
        </motion.div>
      </div>

      {/* Switching Animation */}
      {steps[step].switching && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 text-gray-400 text-lg"
        >
          <ArrowLeftRight size={24} className="animate-pulse" />
          <span>Switching Process...</span>
          <ArrowLeftRight size={24} className="animate-pulse" />
        </motion.div>
      )}

      {/* Queue Section */}
      <div className="w-64 min-h-[50px] border-2 border-yellow-400 rounded-lg bg-gray-800 p-4">
        <h3 className="text-yellow-400 text-sm font-semibold">Waiting Queue</h3>
        {steps[step].queue.map((process) => (
          <motion.div
            key={process}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.5 }}
            className={`mt-2 text-black text-center px-4 py-1 rounded-lg ${
                process == "High Priority Process"
                  ? "bg-red-400"
                  : "bg-green-400"
              }`}
          >
            {process}
          </motion.div>
        ))}
      </div>

      {/* Auto-Step Indicator */}
      <div className="text-sm text-gray-400">
        Step {step + 1} / {steps.length}
      </div>
    </div>
  );
};

export default LivelockSimulation;
