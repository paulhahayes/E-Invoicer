// gimmie

import { XMLParser } from 'fast-xml-parser';
import {
  queryInvoiceByInvoiceId,
  queryInvoicesByFilter,
  queryInvoicesByInvoiceId,
} from '../service/InvoiceTable';
import { queryUserById } from '../service/UserTable';
import { db } from '../config/firebase';
import HTTPError from 'http-errors';

async function storeInvoiceV2(invoiceXML: string, userId: string) {
  const [userData, invoice] = await Promise.all([
    queryUserById(userId),
    db.collection('invoices'),
  ]);
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
    currency: invoiceJSON['Invoice']['cbc:DocumentCurrencyCode'],
    issueDate: invoiceJSON['Invoice']['cbc:IssueDate'],
    dueDate: invoiceJSON['Invoice']['cbc:DueDate'],
    customer:
      invoiceJSON['Invoice']['cac:AccountingCustomerParty']['cac:Party'][
        'cac:PartyName'
      ]['cbc:Name'],
    supplier:
      invoiceJSON['Invoice']['cac:AccountingSupplierParty']['cac:Party'][
        'cac:PartyName'
      ]['cbc:Name'],
    customerName:
      invoiceJSON['Invoice']['cac:AccountingCustomerParty']['cac:Party'][
        'cac:Contact'
      ]['cbc:Name'],
    customerPhone:
      invoiceJSON['Invoice']['cac:AccountingCustomerParty']['cac:Party'][
        'cac:Contact'
      ]['cbc:Telephone'],
    customerEmail:
      invoiceJSON['Invoice']['cac:AccountingCustomerParty']['cac:Party'][
        'cac:Contact'
      ]['cbc:ElectronicMail'],
    tax: parseFloat(invoiceJSON['Invoice']['cac:TaxTotal']['cbc:TaxAmount']),
    taxExclusiveAmount: parseFloat(
      invoiceJSON['Invoice']['cac:LegalMonetaryTotal']['cbc:TaxExclusiveAmount']
    ),
    status: 'Pending',
    encrypted: false,
  };
  try {
    await invoice.doc(invoiceId).set(newInvoice);
  } catch (error) {
    throw HTTPError(500, error.message);
  }

  return { invoiceId: invoiceId };
}

async function storeInvoiceV3(invoiceXML: string, userId: string) {
  const [userData, invoice] = await Promise.all([
    queryUserById(userId),
    db.collection('invoices'),
  ]);

  const parser = new XMLParser();
  const invoiceJSON = parser.parse(invoiceXML);
  //length of invoice collection
  // const invoiceCount = await invoice.get();
  const invoiceId = invoiceJSON['Invoice']['cbc:ID'].toString();

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
    currency: invoiceJSON['Invoice']['cbc:DocumentCurrencyCode'],
    issueDate: invoiceJSON['Invoice']['cbc:IssueDate'],
    dueDate: invoiceJSON['Invoice']['cbc:DueDate'],
    customer:
      invoiceJSON['Invoice']['cac:AccountingCustomerParty']['cac:Party'][
        'cac:PartyName'
      ]['cbc:Name'],
    supplier:
      invoiceJSON['Invoice']['cac:AccountingSupplierParty']['cac:Party'][
        'cac:PartyName'
      ]['cbc:Name'],
    customerName:
      invoiceJSON['Invoice']['cac:AccountingCustomerParty']['cac:Party'][
        'cac:Contact'
      ]['cbc:Name'],
    customerPhone:
      invoiceJSON['Invoice']['cac:AccountingCustomerParty']['cac:Party'][
        'cac:Contact'
      ]['cbc:Telephone'],
    customerEmail:
      invoiceJSON['Invoice']['cac:AccountingCustomerParty']['cac:Party'][
        'cac:Contact'
      ]['cbc:ElectronicMail'],
    tax: parseFloat(invoiceJSON['Invoice']['cac:TaxTotal']['cbc:TaxAmount']),
    taxExclusiveAmount: parseFloat(
      invoiceJSON['Invoice']['cac:LegalMonetaryTotal']['cbc:TaxExclusiveAmount']
    ),
    status: 'Pending',
    encrypted: false,
  };
  try {
    await invoice.doc(invoiceId).set(newInvoice);
  } catch (error) {
    throw HTTPError(500, error.message);
  }

  return { invoiceId: invoiceId };
}

async function showInvoiceV2(invoiceId: string, userId: string) {
  // Get invoice and user information
  const invoiceData = await queryInvoiceByInvoiceId(invoiceId, userId);
  const replaceXMl = invoiceData.invoiceXML.replace(/\n/g, '');
  invoiceData.invoiceXML = replaceXMl;

  return { invoice: invoiceData };
}

async function showRangeInvoiceV2(
  userId: string,
  quantity: number,
  filter: string,
  offset: number
) {
  const userData = await queryUserById(userId);

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
  return { invoices: invoices };
}

export { showInvoiceV2, showRangeInvoiceV2, storeInvoiceV2, storeInvoiceV3 };
