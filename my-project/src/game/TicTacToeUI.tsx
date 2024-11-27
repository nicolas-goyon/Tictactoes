import React, { useState, useEffect } from 'react';
import {TicTacToeGame} from './TicTacToeGame';

const TicTacToeUI: React.FC = () => {
  const [game, setGame] = useState(new TicTacToeGame());
  const [board, setBoard] = useState(game.getBoardState());
  const [status, setStatus] = useState(`Player ${game.getCurrentPlayer()}'s turn`);

  useEffect(() => {
    setBoard(game.getBoardState());
    updateStatus();
  }, [game]);

  const handleCellClick = (index: number) => {
    if (!game.isGameActive() || game.getBoardState()[index]) return;

    game.makeMove(index);
    updateStatus()

    if (game.checkWinner() === true) {
      setStatus(`Player ${game.getCurrentPlayer()} wins!`);
    } else if (game.isGameActive() === false) {
      setStatus("It's a draw!");
    }
  };

  const updateStatus = () => {
    if (game.isGameActive()) {
      setStatus(`Player ${game.getCurrentPlayer()}'s turn`);
    }
  };

  const resetGame = () => {
    const newGame = new TicTacToeGame();
    setGame(newGame);
    setBoard(newGame.getBoardState());
    updateStatus();
  };

  return (
    <div className="tic-tac-toe">
      <h2 className="text-2xl font-semibold">Tic Tac Toe</h2>
      <div id="board" className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell items-center justify-center w-24 h-24 bg-gray-200 rounded shadow cursor-pointer text-2xl font-bold ${
              cell ? 'pointer-events-none' : ''
            }`}
            onClick={() => handleCellClick(index)}
          >
            {cell || ''}
          </div>
        ))}
      </div>
      <div id="status" className="status mt-4 text-xl font-semibold">{status}</div>
      <button onClick={resetGame} className="reset-button mt-4 px-4 py-2 bg-blue-500 text-white rounded">Reset Game</button>
    </div>
  );
};

export default TicTacToeUI;
