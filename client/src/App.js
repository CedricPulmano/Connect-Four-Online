import Board from "./components/Board";
import "./App.css";

function App() {
  return (
    <div className="game-page">
      <header className="game-header"></header>
      <main className="board-container">
        <Board className="board"></Board>
      </main>
      <footer className="game-footer"></footer>
    </div>
  );
}

export default App;
