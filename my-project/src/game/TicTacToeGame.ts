export type Player = "X" | "O";
export default class TicTacToeGame{
  currentPlayer: Player;
  gameActive: boolean;
  boardState: (Player | null)[];
  winningCombinations: number[][];

  constructor() {
    this.currentPlayer = "X";
    this.gameActive = true;
    this.boardState = Array(9).fill(null);
    this.winningCombinations = [];
  }

 

  getCurrentPlayer(): Player  {
    return this.currentPlayer;
  }

 

 isGameActive(): boolean{
    return this.gameActive;
 }

 getBoardState(): (Player | null)[] {
    return this.boardState;
 }

 makeMove(index: number): boolean {
  return false
 }
 

 resetGame(){
  
 }
}




