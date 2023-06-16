import supertest from 'supertest';
import { createServer } from '../server';

const app = createServer();
describe('User', () => {
  beforeEach(async () => {
    await supertest(app).delete('/clear');
  });
  describe('Get Users', () => {
    describe('Successful get users', () => {
      it('should return a 200 response and an array of users', async () => {
        const companyPayload = {
          companyName: 'UserCompany',
          companyEmail: 'UserEmail@outlook.com',
          numEmployees: 20,
          ABN: 47452603925,
        };

        const userPayload = {
          email: 'UserEmail@outlook.com',
          password: 'password123',
          name: 'Kifaya Shehadeh',
          companyKey: '123',
        };

        // Register company and user
        const { body: companyBody } = await supertest(app)
          .post('/auth/registerCompany')
          .send(companyPayload);
        userPayload.companyKey = companyBody.companyKey;
        await supertest(app).post('/auth/registerUser').send(userPayload);

        // Get users
        const { body, statusCode } = await supertest(app).get('/users');
        expect(statusCode).toBe(200);
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(1);
      });
    });
  });
  let userId: string;

  beforeEach(async () => {
    await supertest(app).delete('/clear');

    const companyPayload = {
      companyName: 'UserCompany',
      companyEmail: 'UserEmail@outlook.com',
      numEmployees: 20,
      ABN: 47452603925,
    };

    const userPayload = {
      email: 'UserEmail@outlook.com',
      password: 'password123',
      name: 'Kifaya Shehadeh',
      companyKey: '123',
    };

    const { body: companyBody } = await supertest(app)
      .post('/auth/registerCompany')
      .send(companyPayload);
    userPayload.companyKey = companyBody.companyKey;

    const { body: userBody } = await supertest(app)
      .post('/auth/registerUser')
      .send(userPayload);
    userId = userBody.userId;
  });

  describe('Successful get user by ID', () => {
    it('should return a 200 response and the user data', async () => {
      const { body, statusCode } = await supertest(app).get(`/users/${userId}`);
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('userId', userId);
      expect(body).toHaveProperty('email', 'UserEmail@outlook.com');
      expect(body).toHaveProperty('name', 'Kifaya Shehadeh');
      // Add any other expected user properties here
    });
  });

  describe('User not found', () => {
    it('should return a 404 response and an error message', async () => {
      const nonExistentUserId = 'nonexistentuserid';
      const { body, statusCode } = await supertest(app).get(
        `/users/${nonExistentUserId}`
      );
      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('message', 'User not found');
    });
  });
});
