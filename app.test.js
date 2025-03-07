const request = require('supertest');
const app = require('./app')

describe('Allowed Methods', () => {
    it('should allow for GET requests', async () => {
      const res = await request(app)
        .get('/api/whoami')
      expect(res.statusCode).toEqual(200);
    });

    it('should NOT allow for POST requests', async () => {
        const res = await request(app)
            .post('/api/whoami')
            .set('Accept', 'application/vnd.api+json')
            .set('Content-Type', 'application/vnd.api+json')
        expect(res.statusCode).toEqual(405);
    });

    it('should NOT allow for PUT requests', async () => {
        const res = await request(app)
            .put('/api/whoami')
            .set('Accept', 'application/vnd.api+json')
            .set('Content-Type', 'application/vnd.api+json')
        expect(res.statusCode).toEqual(405);
    });

    it('should NOT allow for DELETE requests', async () => {
        const res = await request(app)
            .delete('/api/whoami')
            .set('Accept', 'application/vnd.api+json')
            .set('Content-Type', 'application/vnd.api+json')
        expect(res.statusCode).toEqual(405);
    });
});
  
describe('Missing path', () => {
    it('should give 404 for missing path', async () => {
      const res = await request(app)
        .get('/path')
    expect(res.statusCode).toEqual(404);
    });
});

describe('Response validation', () => {
    it('is valid JSON', async () => {
        const isValidJSON = obj => {
            try {
              JSON.stringify(obj);
              return true;
            } catch (e) {
              return false;
            }
        };

        const res = await request(app)
        .get('/api/whoami')
        expect(res.statusCode).toEqual(200);
        expect(isValidJSON(res.body)).toEqual(true);
    });

    it('has an ip attribute', async () => {
        const res = await request(app)
        .get('/api/whoami')
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes).toHaveProperty('ip')
    });

    it('has a language attribute', async () => {
        const res = await request(app)
        .get('/api/whoami')
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes).toHaveProperty('language')
    });

    it('has a software attribute', async () => {
        const res = await request(app)
        .get('/api/whoami')
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes).toHaveProperty('software')
    });
});