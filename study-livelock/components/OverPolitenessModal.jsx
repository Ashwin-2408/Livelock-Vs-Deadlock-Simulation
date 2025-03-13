import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui";
import { X } from "lucide-react";

const OverPolitenessModal = ({ isOpen, setIsOpen }) => {
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
                Over-Politeness Livelock
              </h2>

              {/* Description */}
              <p className="text-gray-300 mb-4">
                A real-world example of livelock occurs when two overly polite
                people meet in a narrow corridor. Both step aside to let the
                other pass, then both move back to continue, creating an endless
                loop of politeness without progress.
              </p>

              {/* Table Comparison */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-700 text-gray-300">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-700 px-4 py-2 text-left">
                        Characteristic
                      </th>
                      <th className="border border-gray-700 px-4 py-2 text-left">
                        Office Task Example
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">
                        Problem
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        Two workers constantly defer to each other: "After you."
                        "No, after you."
                      </td>
                    </tr>
                    <tr className="bg-gray-800">
                      <td className="border border-gray-700 px-4 py-2">
                        Activity
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        Workers are active (communicating, deferring) but no
                        actual work is done.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">
                        Resource Access
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        Both workers are trying to be respectful rather than
                        grabbing the resource.
                      </td>
                    </tr>
                    <tr className="bg-gray-800">
                      <td className="border border-gray-700 px-4 py-2">
                        Process State
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        Workers repeatedly change between "ready to work" and
                        "deferring to other."
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-700 px-4 py-2">
                        Resolution
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        Requires introducing a protocol (e.g., manager assigns
                        tasks) or breaking the symmetry.
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

export default OverPolitenessModal;
