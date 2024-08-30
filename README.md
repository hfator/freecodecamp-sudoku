# Sudoku Solver

This is the boilerplate for the Sudoku Solver project. Instructions to complete your project can be found at https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/sudoku-solver

- All puzzle logic can go into /controllers/sudoku-solver.js |
    - The validate function should take a given puzzle string and check it to see if it has 81 valid characters for the input. |
    - The check functions should be validating against the current state of the board. |
    - The solve function should handle solving any given valid puzzle string, not just the test inputs and solutions. You are expected to write out the logic to solve this. |

- All routing logic can go into /routes/api.js |
- See the puzzle-strings.js file in /controllers for some sample puzzles your application should solve |
- To run the challenge tests on this page, set NODE_ENV to test without quotes in the .env file |
- To run the tests in the console, use the command npm run test.


- Write the following tests in tests/1_unit-tests.js:
    - Logic handles a valid puzzle string of 81 characters |
    - Logic handles a puzzle string with invalid characters (not 1-9 or .) |
    - Logic handles a puzzle string that is not 81 characters in length |
    - Logic handles a valid row placement |
    - Logic handles an invalid row placement |
    - Logic handles a valid column placement |
    - Logic handles an invalid column placement |
    - Logic handles a valid region (3x3 grid) placement |
    - Logic handles an invalid region (3x3 grid) placement |
    - Valid puzzle strings pass the solver |
    - Invalid puzzle strings fail the solver |
    - Solver returns the expected solution for an incomplete puzzle |

- Write the following tests in tests/2_functional-tests.js:
    - Solve a puzzle with valid puzzle string: POST request to /api/solve |
    - Solve a puzzle with missing puzzle string: POST request to /api/solve |
    - Solve a puzzle with invalid characters: POST request to /api/solve |
    - Solve a puzzle with incorrect length: POST request to /api/solve |
    - Solve a puzzle that cannot be solved: POST request to /api/solve |
    - Check a puzzle placement with all fields: POST request to /api/check |
    - Check a puzzle placement with single placement conflict: POST request to /api/check |
    - Check a puzzle placement with multiple placement conflicts: POST request to /api/check |
    - Check a puzzle placement with all placement conflicts: POST request to /api/check |
    - Check a puzzle placement with missing required fields: POST request to /api/check |
    - Check a puzzle placement with invalid characters: POST request to /api/check |
    - Check a puzzle placement with incorrect length: POST request to /api/check |
    - Check a puzzle placement with invalid placement coordinate: POST request to /api/check |
    - Check a puzzle placement with invalid placement value: POST request to /api/check |