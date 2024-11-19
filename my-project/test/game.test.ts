// src/tests/game.test.ts
import { TicTacToeGame } from "../game/TicTacToeGame";

describe('TicTacToeGame', () => {
  let game: TicTacToeGame;

  beforeEach(() => {
    game = new TicTacToeGame();
  });

  test('should start with player X', () => {
    expect(game.getCurrentPlayer()).toBe('X');
  });

  test('should switch players after a move', () => {
    game.makeMove(0);
    expect(game.getCurrentPlayer()).toBe('O');
  });

  test('should detect a winner', () => {
    game.makeMove(0);
    game.makeMove(3);
    game.makeMove(1);
    game.makeMove(4);
    game.makeMove(2); // X wins here
    expect(game.checkWinner()).toBe(true);
  });

  test('should declare a draw', () => {
    game.makeMove(0);
    game.makeMove(1);
    game.makeMove(2);
    game.makeMove(3);
    game.makeMove(4);
    game.makeMove(5);
    game.makeMove(6);
    game.makeMove(7);
    game.makeMove(8);
    expect(game.checkWinner()).toBe(false);
  });

  test('should reset the game', () => {
    game.makeMove(0);
    game.resetGame();
    expect(game.getBoardState()).toEqual(Array(9).fill(null));
    expect(game.getCurrentPlayer()).toBe('X');
  });
});
    