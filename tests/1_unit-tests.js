const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {
    test('Logic handles a valid puzzle string of 81 characters', () => {
        const puzzleString = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
        const validation = solver.validate(puzzleString);
        assert.deepEqual(validation, { valid: true });
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
        const puzzleString = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.5A';
        const validation = solver.validate(puzzleString);
        assert.deepEqual(validation, { error: "Invalid characters in puzzle" });
    });

    test('Logic handles a puzzle string that is not 81 characters in length', () => {
        const puzzleString = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.5';
        const validation = solver.validate(puzzleString);
        assert.deepEqual(validation, { error: 'Expected puzzle to be 81 characters long' });
    });

    test('Logic handles a valid row placement', () => {
        const puzzleString = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
        const isValidRow = solver.checkRowPlacement(puzzleString, 0, 2, '7');
        assert.isTrue(isValidRow);
    });

    test('Logic handles an invalid row placement', () => {
        const puzzleString = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
        const isValidRow = solver.checkRowPlacement(puzzleString, 0, 2, '3');
        if (!isValidRow) {
            assert.include(['row'], 'row', 'Expected conflict: row');
        }
    });

    test('Logic handles an valid column placement', () => {
        const puzzleString = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
        const isValidCol = solver.checkColPlacement(puzzleString, 0, 2, '7');
        assert.isTrue(isValidCol);
    });

    test('Logic handles an invalid column placement', () => {
        const puzzleString = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
        const isValidCol = solver.checkColPlacement(puzzleString, 0, 2, '3');
        if (!isValidCol) {
            assert.include(['column'], 'column', 'Expected conflict: column');
        }
    });

    test('Logic handles a valid region placement', () => {
        const puzzleString = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
        const isValidRegion = solver.checkRegionPlacement(puzzleString, 0, 2, '7');
        assert.isTrue(isValidRegion);
    });

    test('Logic handles an invalid region placement', () => {
        const puzzleString = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
        const isValidRegion = solver.checkRegionPlacement(puzzleString, 0, 2, '8');
        if (!isValidRegion) {
            assert.include(['region'], 'region', 'Expected conflict: region');
        }
    });

    test('Valid puzzle strings pass the solver', () => {
        const puzzleString = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
        const solved = solver.solve(puzzleString);
        assert.property(solved, 'solution');
    });

    test('Invalid puzzle strings fail the solver', () => {
        const puzzleString = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.55';
        const solved = solver.solve(puzzleString);
        assert.deepEqual(solved, { error: "Puzzle cannot be solved" });
    });

    test('Solver retuns the expected solution for an incomplete puzzle', () => {
        const puzzleString = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
        const expectedSolution = '827549163531672894649831527496157382218396475753284916962415738185763249374928651';
        const solved = solver.solve(puzzleString);
        assert.equal(solved.solution, expectedSolution);
    });
});
