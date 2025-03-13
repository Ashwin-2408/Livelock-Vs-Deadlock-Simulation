import { useState } from "react";
import "./App.css";
import { Button } from "../components/ui";
import { Card, CardContent } from "../components/ui";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import sections from "./utils/sections";
import LivelockSimulation1 from "../components/simulation1";
import { InfoIcon } from "lucide-react";
import LivelockDeadlockModal from "../components/diffModal";
import OverPolitenessSimulation from "../components/OverPolitenessSimulation";

function App() {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [showCode, setShowCode] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showSimulation, setShowSimulation] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const scenarios = sections;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <LivelockDeadlockModal isOpen={openModal} setIsOpen={setOpenModal} />
      <div className="flex flex-row gap-4 w-fit mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Livelock vs. Deadlock Simulation
        </motion.h1>
        <div
          className="flex flex-row text-sm gap-1 mt-3 cursor-pointer transition duration-100 hover:scale-[105%]"
          onClick={() => setOpenModal(true)}
          title="Show Difference"
        >
          <InfoIcon />
        </div>
      </div>

      <p className="text-center text-lg mb-8 max-w-[80%] mx-auto">
        Explore how livelock and deadlock occur in operating systems through
        interactive visualizations and detailed explanations.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {scenarios.map((scenario, index) => (
          <Button
            key={index}
            onClick={() => {
              setSelectedScenario(index);
              setShowCode(false);
              setShowInfo(false);
            }}
          >
            {scenario.title}
          </Button>
        ))}
      </div>

      {selectedScenario !== null && (
        <motion.div
          className="mt-8 max-w-[80%] mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card>
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4">
                {scenarios[selectedScenario].title}
              </h2>
              <p className="mb-4">{scenarios[selectedScenario].info}</p>
              <div className="flex gap-4">
                <Button
                  variant="primary"
                  onClick={() => {
                    setShowInfo(!showInfo);
                    setShowCode(false);
                    setShowSimulation(false);
                  }}
                >
                  {showInfo ? "Hide Info" : "Show Info"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowCode(false);
                    setShowSimulation(!showSimulation);
                    setShowInfo(false);
                  }}
                >
                  {showSimulation ? "Close Simulation" : "Run Simulation"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCode(!showCode);
                    setShowInfo(false);
                    setShowSimulation(false);
                  }}
                >
                  {showCode ? "Hide Code" : "Show Code"}
                </Button>
              </div>

              {/* Show Info Section */}
              {showInfo && (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  {scenarios[selectedScenario].description}
                </div>
              )}

              {/* Show Simulation Section */}
              {showSimulation && (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  {selectedScenario == 0 ? <LivelockSimulation1 /> : ""}
                  {selectedScenario == 2 ? (
                    <OverPolitenessSimulation></OverPolitenessSimulation>
                  ) : (
                    ""
                  )}
                </div>
              )}

              {/* Show Code Section */}
              {showCode && (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  {Object.entries(scenarios[selectedScenario].code).map(
                    ([filename, code], i) => (
                      <div key={i} className="mb-6">
                        <h3 className="text-lg font-semibold text-blue-400">
                          {filename}
                        </h3>
                        <SyntaxHighlighter
                          language="java"
                          style={dracula}
                          showLineNumbers
                        >
                          {code}
                        </SyntaxHighlighter>
                      </div>
                    )
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

export default App;
