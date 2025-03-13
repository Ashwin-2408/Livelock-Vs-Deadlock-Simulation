import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const processes = [
  { id: "P1", priority: "Low", color: "bg-blue-500" },
  { id: "P2", priority: "High", color: "bg-red-500" },
];

const LivelockSimulation1 = () => {
  const [queue, setQueue] = useState([...processes]);
  const [cpuProcess, setCpuProcess] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (queue.length > 0) {
        const highPriority = queue.find((p) => p.priority === "High");
        const lowPriority = queue.find((p) => p.priority === "Low");

        if (highPriority) {
          setCpuProcess(highPriority);
          setQueue((prev) => [...prev.filter((p) => p.id !== highPriority.id), lowPriority].filter(Boolean));
        } else if (lowPriority) {
          setCpuProcess(lowPriority);
          setQueue((prev) => prev.filter((p) => p.id !== lowPriority.id));
        }

        // Reinsert the low-priority process back into the queue (causing livelock)
        if (lowPriority) {
          setTimeout(() => {
            setQueue((prev) => [...prev, lowPriority]);
          }, 1000);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [queue]);

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-400">Livelock Simulation</h2>

      {/* Scheduler Queue */}
      <div className="flex flex-col items-center bg-gray-900 p-6 rounded-lg shadow-lg w-64">
        <h3 className="text-lg font-semibold text-white mb-4">Waiting Queue</h3>
        <div className="flex flex-col space-y-2">
          {queue.map((process) => (
            <motion.div
              key={process.id}
              className={`w-24 h-10 text-center text-white font-semibold rounded-lg ${process.color}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {process.id} ({process.priority})
            </motion.div>
          ))}
        </div>
      </div>

      {/* CPU */}
      <div className="relative mt-10 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-white mb-4">CPU</h3>
        <div className="w-36 h-36 bg-gray-700 rounded-lg flex items-center justify-center">
          {cpuProcess && (
            <motion.div
              className={`w-28 h-28 text-center text-white font-semibold rounded-lg ${cpuProcess.color}`}
              key={cpuProcess.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              {cpuProcess.id} ({cpuProcess.priority})
            </motion.div>
          )}
        </div>
      </div>

      {/* Scheduler Animation */}
      {cpuProcess && (
        <motion.div
          className="absolute top-32 left-1/2 transform -translate-x-1/2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-white text-sm font-semibold bg-gray-800 px-3 py-1 rounded-lg shadow">
            {cpuProcess.priority === "High"
              ? "High-priority process executing..."
              : "Low-priority process preempted!"}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default LivelockSimulation1;
