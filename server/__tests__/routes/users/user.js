const request = require('supertest');
const app = require('../../../app');

it('should be defined', async () => {
  const res = await request(app).get('/');
  expect(res.status).toBeDefined();
});
