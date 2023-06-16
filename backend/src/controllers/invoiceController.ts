import { Response, Request } from 'express';
import {
  deleteInvoice,
  showInvoice,
  showRangeInvoice,
  storeInvoice,
  sendInvoice,
  modifyInvoice,
  storeEncryptedInvoice,
  showEncryptedInvoice,
  retriveCompanyInvoices,
  getInvoiceCount,
  updateStatus,
} from '../functions/invoice';

import {
  storeInvoiceV2,
  showInvoiceV2,
  showRangeInvoiceV2,
  storeInvoiceV3,
} from '../functions/invoiceV2';

import { clear } from '../functions/clear';

export const invoiceStore = async (req: Request, res: Response) => {
  const invoiceXML = req.body;
  const apiVersion = (req as any).apiVersion;
  const userId = (req as any).user;
  try {
    let result: { invoiceId: string };
    switch (apiVersion) {
      case 2:
        result = await storeInvoiceV2(invoiceXML, userId);
        break;
      case 3:
        result = await storeInvoiceV3(invoiceXML, userId);
      default:
        result = await storeInvoice(invoiceXML, userId);
    }
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const invoiceShow = async (req: Request, res: Response) => {
  // const version = req.body.
  const invoiceId = req.params.invoiceId;
  const apiVersion = (req as any).apiVersion;

  const user = (req as any).user;
  try {
    let result: { invoice: any };
    switch (apiVersion) {
      case 2:
        result = await showInvoiceV2(invoiceId, user);
        break;
      default:
        result = await showInvoice(invoiceId, user);
    }
    res.set('Content-Type', 'application/xml');
    res.send(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
export const invoiceShowRange = async (req: Request, res: Response) => {
  let quantity = parseInt(req.query.quantity as string, 10);
  if (!quantity) {
    quantity = -1; // means get all the invoices
  }
  const filter = req.query.filter as string | undefined;
  const userId = (req as any).user;
  const apiVersion = (req as any).apiVersion;
  const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

  try {
    let result: { invoices: any };
    switch (apiVersion) {
      case 2:
        result = await showRangeInvoiceV2(userId, quantity, filter, offset);
        break;
      default:
        result = await showRangeInvoice(userId, quantity, filter);
    }
    res.send(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const countInvoices = async (req: Request, res: Response) => {
  const userId = (req as any).user;
  const filter = req.query.filter as string | undefined;
  try {
    const result = await getInvoiceCount(userId, filter);
    res.send(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const retriveCompInvoices = async (req: Request, res: Response) => {
  const userId = (req as any).user;
  const filter = req.query.filter as string | undefined;
  const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

  const quantity = req.query.quantity
    ? parseInt(req.query.quantity as string)
    : -1; // means get all the invoices
  try {
    const result = await retriveCompanyInvoices(
      userId,
      quantity,
      filter,
      offset
    );
    res.send(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const invoiceDelete = async (req: Request, res: Response) => {
  const invoiceId = req.params.invoiceId;
  const userId = (req as any).user;
  try {
    const result = await deleteInvoice(invoiceId, userId);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const invoiceModify = async (req: Request, res: Response) => {
  const invoiceId = req.params.invoiceId;
  const invoiceXML = req.body;

  if (!invoiceId || !invoiceXML) {
    res.status(400).json({ message: 'Missing parameters' });
  }

  const userId = (req as any).user;

  try {
    const result = await modifyInvoice(invoiceId, userId, invoiceXML);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const invoiceEncrypt = async (req: Request, res: Response) => {
  const invoiceXML = req.body;
  // get the secret key from the request
  const secretKey = req.query.secretKey as string;
  const userId = (req as any).user;
  try {
    const result = await storeEncryptedInvoice(invoiceXML, userId, secretKey);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const invoiceDecrypt = async (req: Request, res: Response) => {
  const invoiceId = req.query.invoiceId as string;
  const secretKey = req.query.secretKey as string;
  const userId = (req as any).user;
  try {
    const result = await showEncryptedInvoice(invoiceId, userId, secretKey);
    res.set('Content-Type', 'application/xml');
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const invoiceUpdateStatus = async (req: Request, res: Response) => {
  const invoiceId = req.params.invoiceId;
  const status = req.body.status as string;
  const userId = (req as any).user;
  try {
    const result = await updateStatus(invoiceId, userId, status);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const invoiceSend = async (req: Request, res: Response) => {
  const userId = (req as any).user;
  // expect a application/pdf content type
  const { receiverEmail, senderEmail, senderName, fileName, pdf } = req.body;

  try {
    const result = await sendInvoice(userId);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const invoiceSamples = async (req: Request, res: Response) => {
  const quantity = req.query.quantity;
  try {
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const clearDb = async (req: Request, res: Response) => {
  try {
    await clear();
    res.json({ message: 'All data has been deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
