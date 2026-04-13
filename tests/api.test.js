process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../server');

jest.setTimeout(10000);

describe('API Tests', () => {

  // TEST 1: Public route
  it('GET /products should return 200', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
  });

  // TEST 2: Protected route (orders)
  it('GET /orders should return 401 (unauthorized)', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toBe(401);
  });

  // TEST 3: Protected route (customers)
  it('GET /customers should return 401 (unauthorized)', async () => {
    const res = await request(app).get('/customers');
    expect(res.statusCode).toBe(401);
  });

  // TEST 4: Invalid route
  it('GET /invalid should return 404', async () => {
    const res = await request(app).get('/invalid');
    expect(res.statusCode).toBe(404);
  });

});