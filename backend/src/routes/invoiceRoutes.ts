import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { validateInvoiceText } from '../middlewares/validateInvoiceText';
import { validateInvoiceFile } from '../middlewares/validateInvoiceFile';
import { setVersion } from '../middlewares/setVersion';
import {
  invoiceShowRange,
  invoiceShow,
  invoiceDelete,
  invoiceStore,
  invoiceEncrypt,
  invoiceDecrypt,
  invoiceModify,
  invoiceUpdateStatus,
  retriveCompInvoices,
  countInvoices,
  invoiceSamples,
  invoiceSend,
  clearDb,
} from '../controllers/invoiceController';

// Create a new router

const router: Router = Router();

// PUBLIC ROUTES

router.post(
  '/invoice/store',
  authenticate,
  validateInvoiceText,
  setVersion(1),
  invoiceStore
);

router.post(
  '/invoice/store/v3',
  authenticate,
  validateInvoiceText,
  setVersion(3),
  invoiceStore
);

router.post(
  '/invoice/upload/',
  authenticate,
  validateInvoiceFile,
  validateInvoiceText,
  setVersion(2),
  invoiceStore
);

router.get(
  '/invoice/show/:invoiceId',
  authenticate,
  setVersion(1),
  invoiceShow
);

router.get('/invoice/showRange', authenticate, setVersion(1), invoiceShowRange);

router.put(
  '/invoice/modify/:invoiceId',
  authenticate,
  validateInvoiceText,
  invoiceModify
);

// V2 PUBLIC ROUTES

router.post(
  '/invoice/store/v2',
  authenticate,
  validateInvoiceText,
  setVersion(2),
  invoiceStore
);

router.get(
  '/invoice/show/v2/:invoiceId',
  authenticate,
  setVersion(2),
  invoiceShow
);

router.get(
  '/invoice/showRange/v2',
  authenticate,
  setVersion(2),
  invoiceShowRange
);

router.get('/invoice/gimmie', invoiceSamples); // NOT IMPLEMENTED

router.delete('/invoice/delete/:invoiceId', authenticate, invoiceDelete);

router.post(
  '/invoice/encrypt',
  authenticate,
  validateInvoiceText,
  invoiceEncrypt
);

router.get('/invoice/decrypt', authenticate, invoiceDecrypt);
// PRIVATE ROUTES

router.get(
  '/invoice/retrieveComapanyInvoices',
  authenticate,
  retriveCompInvoices
);

router.get(
  '/invoice/retrieveComapanyInvoicesCount/',
  authenticate,
  countInvoices
);

router.put(
  '/invoice/updateStatus/:invoiceId',
  authenticate,
  invoiceUpdateStatus
);

router.post('/invoice/send/', authenticate, validateInvoiceFile, invoiceSend);

/**
 * @swagger
 * /clear:
 *   delete:
 *     summary: Delete all users, companies, and invoices from the database
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: All data has been deleted from the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that all data has been deleted
 *       500:
 *         description: Internal server error
 */
router.delete('/clear', clearDb);

/**
 * TODO:
 * router.get(
  "/invoice/upload",
  multer(multerConfig).single("file"),
  (req, res) => {
    console.log(req.file);
  }
);

 */

export default router;
