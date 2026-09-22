import { useState } from 'react';
import { randomChoice, resolveClassic, type ClassicResult } from '../game/classic';
import { PIECE_LABELS, PIECE_SYMBOLS, type PieceType } from '../game/types';

const choices: PieceType[] = ['SCISSORS', 'ROCK', 'PAPER'];
const resultCopy: Record<ClassicResult, string> = {
  WIN: 'Bạn thắng lượt này!',
  LOSE: 'Máy thắng lượt này.',
  DRAW: 'Hòa — chọn lại nhé.',
};

export function ClassicScreen() {
  const [playerChoice, setPlayerChoice] = useState<PieceType | null>(null);
  const [computerChoice, setComputerChoice] = useState<PieceType | null>(null);
  const [result, setResult] = useState<ClassicResult | null>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const finished = score.player >= 5 || score.computer >= 5;

  const play = (choice: PieceType) => {
    if (finished) return;
    const computer = randomChoice();
    const nextResult = resolveClassic(choice, computer);
    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(nextResult);
    setScore((current) => ({
      player: current.player + (nextResult === 'WIN' ? 1 : 0),
      computer: current.computer + (nextResult === 'LOSE' ? 1 : 0),
    }));
  };

  const reset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ player: 0, computer: 0 });
  };

  return (
    <main className="classic-screen">
      <section className="screen-heading">
        <div>
          <p className="context-line">Bài 1 · Đấu với máy</p>
          <h1>Kéo, Búa hay Bao?</h1>
          <p>Người đầu tiên đạt 5 điểm sẽ thắng trận.</p>
        </div>
        <div className="scoreboard" aria-label={`Bạn ${score.player} điểm, máy ${score.computer} điểm`}>
          <div><span>Bạn</span><strong>{score.player}</strong></div>
          <span className="score-divider">—</span>
          <div><span>Máy</span><strong>{score.computer}</strong></div>
        </div>
      </section>

      <section className="classic-arena" aria-live="polite">
        <div className="duel-side">
          <span className="duel-label">Bạn chọn</span>
          <div className={`duel-hand player-hand${playerChoice ? '' : ' is-empty'}`}>{playerChoice ? PIECE_SYMBOLS[playerChoice] : '?'}</div>
          <strong>{playerChoice ? PIECE_LABELS[playerChoice] : 'Đang chờ'}</strong>
        </div>
        <div className={`round-result${result ? ` result-${result.toLowerCase()}` : ''}`}>
          {finished
            ? score.player > score.computer ? 'Bạn đã thắng trận!' : 'Máy đã thắng trận.'
            : result ? resultCopy[result] : 'Chọn một quân bên dưới'}
        </div>
        <div className="duel-side">
          <span className="duel-label">Máy chọn</span>
          <div className={`duel-hand computer-hand${computerChoice ? '' : ' is-empty'}`}>{computerChoice ? PIECE_SYMBOLS[computerChoice] : '?'}</div>
          <strong>{computerChoice ? PIECE_LABELS[computerChoice] : 'Đang chờ'}</strong>
        </div>
      </section>

      <section className="classic-controls" aria-label="Chọn Kéo, Búa hoặc Bao">
        {choices.map((choice) => (
          <button key={choice} className="choice-button" onClick={() => play(choice)} disabled={finished}>
            <span aria-hidden="true">{PIECE_SYMBOLS[choice]}</span>
            <strong>{PIECE_LABELS[choice]}</strong>
          </button>
        ))}
      </section>
      {finished && <button className="primary-button reset-button" onClick={reset}>Chơi trận mới</button>}
    </main>
  );
}
