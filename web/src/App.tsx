import Board from "./components/board";
import Header from "./components/header";

function App() {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Header />
      <Board />
    </div>
  );
}

export default App;
