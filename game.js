const BOARD_SIZE = 9;
const LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
const TARGET_BASES = {
  1: "i9",
  2: "a1",
};

const TYPE_META = {
  rock: { label: "Đấm", symbol: "✊" },
  paper: { label: "Lá", symbol: "🖐️" },
  scissors: { label: "Kéo", symbol: "✌️" },
};

const PLAYER_META = {
  1: { name: "Người chơi 1", short: "Xanh" },
  2: { name: "Người chơi 2", short: "Đỏ" },
};

const boardEl = document.getElementById("board");
const turnIndicatorEl = document.getElementById("turnIndicator");
const messageBoxEl = document.getElementById("messageBox");
const resetBtn = document.getElementById("resetBtn");
const colLabelsEl = document.getElementById("colLabels");
const rowLabelsEl = document.getElementById("rowLabels");

let state = createInitialState();

function createInitialState() {
  return {
    pieces: createInitialPieces(),
    currentPlayer: 1,
    selectedPieceId: null,
    winner: null,
    message: "Người chơi 1 đi trước.",
  };
}

function createInitialPieces() {
  const pattern = ["rock", "paper", "scissors", "rock", "paper", "scissors", "rock", "paper", "scissors"];
  const pieces = [];

  pattern.forEach((type, index) => {
    pieces.push({
      id: `p1-${index}`,
      player: 1,
      type,
      coord: `${LETTERS[index]}1`,
    });

    pieces.push({
      id: `p2-${index}`,
      player: 2,
      type,
      coord: `${LETTERS[index]}9`,
    });
  });

  return pieces;
}

function resetGame() {
  state = createInitialState();
  render();
}

function getPieceAt(coord) {
  return state.pieces.find((piece) => piece.coord === coord) || null;
}

function getPieceById(pieceId) {
  return state.pieces.find((piece) => piece.id === pieceId) || null;
}

function coordToPosition(coord) {
  const match = /^([a-i])(\d)$/.exec(coord);

  if (!match) {
    return null;
  }

  const col = LETTERS.indexOf(match[1]);
  const row = Number(match[2]);

  if (col === -1 || row < 1 || row > BOARD_SIZE) {
    return null;
  }

  return { col, row };
}

function positionToCoord(row, col) {
  return `${LETTERS[col]}${row}`;
}

function getValidMovesForPiece(piece) {
  const position = coordToPosition(piece.coord);

  if (!position) {
    return [];
  }

  const validMoves = [];
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [rowOffset, colOffset] of directions) {
    const nextRow = position.row + rowOffset;
    const nextCol = position.col + colOffset;

    if (nextRow < 1 || nextRow > BOARD_SIZE || nextCol < 0 || nextCol >= BOARD_SIZE) {
      continue;
    }

    const targetCoord = positionToCoord(nextRow, nextCol);
    const targetPiece = getPieceAt(targetCoord);

    if (!targetPiece) {
      validMoves.push(targetCoord);
      continue;
    }

    if (targetPiece.player === piece.player) {
      continue;
    }

    if (targetPiece.type === piece.type) {
      continue;
    }

    validMoves.push(targetCoord);
  }

  return validMoves;
}

function getBattleWinner(attackerType, defenderType) {
  if (attackerType === defenderType) {
    return "draw";
  }

  const winningMap = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  return winningMap[attackerType] === defenderType ? "attacker" : "defender";
}

function updateCounts() {
  Object.keys(TYPE_META).forEach((type) => {
    const count1 = state.pieces.filter((piece) => piece.player === 1 && piece.type === type).length;
    const count2 = state.pieces.filter((piece) => piece.player === 2 && piece.type === type).length;

    const player1Counter = document.querySelector('[data-player="1"][data-type="' + type + '"]');
    const player2Counter = document.querySelector('[data-player="2"][data-type="' + type + '"]');

    if (player1Counter) {
      player1Counter.textContent = String(count1);
    }

    if (player2Counter) {
      player2Counter.textContent = String(count2);
    }
  });
}

function renderLabels() {
  colLabelsEl.innerHTML = "";
  rowLabelsEl.innerHTML = "";

  LETTERS.forEach((letter) => {
    const letterEl = document.createElement("span");
    letterEl.textContent = letter.toUpperCase();
    colLabelsEl.appendChild(letterEl);
  });

  for (let row = BOARD_SIZE; row >= 1; row--) {
    const rowLabel = document.createElement("span");
    rowLabel.textContent = String(row);
    rowLabelsEl.appendChild(rowLabel);
  }
}

function renderTurn() {
  const label = `${PLAYER_META[state.currentPlayer].name} - ${PLAYER_META[state.currentPlayer].short}`;
  turnIndicatorEl.textContent = label;
  turnIndicatorEl.classList.remove("player1", "player2");
  turnIndicatorEl.classList.add(`player${state.currentPlayer}`);
}

function renderBoard() {
  boardEl.innerHTML = "";

  const selectedPiece = state.selectedPieceId ? getPieceById(state.selectedPieceId) : null;
  const validMoves = selectedPiece ? getValidMovesForPiece(selectedPiece) : [];

  for (let row = BOARD_SIZE; row >= 1; row--) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const coord = positionToCoord(row, col);
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "cell";
      cell.dataset.coord = coord;
      cell.setAttribute("aria-label", `Ô ${coord}`);

      if (coord === "i9") {
        cell.classList.add("base-player1");
      }

      if (coord === "a1") {
        cell.classList.add("base-player2");
      }

      if (selectedPiece && validMoves.includes(coord)) {
        cell.classList.add("valid-move");
      }

      if (selectedPiece && selectedPiece.coord === coord) {
        cell.classList.add("selected");
      }

      const piece = getPieceAt(coord);
      if (piece) {
        const pieceEl = document.createElement("div");
        pieceEl.className = `piece player${piece.player}`;

        const icon = document.createElement("span");
        icon.className = "piece-label";
        icon.textContent = TYPE_META[piece.type].symbol;
        pieceEl.appendChild(icon);

        cell.appendChild(pieceEl);
      }

      cell.addEventListener("click", () => handleCellClick(coord));
      boardEl.appendChild(cell);
    }
  }
}

function renderMessage() {
  messageBoxEl.textContent = state.message;
}

function render() {
  updateCounts();
  renderTurn();
  renderBoard();
  renderMessage();
}

function setSelection(pieceId) {
  state.selectedPieceId = pieceId;
  state.message = pieceId
    ? `Đã chọn quân ${TYPE_META[getPieceById(pieceId).type].label} của ${PLAYER_META[getPieceById(pieceId).player].name}.`
    : "Chọn một quân để di chuyển.";
  render();
}

function isValidMove(piece, targetCoord) {
  if (!piece) {
    return false;
  }

  return getValidMovesForPiece(piece).includes(targetCoord);
}

function handleCellClick(coord) {
  if (state.winner) {
    return;
  }

  const pieceOnCell = getPieceAt(coord);
  const selectedPiece = state.selectedPieceId ? getPieceById(state.selectedPieceId) : null;

  if (selectedPiece && isValidMove(selectedPiece, coord)) {
    performMove(selectedPiece, coord);
    return;
  }

  if (pieceOnCell && pieceOnCell.player === state.currentPlayer) {
    if (state.selectedPieceId === pieceOnCell.id) {
      setSelection(null);
      return;
    }

    setSelection(pieceOnCell.id);
    return;
  }

  if (selectedPiece) {
    state.message = "Ô này không hợp lệ cho nước đi hiện tại.";
    renderMessage();
  }
}

function performMove(piece, targetCoord) {
  const actingPlayer = state.currentPlayer;
  const targetPiece = getPieceAt(targetCoord);
  const beforeMove = piece.coord;

  if (targetPiece) {
    if (targetPiece.player === piece.player) {
      return;
    }

    if (targetPiece.type === piece.type) {
      state.message = "Hai quân cùng loại không thể ăn nhau, chỉ đứng chặn đường.";
      renderMessage();
      return;
    }

    const battleResult = getBattleWinner(piece.type, targetPiece.type);

    if (battleResult === "attacker") {
      state.pieces = state.pieces.filter((candidate) => candidate.id !== targetPiece.id);
      piece.coord = targetCoord;
      state.message = `${PLAYER_META[actingPlayer].name} đã ăn ${TYPE_META[targetPiece.type].label} của đối phương.`;
    } else {
      state.pieces = state.pieces.filter((candidate) => candidate.id !== piece.id);
      state.message = `${PLAYER_META[actingPlayer].name} thua cuộc khi tấn công ${TYPE_META[targetPiece.type].label}.`;
    }
  } else {
    piece.coord = targetCoord;
    state.message = `${PLAYER_META[actingPlayer].name} di chuyển từ ${beforeMove} tới ${targetCoord}.`;
  }

  state.selectedPieceId = null;

  if (piece.coord === TARGET_BASES[actingPlayer]) {
    state.winner = actingPlayer;
    state.message = `${PLAYER_META[actingPlayer].name} thắng! Đã đặt quân vào căn cứ ${TARGET_BASES[actingPlayer]}.`;
    render();
    return;
  }

  const opponent = actingPlayer === 1 ? 2 : 1;

  for (const type of Object.keys(TYPE_META)) {
    const opponentCount = state.pieces.filter((candidate) => candidate.player === opponent && candidate.type === type).length;
    if (opponentCount === 0) {
      state.winner = actingPlayer;
      state.message = `${PLAYER_META[actingPlayer].name} thắng! Đã ăn hết quân ${TYPE_META[type].label} của đối phương.`;
      render();
      return;
    }
  }

  state.currentPlayer = opponent;
  state.message = `${PLAYER_META[state.currentPlayer].name} đến lượt đi.`;
  render();
}

function init() {
  renderLabels();
  resetBtn.addEventListener("click", resetGame);
  render();
}

init();
