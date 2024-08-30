'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;


      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      }

      if (puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' })
      }

      const row = coordinate.charAt(0).toUpperCase().charCodeAt(0) - 65;
      const column = parseInt(coordinate.substring(1), 10) - 1;

      if (row < 0 || row > 8 || column < 0 || column > 8 || isNaN(column)) {
        return res.json({ error: 'Invalid coordinate' })
      }

      if (!/^[1-9]$/.test(value)) {
        return res.json({ error: 'Invalid value' })
      }

      if (/[^1-9\.]/.test(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' });
      }

      if (puzzle[row * 9 + column] === value) {
        return res.json({ valid: true });
      }

      const isRowValid = solver.checkRowPlacement(puzzle, row, column, value)
      const isColValid = solver.checkColPlacement(puzzle, row, column, value)
      const isRegionValid = solver.checkRegionPlacement(puzzle, row, column, value)

      const conflicts = [];
      if (!isRowValid) conflicts.push('row');
      if (!isColValid) conflicts.push('column');
      if (!isRegionValid) conflicts.push('region');

      if (conflicts.length > 0) {
        res.json({ valid: false, conflict: conflicts });
      }

      res.json({ valid: true });
    }
    );

  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;

      if (!puzzle) {
        return res.json({ error: 'Required field missing' });
      }

      const result = solver.solve(puzzle);
      res.json(result);
    });
};
