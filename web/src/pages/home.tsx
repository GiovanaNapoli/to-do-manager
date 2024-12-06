import { useState } from "react";
import Board from "../components/board";
import Header from "../components/header";

function Home() {
  const [selectedProject, setSelectedProject] = useState("");

  return (
    <div className="flex flex-col h-screen w-full bg-neutral-900 text-neutral-50">
      <Header setSelectedProject={setSelectedProject} />
      <Board selectedProject={selectedProject} />
    </div>
  );
}

export default Home;
