import { db } from '../config/firebase';
import HTTPError from 'http-errors';

export const getTotalCompanyInvoices = async (companyName: string) => {
  const invoices: any[] = [];
  const querySnapshot = (await db.collection('invoices').get()).docs;
  querySnapshot.forEach((doc) => {
    invoices.push(doc.data());
  });
  const returnArray: any[] = [];
  for (const invoice of invoices) {
    if (invoice.user.companyName === companyName) {
      returnArray.push(invoice);
    }
  }
  return returnArray.length;
};

export const getTotalCustomerInvoices = async (companyName: string) => {
  const invoices: any[] = [];
  const querySnapshot = (await db.collection('invoices').get()).docs;
  querySnapshot.forEach((doc) => {
    invoices.push(doc.data());
  });
  const returnArray: any[] = [];
  for (const invoice of invoices) {
    if (invoice.customer === companyName) {
      returnArray.push(invoice);
    }
  }
  return returnArray.length;
};

export const getTotalSupplierInvoices = async (companyName: string) => {
  const invoices: any[] = [];
  const querySnapshot = (await db.collection('invoices').get()).docs;
  querySnapshot.forEach((doc) => {
    invoices.push(doc.data());
  });
  const returnArray: any[] = [];
  for (const invoice of invoices) {
    if (invoice.supplier === companyName) {
      returnArray.push(invoice);
    }
  }
  return returnArray.length;
};
