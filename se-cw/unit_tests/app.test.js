const request = require('supertest');
const app = require('../app/app.js'); // Adjust the path to point to your Express app
const db = require('../app/services/db.js');

// Mocking the db module
jest.mock('../app/services/db');

describe('Express Route Tests', () => {

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('GET / should respond with the index page containing specific content', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Welcome to the World Population Hub');
    expect(response.text).toContain('Information and Resources');
  });

  it('GET /capital-cities should respond with the Capital Cities page', async () => {
    db.query.mockResolvedValue([{ ID: '1', CountryCode: 'AFG', Name: 'Kabul', CountryName: 'Afghanistan', Population: 1780000 }]);
    const response = await request(app).get('/capital-cities');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Capital Cities');
  });

  it('GET /cities should respond with the Cities page', async () => {
    db.query.mockResolvedValue([{ ID: '1', CountryCode: 'AFG', Name: 'Kabul', District: 'Kabol', Population: 1780000 }]);
    const response = await request(app).get('/cities');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Cities');
  });

  it('GET /countries should respond with the Countries page', async () => {
    db.query.mockResolvedValue([{ Code: 'AFG', Name: 'Afghanistan', Continent: 'Asia', Region: 'Southern and Central Asia', Capital: '1', Population: 22720000 }]);
    const response = await request(app).get('/countries');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Countries');
  });

  it('GET /language should respond with the Language Insights page', async () => {
    db.query.mockResolvedValue([{ Code: 'AFG', Language: 'Pashto', IsOfficial: 'T', Percentage: 52.4 }]);
    const response = await request(app).get('/language');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Language Insights');
  });

});
