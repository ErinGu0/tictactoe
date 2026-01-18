import { useState } from 'react';

export default function TicTacToe() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [showCelebration, setShowCelebration] = useState(false);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);

  function handleClick(i) {
    if (board[i] || winner) return;
    
    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setScores(prev => ({ ...prev, [newWinner]: prev[newWinner] + 1 }));
      setShowCelebration(true);
    } else if (newBoard.every(cell => cell !== null)) {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  }

  function startGame(e) {
    e.preventDefault();
    if (playerX.trim() && playerO.trim()) {
      setGameStarted(true);
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setShowCelebration(false);
  }

  function resetAll() {
    setGameStarted(false);
    setPlayerX('');
    setPlayerO('');
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setScores({ X: 0, O: 0, draws: 0 });
    setShowCelebration(false);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function getWinnerName() {
    return winner === 'X' ? playerX : playerO;
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full">
          <h1 className="text-5xl font-bold text-center mb-3 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Tic Tac Toe
          </h1>
          <p className="text-center text-gray-600 mb-8">Enter player names to begin</p>
          
          <form onSubmit={startGame} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Player X Name
              </label>
              <input
                type="text"
                value={playerX}
                onChange={(e) => setPlayerX(e.target.value)}
                placeholder="Enter name for X"
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-800"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Player O Name
              </label>
              <input
                type="text"
                value={playerO}
                onChange={(e) => setPlayerO(e.target.value)}
                placeholder="Enter name for O"
                className="w-full px-4 py-3 rounded-xl border-2 border-cyan-200 focus:border-cyan-500 focus:outline-none transition-colors text-gray-800"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Game
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (showCelebration && winner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 30 + 20}px`
              }}
            >
              {['🎉', '🎊', '⭐', '✨', '🏆'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center relative z-10 animate-bounce">
          <div className="text-8xl mb-6">🏆</div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Winner!
          </h1>
          <p className="text-4xl font-bold text-gray-800 mb-8">
            {getWinnerName()}
          </p>
          <div className="space-y-3">
            <button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg"
            >
              Play Again
            </button>
            <button
              onClick={resetAll}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              New Players
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Tic Tac Toe
        </h1>
        <p className="text-center text-gray-600 text-sm mb-6">
          {playerX} (X) vs {playerO} (O)
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
          <div className="text-center text-2xl font-semibold text-gray-800 mb-3">
            {winner ? `${getWinnerName()} Wins!` : isDraw ? "It's a Draw!" : `${isXNext ? playerX : playerO}'s Turn`}
          </div>
          <div className="flex justify-around text-sm text-gray-700">
            <div className="text-center">
              <div className="font-bold text-blue-600 text-xl">{scores.X}</div>
              <div className="text-xs">{playerX}</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-600 text-xl">{scores.draws}</div>
              <div className="text-xs">Draws</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-cyan-600 text-xl">{scores.O}</div>
              <div className="text-xs">{playerO}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {board.map((cell, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`aspect-square text-6xl font-bold rounded-2xl transition-all duration-200 
                ${cell === 'X' ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg' : ''}
                ${cell === 'O' ? 'bg-gradient-to-br from-cyan-400 to-cyan-600 text-white shadow-lg' : ''}
                ${!cell ? 'bg-blue-50 hover:bg-blue-100 hover:shadow-xl border-2 border-blue-200' : ''}
                ${winner || isDraw ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:scale-105'}
                shadow-md`}
              disabled={cell !== null || winner !== null}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={resetGame}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
          >
            New Game
          </button>
          <button
            onClick={resetAll}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-md"
          >
            Change Players
          </button>
        </div>
      </div>
    </div>
  );
}