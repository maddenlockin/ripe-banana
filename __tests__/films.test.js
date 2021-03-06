const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const Film = require('../lib/models/Film.js');
// const Studio = require('../lib/models/Studio.js');

describe('r-b-h routes', () => {
    beforeEach(() => {
        return setup(pool);
    });

    const film = {
        title: 'Appendectomy Unlimited',
        studioId: '3',
        released: '1963',
    };

    it('posts new film to db', () => {
        return request(app)
            .post('/api/films')
            .send(film)
            .then((res) => {
                expect(res.body).toEqual({
                    filmId: '4',
                    title: 'Appendectomy Unlimited',
                    studio: { studioId: '3' },
                    released: '1963',
                });
            });
    });

    it('should GET all films', () => {
        return request(app)
            .get('/api/films')
            .then((res) => {
                expect(res.body).toEqual([
                    {
                        filmId: '1',
                        title: 'Hardwood Variations',
                        released: '1971',
                        studio: {
                            studioId: '1',
                            studioName: 'Blowfish Allures',
                        },
                    },
                    {
                        filmId: '2',
                        title: 'Wince-Worthy Whispers',
                        released: '2003',
                        studio: {
                            studioId: '2',
                            studioName: 'Piglet Party',
                        },
                    },
                    {
                        filmId: '3',
                        title: 'Blatherings of Banality',
                        released: '2016',
                        studio: {
                            studioId: '3',
                            studioName: 'Cloudy Iceberg',
                        },
                    },
                ]);
            });
    });

    it('should get a film by id', () => {
        return request(app)
            .get('/api/films/1')
            .then((res) => {
                expect(res.body).toEqual({
                    title: 'Hardwood Variations',
                    released: '1971',
                    studio: { name: 'Blowfish Allures', id: '1' },
                    cast: [{ id: '1', name: 'Buffy Sandpaper' }],
                    reviews: [
                        {
                            id: '2',
                            rating: '1',
                            review: 'I have known kettles of fish more interesting than this film',
                            reviewer: { id: '2', name: 'Billy Fakenflick' },
                        },
                    ],
                });
            });
    });
    afterAll(() => {
        pool.end();
    });
});
