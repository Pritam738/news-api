const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('Fetching Articles', () => {
  it('should fetch a specified number of articles', async () => {
    const response = await request(app).get('/articles/5');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5); 
  });
  
  it('should return 400 if count is not positive', async () => {
    const response = await request(app).get('/articles/-5');

    expect(response.status).toBe(400);
  });
});
