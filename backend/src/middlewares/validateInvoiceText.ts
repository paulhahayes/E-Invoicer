import axios from 'axios';
import FormData from 'form-data';
import { NextFunction, Request, Response } from 'express';
import { js2xml } from 'xml-js';

export async function validateInvoiceText(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const text = req.body.trim();
    let xml = '';

    if (text) {
      // Get the first and last characters
      const firstChar = text[0];
      const lastChar = text[text.length - 1];
      if (firstChar === '<' && lastChar === '>') {
        xml = text;
      } else if (firstChar === '{' && lastChar === '}') {
        const jsonData = JSON.parse(text);
        const options = {
          compact: true,
          spaces: 4,
          ignoreComment: true,
          preserveNamespaces: true,
        };
        xml = js2xml(jsonData, options);
        req.body = xml;
      }
    }

    const api = axios.create({
      baseURL:
        'http://churros.eba-pyyazat7.ap-southeast-2.elasticbeanstalk.com',
    });

    // create form data
    const formData = new FormData();
    formData.append('file', Buffer.from(xml), {
      filename: 'invoice.xml',
      contentType: 'application/xml',
    });

    // send request
    const response = await api.post('/invoice/upload_file/v1', formData, {
      headers: formData.getHeaders(),
    });

    if (response.status === 200) {
      // get report_id
      const reportId = response.data.report_id;
      // get report
      const reportResponse = await api.get('/export/json_report/v1', {
        params: {
          report_id: reportId,
        },
      });
      // get report status

      const reportStatus = reportResponse.data;
      // console.log(reportStatus.syntax_evaluation['violations']);
      if (reportStatus.is_valid) {
        next();
      } else {
        // console.log(reportStatus.schema_evaluation['violations']);

        const keysToCheck = ['schema_evaluation', 'syntax_evaluation'];
        let combinedErrors = {};

        keysToCheck.forEach((key) => {
          if (reportStatus[key] && reportStatus[key]['violations']) {
            combinedErrors = {
              ...combinedErrors,
              ...reportStatus[key]['violations'],
            };
          }
        });
        res.status(400).json({
          message: reportStatus.schema_evaluation['violations'],
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: 'Possible API error, please try again later.',
    });
  }
}

/// OLD VALIDATION - ITS GOOD BUT WE NEED TO USE OTHER GROUPS API

//   let apiFormattedxml = xml.replace(/</g, '&lt;').replace(/>/g, '&gt;');

//   let VESID = 'org.oasis-open:invoice:2.1';

//   // set up request
//   const apiRequest = `<?xml version="1.0"?>
//   <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
//   <S:Body>
//   <validateRequestInput xmlns="http://peppol.helger.com/ws/documentvalidationservice/201701/" VESID="${VESID}" displayLocale="en">
//   <XML>${apiFormattedxml}
//   </XML>
//   </validateRequestInput>
//   </S:Body>
//   </S:Envelope>`;
//   // send request
//   const response = await axios.post(
//     'https://peppol.helger.com/wsdvs',
//     apiRequest,
//     {
//       headers: { 'Content-Type': 'text/xml' },
//     }
//   );
//   // response
//   const xmlString = response.data;
//   console.log(response.data);
//   const jsonXml = convert.xml2js(xmlString, { compact: true, spaces: 4 });
//   const result =
//     jsonXml['S:Envelope']['S:Body']['validateResponseOutput']['_attributes'][
//       'success'
//     ];
//   if (result === 'false') {
//     throw Error;
//   }
//   if (result === 'true') {
//     console.log('invoice validated');
//   }
//   next();
// } catch (err) {
//   return {
//     res: res.status(400).json({
//       message:
//         'Invalid invoice, must be PEPPOL standard org.oasis-open:invoice:2.1',
//     }),
//   };
// }
