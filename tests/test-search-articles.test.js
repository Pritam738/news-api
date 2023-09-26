const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('Searching for Articles', () => {
  it('should search for articles by Query', async () => {
    const response = await request(app).get('/search?count=5&query=john%20doe');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5); 
  });
  it('should return 400 if query is not passed', async () => {
    const response = await request(app).get('/search?count=10');

    expect(response.status).toBe(400);
    // Add more assertions based on the expected response
  });
  it('should return 400 if count is not passed', async () => {
    const response = await request(app).get('/search?query=john%20doe');

    expect(response.status).toBe(400);
    // Add more assertions based on the expected response
  });
});
