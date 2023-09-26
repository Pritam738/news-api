const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('News API', () => {
  it('should return a 404 status for an invalid endpoint', async () => {
    const response = await request(app).get('/invalid-endpoint');

    expect(response.status).toBe(404);
  });
});
