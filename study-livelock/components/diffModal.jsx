import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui";
import { X } from "lucide-react";

const LivelockDeadlockModal = ({ isOpen, setIsOpen }) => {
  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>

              {/* Modal Content */}
              <h2 className="text-2xl font-bold text-blue-400 mb-4">
                Livelock vs Deadlock
              </h2>

              {/* Table Comparison */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-700 text-gray-300">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-700 px-4 py-2 text-left">
                        Feature
                      </th>
                      <th className="border border-gray-700 px-4 py-2 text-left">
                        Deadlock
                      </th>
                      <th className="border border-gray-700 px-4 py-2 text-left">
                        Livelock
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">
                        Definition
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        Processes are stuck indefinitely, unable to proceed.
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        Processes constantly change states but make no progress.
                      </td>
                    </tr>
                    <tr className="bg-gray-800">
                      <td className="border border-gray-700 px-4 py-2">
                        State Change
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        No state changes occur.
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        Continuous state changes occur.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">
                        Process Movement
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        Completely halted.
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        Moving but ineffective.
                      </td>
                    </tr>
                    <tr className="bg-gray-800">
                      <td className="border border-gray-700 px-4 py-2">
                        Example Scenario
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        Two processes waiting for each other's resource.
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        Two processes repeatedly releasing and requesting
                        resources but not progressing.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">
                        Resolution
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        Requires external intervention.
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        May resolve automatically in rare cases.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LivelockDeadlockModal;
