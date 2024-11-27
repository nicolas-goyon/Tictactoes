// src/game/TicTacToeGame.ts
export type Player = "X" | "O";

export class TicTacToeGame {
  private currentPlayer: Player;
  private gameActive: boolean;
  private boardState: (Player | null)[];
  private winningCombinations: number[][];

  constructor() {
    this.currentPlayer = "X";
    this.gameActive = true;
    this.boardState = Array(9).fill(null);
    this.winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }

  getCurrentPlayer(): Player {
    return this.currentPlayer;
  }

  isGameActive(): boolean {
    return this.gameActive;
  }

  getBoardState(): (Player | null)[] {
    return this.boardState;
  }

  makeMove(index: number): boolean {
    if (!this.gameActive || this.boardState[index]) return false;

    this.boardState[index] = this.currentPlayer;
    if (this.checkWinner()) {
      this.gameActive = false;
      return true;
    }

    if (this.boardState.every((cell) => cell)) {
      this.gameActive = false;
      return false;
    }

    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    return true;
  }

  checkWinner(): boolean {
    return this.winningCombinations.some((combination) => {
      const [a, b, c] = combination;
      return (
        this.boardState[a] &&
        this.boardState[a] === this.boardState[b] &&
        this.boardState[a] === this.boardState[c]
      );
    });
  }

  resetGame() {
    this.currentPlayer = "X";
    this.gameActive = true;
    this.boardState = Array(9).fill(null);
  }
}
