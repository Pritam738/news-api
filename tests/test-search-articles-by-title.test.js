const request = require('supertest');
const app = require('../app');

describe('Searching for Articles by title', () => {
  it('should search for articles by title', async () => {
    const response = await request(app).get('/search_title?count=5&query=john%20doe');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5); 
  });

  it('should return 400 if count is not positive', async () => {
    const response = await request(app).get('/search_title?count=-5&query=general');

    expect(response.status).toBe(400);
  });

  it('should return 400 if query is not passed', async () => {
    const response = await request(app).get('/search_title?count=10');

    expect(response.status).toBe(400);
  });
  
  it('should return 400 if count is not passed', async () => {
    const response = await request(app).get('/search_title?query=john%20doe');

    expect(response.status).toBe(400);
  });
});
