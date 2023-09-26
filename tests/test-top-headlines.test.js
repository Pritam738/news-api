const request = require('supertest');
const app = require('../app'); 

describe('Fetching top headlines', () => {
  it('should fetch a specified number of articles', async () => {
    const response = await request(app).get('/top_headlines?count=5&category=general');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5); 
  });

  it('should fetch a list of valid categories', async () => {
    const response = await request(app).get('/top_headlines_categories');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(["general", "world", "nation", "business", "technology", "entertainment", "sports", "science", "health"]);
  });

  it('should return 400 if count is not positive', async () => {
    const response = await request(app).get('/top_headlines?count=-5&category=general');

    expect(response.status).toBe(400);
  });

  it('should return 400 if category is not passed', async () => {
    const response = await request(app).get('/top_headlines?count=10');

    expect(response.status).toBe(400);
  });

  it('should return 400 if invalid category is not passed', async () => {
    const response = await request(app).get('/top_headlines?count=10&category=cat');

    expect(response.status).toBe(400);
  });

  it('should return 400 if count is not passed', async () => {
    const response = await request(app).get('/top_headlines?&category=general');

    expect(response.status).toBe(400);
  });
});
