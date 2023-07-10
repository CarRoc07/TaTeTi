import { possibilities } from "./constants";

export const checkWinner = (board) => {
    for (let i = 0; i < possibilities.length; i++) {
        const [a, b, c] = possibilities[i]
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]
        }
    }

    return null
}