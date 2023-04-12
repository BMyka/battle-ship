import Ship from "./Ship";

const SIZE = 10;

class Gameboard {
  board = [...Array(SIZE)].map(() => Array(SIZE).fill(null));
  missedShots = [...Array(SIZE)].map(() => Array(SIZE).fill(false));

  initialize() {
    this.board.forEach((row) => row.fill(null));
    this.missedShots.forEach((row) => row.fill(false));
  }

  placeShip(ship: Ship, row: number, column: number, isVertical: boolean) {
    if (!this.isPlacementPossible(ship, row, column, isVertical)) return false;
    for (let i = 0; i < ship.length; i++) {
      const r = isVertical ? row + i : row;
      const c = isVertical ? column : column + i;
      this.board[r][c] = ship;
    }
    return true;
  }

  placeShipsRandomly() {
    if (!this.isEmpty()) return;
    const ships = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];
    ships.forEach((ship) => {
      let success = false;
      while (!success) {
        const row = Math.floor(Math.random() * SIZE);
        const col = Math.floor(Math.random() * SIZE);
        const vertical = Math.random() < 0.5;
        success = this.placeShip(ship, row, col, vertical);
      }
    });
  }

  isPlacementPossible(
    ship: Ship,
    row: number,
    column: number,
    isVertical: boolean
  ) {
    if (row < 0 || row >= SIZE || column < 0 || column >= SIZE) return false;
    if (isVertical ? row + ship.length > SIZE : column + ship.length > SIZE)
      return false;
    for (let i = 0; i < ship.length; i++) {
      const r = isVertical ? row + i : row;
      const c = isVertical ? column : column + i;
      if (this.board[r][c]) return false;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const nr = r + x;
          const nc = c + y;
          if (nr < 0 || nr >= SIZE || nc < 0 || nc >= SIZE) continue;
          if (this.board[nr][nc]) return false;
        }
      }
    }
    return true;
  }

  receiveAttack(row: number, column: number): boolean {
    if (row < 0 || row >= SIZE || column < 0 || column >= SIZE) return false;

    const cell = this.board[row][column];
    if (!cell) {
      this.missedShots[row][column] = true;
      return false;
    }

    let hitIndex = 0;
    if (column > 0 && this.board[row][column - 1]) {
      while (--column >= 0 && this.board[row][column]) hitIndex++;
    } else if (row > 0 && this.board[row - 1][column]) {
      while (--row >= 0 && this.board[row][column]) hitIndex++;
    }

    cell.hit(hitIndex);
    return true;
  }

  isGameOver() {
    return this.board.every((row) =>
      row.every((cell) => !cell || cell.isSunk())
    );
  }

  isEmpty() {
    return this.board.every((row) => row.every((cell) => !cell));
  }

  getEmptyFieldsAmount() {
    let result = 0;
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (this.board[i][j] === null) result++;
      }
    }
    return result;
  }
}

export default Gameboard;
