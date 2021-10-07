const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('r-b-h routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    const film = {
        title: 'Appendectomy Unlimited',
        studioId: 4,
        released: 1963,
    };

    xit('posts new film to db', () => {
        return request(app)
            .post('/api/films')
            .send(film)
            .then((res) => {
                expect(res.body).toEqual({
                    filmId: '4',
                    ...film,
                });
            });
    });

    afterAll(() => {
        pool.end();
    });
});
