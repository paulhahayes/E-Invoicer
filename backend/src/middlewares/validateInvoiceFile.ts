import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { multerConfig } from '../config/multer';
import { js2xml } from 'xml-js';

const upload = multer(multerConfig);

export function validateInvoiceFile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  upload.single('file')(req, res, async (err: any) => {
    if (err) {
      console.error('Error processing form data:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    let content = req.file.buffer.toString('utf8');
    const fileType = req.file.mimetype;
    req.body = content;
    if (!content) {
      return res.status(400).json({ message: 'No file content' });
    }

    if (!fileType) {
      return res.status(400).json({ message: 'No file type' });
    }

    try {
      if (fileType === 'application/json' || fileType === 'text/json') {
        const jsonData = JSON.parse(content);
        const options = {
          compact: true,
          spaces: 4,
          ignoreComment: true,
          preserveNamespaces: true,
        };
        let xmlData = js2xml(jsonData, options);
        req.body = xmlData;
      } else if (fileType === 'application/csv' || fileType === 'text/csv') {
        // const jsonArray = await csvtojson().fromString(content);
        // const options = { compact: true, spaces: 4 };
        // const xmlData = js2xml({ Invoice: jsonArray }, options);
        // req.body = xmlData;
      }
    } catch (conversionErr) {
      console.error('Error converting file content:', conversionErr);
      return res.status(400).json({ message: 'Error converting file content' });
    }
    next();
  });
}
