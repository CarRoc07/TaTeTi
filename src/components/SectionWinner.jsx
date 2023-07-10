/* eslint-disable react/prop-types */
import { Square } from "./Square"

export const SectionWinner = ({winner, resetGame}) => {
    return (
        <section className="winner">
            <div className="text">
            <h2>
                {
                winner === false
                    ? 'Empate'
                    : 'Ganador'
                }
            </h2>

            {
                winner && (
                    <header className="win">
                { winner && <Square>{winner}</Square> }
                    </header>
                )
            }

                <footer>
                    <button onClick={resetGame}> Restart </button>
                </footer>
            </div>
        </section>
    )
}
