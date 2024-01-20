import { Square } from "./Square";
export const WinnerModal = ({winner, resetGame}) => {
  if (winner === null) return null;

  const winnerText = winner === false ? "Empate" : "Ganó: "

  return (
    <>
      <section className="winner">
        <div>
          <h2>{winnerText}</h2>
          <header className="win">{winner && <Square>{winner}</Square>}</header>

          <footer>
            <button onClick={resetGame}>Empezar nuevamente</button>
          </footer>
        </div>
      </section>
    </>
  );
};
