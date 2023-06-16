/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { db } from '../config/firebase';
import HTTPError from 'http-errors';
import { queryUserById } from '../service/UserTable';
import {
  queryInvoiceByInvoiceId,
  queryInvoicesByInvoiceId,
  queryInvoicesByFilter,
} from '../service/InvoiceTable';
import { encrypt, decrypt } from '../functions/util';
import { XMLParser } from 'fast-xml-parser';
import {
  getTotalCustomerInvoices,
  getTotalSupplierInvoices,
  getTotalCompanyInvoices,
} from '../service/CountTable';
async function storeInvoice(invoiceXML: string, userId: string) {
  // Get invoice and user information
  const [userData, invoice] = await Promise.all([
    queryUserById(userId),
    db.collection('invoices'),
  ]);
  // convert to JSON

  const parser = new XMLParser();
  const invoiceJSON = parser.parse(invoiceXML);
  //length of invoice collection
  const invoiceCount = await invoice.get();
  const invoiceId = (invoiceCount.size + 1).toString();
  // Generate new Invoice object
  const newInvoice = {
    transationId: invoiceJSON['Invoice']['cbc:ID'],
    invoiceId,
    invoiceXML,
    user: {
      userId: userId,
      companyName: userData.companyName,
    },
    amount: parseFloat(
      invoiceJSON['Invoice']['cac:LegalMonetaryTotal']['cbc:PayableAmount']
    ),
    issueDate: invoiceJSON['Invoice']['cbc:IssueDate'],
    dueDate: invoiceJSON['Invoice']['cbc:DueDate'],
  };

  try {
    await invoice.doc(invoiceId).set(newInvoice);
  } catch (error) {
    throw HTTPError(500, error.message);
  }

  return { invoiceId: invoiceId };
}

async function showInvoice(invoiceId: string, userId: string) {
  // Get invoice and user information
  const invoiceData = await queryInvoiceByInvoiceId(invoiceId, userId);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return { invoice: invoiceData.invoiceXML.replace(/\n/g, '') };
}

async function showRangeInvoice(
  userId: string,
  quantity: number,
  filter: string
) {
  const userData = await queryUserById(userId);
  let offset = 0;
  let invoices: any;
  if (!filter) {
    invoices = await queryInvoicesByInvoiceId(userData.companyName, quantity);
  } else {
    invoices = await queryInvoicesByFilter(
      userData.companyName,

      quantity,
      filter,
      offset
    );
  }
  // console.log(invoices);
  const noNewLines = [];
  for (const invoice of invoices) {
    noNewLines.push(invoice.replace(/\n/g, ''));
  }

  return { invoices: noNewLines };
}

async function deleteInvoice(invoiceId: string, userId: string) {
  // Get invoice and user information
  await queryInvoiceByInvoiceId(invoiceId, userId);

  const invoiceRef = db.collection('invoices').doc(invoiceId);
  try {
    await invoiceRef.delete();
    return { message: 'Invoice deleted successfully' };
  } catch (error) {
    throw HTTPError(500, error.message);
  }
}

async function modifyInvoice(
  invoiceId: string,
  userId: string,
  invoiceXML: string
) {
  // Get invoice and user information
  await queryInvoiceByInvoiceId(invoiceId, userId);

  // Update invoice
  const invoiceRef = db.collection('invoices').doc(invoiceId);
  try {
    await invoiceRef.update({ invoiceXML: invoiceXML });
    return { message: 'Invoice updated successfully' };
  } catch (error) {
    console.log(error.message);
    throw HTTPError(500, error.message);
  }
}

async function storeEncryptedInvoice(
  invoiceXML: string,
  userId: string,
  key: string
) {
  const encryptedInvoiceXML = encrypt(invoiceXML, key);
  // Get invoice and user information
  const [userData, invoice] = await Promise.all([
    queryUserById(userId),
    db.collection('invoices'),
  ]);
  const invoiceId = `${userId}_${new Date().getTime()}`;
  const newInvoice = {
    invoiceId: invoiceId,
    invoiceXML: encryptedInvoiceXML,
    user: {
      userId: userId,
      companyName: userData.companyName,
    },
    status: 'pending',
    client: userData.companyName,
    supplier: userData.companyName,
    encrypted: true,
  };
  try {
    await invoice.doc(invoiceId).set(newInvoice);
  } catch (error) {
    throw HTTPError(500, error.message);
  }

  return { invoiceId: invoiceId };
}

async function showEncryptedInvoice(
  invoiceId: string,
  userId: string,
  key: string
) {
  let invoiceData: any;
  try {
    invoiceData = await queryInvoiceByInvoiceId(invoiceId, userId);
  } catch {
    throw HTTPError(403, 'Invoice not found');
  }
  const decryptedInvoiceXML = decrypt(invoiceData.invoiceXML, key);
  // store it
  return { invoice: decryptedInvoiceXML.replace(/\n/g, '') };
}

async function updateStatus(invoiceId: string, userId: string, status: string) {
  // Get invoice and user information
  await queryInvoiceByInvoiceId(invoiceId, userId);

  // Update invoice
  const invoiceRef = db.collection('invoices').doc(invoiceId);
  try {
    await invoiceRef.update({ status: status });
    return { message: 'Invoice updated successfully' };
  } catch (error) {
    throw HTTPError(500, error.message);
  }
}

async function retriveCompanyInvoices(
  userId: string,
  quantity: number,
  filter: string,
  offset: number
) {
  const userData = await queryUserById(userId);
  const invoices = await queryInvoicesByFilter(
    userData.companyName,
    quantity,
    filter,
    offset
  );
  return { invoices: invoices };
}

async function getInvoiceCount(userId: string, filter: string) {
  const userData = await queryUserById(userId);
  let count: number;
  switch (filter) {
    case 'suppliers':
      count = await getTotalSupplierInvoices(userData.companyName);
    case 'customers':
      count = await getTotalCustomerInvoices(userData.companyName);
    default:
      count = await getTotalCompanyInvoices(userData.companyName);
      return { count };
  }
}

async function sendInvoice(userid: string) {
  return { message: 'Invoice sent successfully' };
}

export {
  showInvoice,
  deleteInvoice,
  modifyInvoice,
  showRangeInvoice,
  storeInvoice,
  sendInvoice,
  storeEncryptedInvoice,
  showEncryptedInvoice,
  retriveCompanyInvoices,
  updateStatus,
  getInvoiceCount,
};
