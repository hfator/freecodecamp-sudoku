const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send(({ puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51' }))
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.property(res.body, 'solution');
                done();
            });
    });

    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { error: 'Required field missing' });
                done();
            });
    });

    test('Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.5A' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { error: 'Invalid characters in puzzle' });
                done();
            });
    });

    test('Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.5' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { error: 'Expected puzzle to be 81 characters long' });
                done();
            });
    });

    test('Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
        chai.request(server)
            .post('/api/solve')
            .send({ puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.55' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { error: 'Puzzle cannot be solved' });
                done();
            });
    });

    test('Check a puzzle placement with all fields: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51', coordinate: 'A3', value: '7' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { valid: true });
                done();
            });
    });

    test('Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51', coordinate: 'A3', value: '4' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { valid: false, conflict: ['row'] });
                done();
            });
    });

    test('Check a puzzle placement with multiple palcement conflicts: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51', coordinate: 'A4', value: '8' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { valid: false, conflict: ['row', 'column', 'region'] });
                done();
            });
    });

    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51', coordinate: 'A4', value: '6' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { valid: false, conflict: ['row', 'column', 'region'] });
                done();
            });
    });

    test('Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51', value: '6' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { error: 'Required field(s) missing' });
                done();
            });
    });

    test('Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.5X', coordinate: 'A3', value: '7' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { error: 'Invalid characters in puzzle' });
                done();
            });
    });

    test('Check a puzzle placement with incorrect length: POST request to /api/check', () => {
        chai.request(server)
            .post('/api/check')
            .send((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { error: 'Expected puzzle to be 81 characters long' })
            })
    });

    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51', coordinate: 'A33', value: '7' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { error: 'Invalid coordinate' });
                done();
            });
    });

    test('Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {
        chai.request(server)
            .post('/api/check')
            .send({ puzzle: '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51', coordinate: 'A3', value: '77' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { error: 'Invalid value' });
                done();
            });
    });
});

