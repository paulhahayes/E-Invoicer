import supertest from 'supertest';
import { createServer } from '../server';

const app = createServer();

let companyPayload = {
  companyName: 'AuthCompany',
  companyEmail: 'AuthCompany@Outlook.com',
  numEmployees: 20,
  ABN: 47452603925,
};

let userPayload = {
  email: 'kifaya.s@outlook.com',
  password: 'password123',
  name: 'Kifaya Shehadeh',
  companyKey: '123',
};

let token: string;

describe('Auth', () => {
  beforeEach(async () => {
    await supertest(app).delete('/clear');
  });

  beforeEach(() => {
    companyPayload = {
      companyName: 'AuthCompany',
      companyEmail: 'AuthCompany@Outlook.com',
      numEmployees: 20,
      ABN: 47452603925,
    };

    userPayload = {
      email: 'kifaya.s@outlook.com',
      password: 'password123',
      name: 'Kifaya Shehadeh',
      companyKey: '123',
    };
  });

  describe('Register Company', () => {
    describe('Given valid company details', () => {
      it('should return a 200 response', async () => {
        const { body, statusCode } = await supertest(app)
          .post('/auth/registerCompany')
          .send(companyPayload);

        expect(statusCode).toBe(200);
        expect(body).toEqual({
          companyKey: body.companyKey,
        });
      });
    });
    describe('Given invalid companyEmail', () => {
      it('should return a 400 response', async () => {
        companyPayload.companyEmail = 'bademail';
        await supertest(app)
          .post('/auth/registerCompany')
          .send(companyPayload)
          .expect(400);
      });
    });

    describe('Given duplicate CompanyName', () => {
      it('should return a 400 response', async () => {
        await supertest(app).post('/auth/registerCompany').send(companyPayload);
        companyPayload.companyEmail = 'newEmail@gmail.com';
        const { body, statusCode } = await supertest(app)
          .post('/auth/registerCompany')
          .send(companyPayload);
        expect(statusCode).toBe(409);
        expect(body).toHaveProperty('message', 'Company is already registered');
      });
    });

    describe('Given duplicate CompanyEmail', () => {
      it('should return a 400 response', async () => {
        await supertest(app).post('/auth/registerCompany').send(companyPayload);
        companyPayload.companyName = 'newCompany';
        const { body, statusCode } = await supertest(app)
          .post('/auth/registerCompany')
          .send(companyPayload);
        expect(statusCode).toBe(409);
        expect(body).toHaveProperty(
          'message',
          'Company email is already registered'
        );
      });
    });

    describe('Given invalid ABN', () => {
      it('should return a 400 response and an error message', async () => {
        const companyPayload = {
          companyName: 'Auth',
          companyEmail: 'AuthCompany@Outlook.com',
          numEmployees: 20,
          ABN: 'invalidABNoGood',
        };

        const { body, statusCode } = await supertest(app)
          .post('/auth/registerCompany')
          .send(companyPayload);
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('message', 'ABN invalid');
      });
    });
  });

  describe('Register user', () => {
    beforeEach(async () => {
      const { body } = await supertest(app)
        .post('/auth/registerCompany')
        .send(companyPayload);
      userPayload.companyKey = body.companyKey;
    });

    describe('Given valid user registration details', () => {
      it('should return a 200 response', async () => {
        const { body, statusCode } = await supertest(app)
          .post('/auth/registerUser')
          .send(userPayload);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty('token');
        expect(body).toHaveProperty('userId');
      });
    });

    describe('Given invalid email', () => {
      it('should return a 400 response', async () => {
        await supertest(app).post('/auth/registerCompany').send(companyPayload);
        userPayload.email = 'bademail';
        const { body, statusCode } = await supertest(app)
          .post('/auth/registerUser')
          .send(userPayload);
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('message', 'Email is invalid.');
      });
    });

    describe('Given email already exists', () => {
      it('should return a 409 response', async () => {
        await supertest(app).post('/auth/registerUser').send(userPayload);
        const { body, statusCode } = await supertest(app)
          .post('/auth/registerUser')
          .send(userPayload);
        expect(statusCode).toBe(409);
        expect(body).toHaveProperty('message', 'Email is already registered');
      });
    });

    describe('Given invalid companyKey', () => {
      it('should return a 404 response', async () => {
        userPayload.companyKey = 'notacompanykey';
        const { body, statusCode } = await supertest(app)
          .post('/auth/registerUser')
          .send(userPayload);
        expect(statusCode).toBe(404);
        expect(body).toHaveProperty('message', 'Company key does not exist');
      });
    });
  });
  describe('Logout user', () => {
    beforeEach(async () => {
      const { body } = await supertest(app)
        .post('/auth/registerCompany')
        .send(companyPayload);
      userPayload.companyKey = body.companyKey;
      const { body: userBody } = await supertest(app)
        .post('/auth/registerUser')
        .send(userPayload);
      token = userBody.token;
    });

    describe('Given valid token', () => {
      it('should return a 200 response', async () => {
        const { body, statusCode } = await supertest(app)
          .post('/auth/logout')
          .set('token', token)
          .send();
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty('message', 'User logged out succesfully');
      });
    });
    describe('Given invalid token', () => {
      it('should return a 401 response', async () => {
        const { body, statusCode } = await supertest(app)
          .post('/auth/logout')
          .set('token', 'invalidtoken')
          .send();
        expect(statusCode).toBe(401);
        expect(body).toHaveProperty('message', 'Invalid token');
      });
    });
    describe('Given user is already logged out', () => {
      it('should return a 401 response', async () => {
        await supertest(app).post('/auth/logout').set('token', token).send();
        const { body, statusCode } = await supertest(app)
          .post('/auth/logout')
          .set('token', token)
          .send();
        expect(statusCode).toBe(403);
        expect(body).toHaveProperty('message', 'User already logged out');
      });
    });
  });
  describe('Login user', () => {
    beforeEach(async () => {
      const { body } = await supertest(app)
        .post('/auth/registerCompany')
        .send(companyPayload);
      userPayload.companyKey = body.companyKey;
      const { body: userBody } = await supertest(app)
        .post('/auth/registerUser')
        .send(userPayload);
      token = userBody.token;
      await supertest(app).post('/auth/logout').set('token', token).send();
    });

    describe('Given valid user login details', () => {
      it('should return a 200 response', async () => {
        const { body, statusCode } = await supertest(app)
          .post('/auth/login')
          .send(userPayload);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty('token');
        expect(body).toHaveProperty('userId');
      });
    });

    describe('Given invalid email', () => {
      it('should return a 400 response', async () => {
        userPayload.email = 'bademail';
        const { body, statusCode } = await supertest(app)
          .post('/auth/login')
          .send(userPayload);
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('message', 'Email is invalid.');
      });
    });

    describe('Given email does not exist', () => {
      it('should return a 404 response', async () => {
        userPayload.email = 'bademail';
        const { body, statusCode } = await supertest(app)
          .post('/auth/login')
          .send(userPayload);
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('message', 'Email is invalid.');
      });
    });
  });
});
