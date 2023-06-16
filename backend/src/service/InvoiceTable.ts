import { db } from '../config/firebase';
import HTTPError from 'http-errors';
import { XMLParser } from 'fast-xml-parser';
import { queryUserById } from './UserTable';
import { isConditionalExpression } from 'typescript';

// Used by invoiceShow: gets invoiceData
export const queryInvoiceByInvoiceId = async (
  invoiceId: string,
  userId: string
) => {
  try {
    const querySnapshot = await db
      .collection('invoices')
      .where('invoiceId', '==', invoiceId)
      .get();
    if (querySnapshot.empty) {
      throw HTTPError(400, 'Invoice not found');
    }
    const userData = await queryUserById(userId);
    //Check if user has permissions to delete invoice (from the company)
    if (
      userData.companyName !== querySnapshot.docs[0].data().user.companyName
    ) {
      throw HTTPError(403, 'Forbidden: User cannot delete this invoice');
    }

    // check if user comapny = invoice companyName

    return querySnapshot.docs[0].data();
  } catch (error) {
    throw HTTPError(error.status, error.message);
  }
};

// Used by invoiceShowRange: gets invoiceData
export const queryInvoicesByInvoiceId = async (
  companyName: string,
  quantity: number
) => {
  try {
    const invoices: any[] = [];
    const querySnapshot = (await db.collection('invoices').get()).docs;
    querySnapshot.forEach((doc) => {
      invoices.push(doc.data());
    });

    const returnArray: any[] = [];
    for (const invoice of invoices) {
      if (invoice.user.companyName === companyName && quantity !== 0) {
        returnArray.push(invoice);
        quantity--;
      }
    }
    return returnArray;
  } catch (error) {
    throw HTTPError(500, error.message);
  }
};

export const queryInvoicesByFilter = async (
  companyName: string,
  quantity: number,
  filter: string,
  offset: number
) => {
  const returnArray: any[] = [];
  const querySnapshot = (await db.collection('invoices').get()).docs;

  querySnapshot.forEach((doc) => {
    if (doc.data().user.companyName === companyName) {
      returnArray.push(doc.data());
    }
  });

  switch (filter) {
    case 'duedate':
      return queryFilterInvoiceByDate(quantity, returnArray, offset);
    case 'amount':
      return queryFilterInvoiceByAmount(quantity, returnArray, offset);
    case 'suppliers':
      return queryFilterInvoiceByCompany(
        quantity,
        returnArray,
        filter,
        companyName,
        offset
      );
    case 'customers':
      return queryFilterInvoiceByCompany(
        quantity,
        returnArray,
        filter,
        companyName,
        offset
      );
    default:
      throw HTTPError(400, 'Invalid filter');
  }
};

const queryFilterInvoiceByDate = async (
  quantity: number,
  invoices: any[],
  offset: number
) => {
  const parser = new XMLParser();

  try {
    // sort based on closest date
    invoices.sort((invoice1, invoice2) => {
      // parse each invoice
      let jObj1 = parser.parse(invoice1.invoiceXML);
      let jObj2 = parser.parse(invoice2.invoiceXML);

      const date1 = new Date(jObj1['Invoice']['cbc:DueDate']);
      const date2 = new Date(jObj2['Invoice']['cbc:DueDate']);
      return date1.getTime() - date2.getTime();
    });

    // return all invoices if quantity is -1
    if (quantity == -1) {
      return invoices.slice(offset);
    }
    const sortedInvoices = invoices.slice(offset, quantity);

    // return the sorted invoices
    return sortedInvoices;
  } catch (error) {
    throw HTTPError(500, error.message);
  }
};

const queryFilterInvoiceByAmount = async (
  quantity: number,
  invoices: any[],
  offset: number
) => {
  try {
    const parser = new XMLParser();

    invoices.sort((invoice1, invoice2) => {
      // parse each invoice
      let jObj1 = parser.parse(invoice1.invoiceXML);
      let jObj2 = parser.parse(invoice2.invoiceXML);
      const amount1 =
        jObj1['Invoice']['cac:LegalMonetaryTotal']['cbc:PayableAmount'];
      const amount2 =
        jObj2['Invoice']['cac:LegalMonetaryTotal']['cbc:PayableAmount'];
      return amount2 - amount1;
    });
    // return all invoices if quantity is -1
    if (quantity == -1) {
      return invoices.slice(offset);
    }
    const sortedInvoices = invoices.slice(offset, quantity);

    // return the sorted invoices
    return sortedInvoices;
  } catch (error) {
    throw HTTPError(500, error.message);
  }
};

const queryFilterInvoiceByCompany = async (
  quantity: number,
  invoices: any[],
  filter: string,
  companyName: string,
  offset: number
) => {
  // filter customer or supplier
  if (filter !== 'customers' && filter !== 'suppliers') {
    // if not customer or supplier, throw error
    throw HTTPError(
      400,
      'Invalid filter value. It must be either "customers" or "suppliers".'
    );
  }

  // Filter the invoices based on the provided filter
  const filteredInvoices = invoices.filter((invoice) => {
    if (filter === 'suppliers') {
      // if filter = supplier return any invoice where supplier = company name
      return invoice.supplier === companyName;
    } else if (filter === 'customers') {
      // if filter = customer return any invoice where customer = company name
      return invoice.customer === companyName;
    }
  });

  // Remove the invoice.xml field from the filtered invoices
  const filteredInvoicesWithoutXML = filteredInvoices.map((invoice) => {
    const { invoiceXML, ...otherFields } = invoice;
    return otherFields;
  });

  // if not quantity return all them
  if (quantity == -1) {
    return filteredInvoicesWithoutXML.slice(offset);
  }

  // Return the specified quantity of filtered invoices without the invoice.xml field
  return filteredInvoicesWithoutXML.slice(offset, offset + quantity);
};
