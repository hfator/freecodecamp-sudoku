class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return { error: 'Expected puzzle to be 81 characters long' };
    }

    if (/[^1-9\.]/.test(puzzleString)) {
      return { error: "Invalid characters in puzzle" };
    }
    return { valid: true };
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const start = row * 9;
    for (let i = 0; i < 9; i++) {
      if (puzzleString[start + i] === value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (puzzleString[column + i * 9] === value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const regionStartRow = Math.floor(row / 3) * 3;
    const regionStartCol = Math.floor(column / 3) * 3;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (puzzleString[(regionStartRow + r) * 9 + (regionStartCol + c)] === value) {
          return false;
        }
      }
    }
    return true;
  }

  solve(puzzleString) {
    const findEmpty = (str) => {
      for (let i = 0; i < str.length; i++) {
        if (str[i] === '.') {
          return i;
        }
      }
      return -1;
    };

    const solveRecursively = (str) => {
      const emptyPos = findEmpty(str);
      if (emptyPos === -1) {
        return str;
      }

      const row = Math.floor(emptyPos / 9);
      const col = emptyPos % 9;

      for (let num = 1; num <= 9; num++) {
        const val = num.toString();

        if (this.checkRowPlacement(str, row, col, val) &&
          this.checkColPlacement(str, row, col, val) &&
          this.checkRegionPlacement(str, row, col, val)) {
          const newPuzzleString = str.slice(0, emptyPos) + val + str.slice(emptyPos + 1)
          const solvedPuzzle = solveRecursively(newPuzzleString);

          if (solvedPuzzle) {
            return solvedPuzzle;
          }
        }
      }
      return false;
    };
    const validation = this.validate(puzzleString);
    if (validation.error) {
      return validation
    }
    const solved = solveRecursively(puzzleString);
    if (solved) {
      return { solution: solved };
    } else {
      return { error: "Puzzle cannot be solved" };
    }
  }
}

module.exports = SudokuSolver;

