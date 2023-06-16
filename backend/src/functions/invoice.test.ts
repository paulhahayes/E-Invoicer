import supertest from 'supertest';
import { createServer } from '../server';

//// SETUP /////

const app = createServer();
jest.setTimeout(10000);
let companyPayload = {
  companyName: 'Company10',
  companyEmail: 'kifaya10.s@outlook.com',
  numEmployees: 20,
  ABN: 47452603925,
};

let userPayload = {
  email: 'kifaya.s@outlook.com',
  password: 'password123',
  name: 'Kifaya Shehadeh',
  companyKey: '123',
};

// Bypass validation
jest.mock('../middlewares/validateInvoiceText', () => ({
  validateInvoiceText: (req: any, res: any, next: any) => {
    if (req.body === 'invalid invoice') {
      return res.status(400).send({
        message:
          'Invalid invoice, must be PEPPOL standard org.oasis-open:invoice:2.1',
      });
    }
    next();
  },
}));

let token: string;
let invoiceId: string;

const fs = require('fs');
const validInvoice = fs.readFileSync('data/sampleInvoice.xml', 'utf8');
const mod1 = fs.readFileSync('data/mod1.xml', 'utf8');
const mod2 = fs.readFileSync('data/mod2.xml', 'utf8');

///// TESTS /////

describe('Invoice', () => {
  beforeEach(async () => {
    await supertest(app).delete('/clear');
    const { body } = await supertest(app)
      .post('/auth/registerCompany')
      .send(companyPayload);
    userPayload.companyKey = body.companyKey;
    const { body: userBody } = await supertest(app)
      .post('/auth/registerUser')
      .send(userPayload);
    token = userBody.token;
  });

  describe('Store Invoice', () => {
    describe('Given valid invoice', () => {
      it('should return a 200 response', async () => {
        const { statusCode } = await supertest(app)
          .post('/invoice/store/v2')
          .set('token', token)
          .set('Content-Type', 'application/xml')
          .send(validInvoice);
        expect(statusCode).toBe(200);
      });
    });

    describe('Given invalid invoice', () => {
      it('should return a 400 response', async () => {
        const { body, statusCode } = await supertest(app)
          .post('/invoice/store/v2')
          .set('token', token)
          .set('Content-Type', 'application/xml')
          .send('invalid invoice');

        expect(statusCode).toBe(400);
        expect(body).toEqual({
          message:
            'Invalid invoice, must be PEPPOL standard org.oasis-open:invoice:2.1',
        });
      });
    });
  });

  describe('Show Invoice', () => {
    beforeEach(async () => {
      const { body } = await supertest(app)
        .post('/invoice/store/v2')
        .set('token', token)
        .set('Content-Type', 'application/xml')
        .send(validInvoice);
      invoiceId = body.invoiceId;
    });
    describe('Given valid invoiceId', () => {
      it('should return a 200 response', async () => {
        const { statusCode } = await supertest(app)
          .get(`/invoice/show/v2/${invoiceId}`)
          .set('token', token);
        expect(statusCode).toBe(200);
      });
    });
    describe('Given invalid invoiceId', () => {
      it('should return a 400 response', async () => {
        const { body, statusCode } = await supertest(app)
          .get(`/invoice/show/v2/invalidInvoiceId`)
          .set('token', token);
        expect(statusCode).toBe(400);
        expect(body).toEqual({ message: 'Invoice not found' });
      });
    });
    describe('Given valid invoiceId and but no permission', () => {
      //TODO
    });
  });

  describe('Show Invoice Range', () => {
    beforeEach(async () => {
      const mod1 = fs.readFileSync('data/mod1.xml', 'utf8');
      await supertest(app)
        .post('/invoice/store/v2')
        .set('token', token)
        .set('Content-Type', 'application/xml')
        .send(validInvoice);
      const expensiveInvoice = fs.readFileSync(
        'data/largeAmountInvoice.xml',
        'utf8'
      );
      await supertest(app)
        .post('/invoice/store/v2')
        .set('token', token)
        .set('Content-Type', 'application/xml')
        .send(mod1);
      await supertest(app)
        .post('/invoice/store/v2')
        .set('token', token)
        .set('Content-Type', 'application/xml')
        .send(expensiveInvoice);
    });
    describe('Given valid range', () => {
      it('should return a 200 response', async () => {
        const { body, statusCode } = await supertest(app)
          .get(`/invoice/showRange/v2`)
          .query({ quantity: 3 })
          .set('token', token);
        expect(statusCode).toBe(200);
        expect(body.invoices).toHaveLength(3);
      });
    });
    describe('Given filter amount', () => {
      it('should return a 200 response', async () => {
        const { body, statusCode } = await supertest(app)
          .get('/invoice/showRange/v2')
          .query({ quantity: 1, filter: 'amount' })
          .set('token', token);

        expect(statusCode).toBe(200);
        expect(body.invoices).toHaveLength(1);
      });
    });
  });

  describe('Delete Invoice', () => {
    describe('Given valid invoiceId', () => {
      it('should return a 200 response', async () => {
        const { body } = await supertest(app)
          .post('/invoice/store/v2')
          .set('token', token)
          .set('Content-Type', 'application/xml')
          .send(validInvoice);
        const { statusCode } = await supertest(app)
          .delete(`/invoice/delete/${body.invoiceId}`)
          .set('token', token);
        expect(statusCode).toBe(200);
      });
    });
  });

  describe('Modify Invoice', () => {
    describe('Given valid invoiceId', () => {
      it('should return a 200 response', async () => {
        const { body } = await supertest(app)
          .post('/invoice/store/v2')
          .set('token', token)
          .set('Content-Type', 'application/xml')
          .send(mod1);
        console.log(body.invoiceId);
        const { statusCode } = await supertest(app)
          .put(`/invoice/modify/${body.invoiceId}`)
          .set('token', token)
          .set('Content-Type', 'application/xml')
          .send(mod2);
        console.log();
        expect(statusCode).toBe(200);
      });
    });
  });

  describe('Encrypt Invoice', () => {
    describe('Given valid invoiceId', () => {
      it('should return a 200 response', async () => {
        const { statusCode } = await supertest(app)
          .post('/invoice/encrypt')
          .set('token', token)
          .query({ secretKey: 'secret' })
          .set('Content-Type', 'application/xml')
          .send(validInvoice);
        expect(statusCode).toBe(200);
      });
    });
  });

  describe('Decrypt Invoice', () => {
    describe('Given valid invoiceId', () => {
      it('should return a 200 response', async () => {
        const { body } = await supertest(app)
          .post('/invoice/encrypt')
          .set('token', token)
          .query({ secretKey: 'secret' })
          .set('Content-Type', 'application/xml')
          .send(validInvoice);
        const invoiceId = body.invoiceId;
        const { body: s, statusCode } = await supertest(app)
          .get('/invoice/decrypt')
          .query({ invoiceId: invoiceId, secretKey: 'secret' })
          .set('token', token);
        expect(statusCode).toBe(200);
      });
    });
  });
  describe('Upload Invoice', () => {
    describe('Given valid xml file', () => {
      it('should return a 200 response', async () => {
        const { statusCode } = await supertest(app)
          .post('/invoice/upload')
          .set('token', token)
          .attach('file', 'data/sampleInvoice.xml');
        expect(statusCode).toBe(200);
      });
    });

    describe('Given invalid xml file', () => {
      it('should return a 500 response', async () => {
        const { statusCode } = await supertest(app)
          .post('/invoice/upload')
          .set('token', token)
          .attach('file', 'data/badInput.xml');
        expect(statusCode).toBe(500);
      });
    });
    describe('Given valid json', () => {
      it('should return a 200 response', async () => {
        const { statusCode } = await supertest(app)
          .post('/invoice/upload')
          .set('token', token)
          .attach('file', 'data/valid.json');
        expect(statusCode).toBe(200);
      });
    });
  });
});
