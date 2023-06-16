import { Options } from 'multer';
import multer from 'multer';

export const multerConfig: Options = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const formats = [
      'application/json',
      'text/xml',
      'application/xml',
      'application/csv',
      'text/csv',
    ];
    if (formats.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      return cb(new Error('Format not accepted'));
    }
  },
} as Options;
