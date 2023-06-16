import supertest from 'supertest';
import { createServer } from './server';

const app = createServer();

describe('Echo', () => {
  describe('Given Valid', () => {
    it('should return a 200 response', async() => {
      const { statusCode } = await supertest(app)
        .get('/echo')
        .query({ value: 'hello' });
      expect(statusCode).toBe(200);
    });
  });
  describe('Given Invalid', () => {
    it('should return a 400 response', async() => {
      const { statusCode } = await supertest(app)
        .get('/echo')
        .query({ value: 'echo' });
      expect(statusCode).toBe(400);
    });
  });
});
