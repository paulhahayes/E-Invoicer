/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { XMLParser } from 'fast-xml-parser';

// Register the pdfMake fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const handleDownload = (docDefinition) => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.download('invoice.pdf');
};

const InvoicePdf = ({ invoice }) => {

  let invoiceId = invoice.invoiceId;
  let issueDate = invoice.issueDate;
  let dueDate = invoice.dueDate;
  let transactionId = invoice.transactionId;
  let status = invoice.status;
  let currency = invoice.currency;
  let customer = invoice.customer;
  let customerPhone = invoice.customerPhone;
  let customerEmail = invoice.customerEmail;
  let tax = invoice.tax;
  let supplier = invoice.supplier;
  let amount = invoice.amount;

  // if type of invoice is string, convert to xml
  if (typeof invoice === 'string') {
    const parser = new XMLParser();
    const invoiceJSON = parser.parse(invoice);
    
    invoiceId = parseFloat(
      invoiceJSON['Invoice']['cac:LegalMonetaryTotal']['cbc:TaxExclusiveAmount']
    )
    issueDate = invoiceJSON['Invoice']['cbc:IssueDate']
    dueDate = invoiceJSON['Invoice']['cbc:DueDate']
    transactionId = invoiceJSON['Invoice']['cbc:ID']
    status = 'Paid'
    currency = invoiceJSON['Invoice']['cbc:DocumentCurrencyCode']
    customer = invoiceJSON['Invoice']['cac:AccountingCustomerParty']['cac:Party'][
      'cac:PartyName'
    ]['cbc:Name']
    customerPhone =
      invoiceJSON['Invoice']['cac:AccountingCustomerParty']['cac:Party'][
        'cac:Contact'
      ]['cbc:Telephone']
    customerEmail =
      invoiceJSON['Invoice']['cac:AccountingCustomerParty']['cac:Party'][
        'cac:Contact'
      ]['cbc:ElectronicMail']
    tax = parseFloat(invoiceJSON['Invoice']['cac:TaxTotal']['cbc:TaxAmount'])
    supplier =
      invoiceJSON['Invoice']['cac:AccountingSupplierParty']['cac:Party'][
        'cac:PartyName'
      ]['cbc:Name']
    amount = parseFloat(
        invoiceJSON['Invoice']['cac:LegalMonetaryTotal']['cbc:PayableAmount']
    )
  }
    
  const docDefinition = {
    content: [
      { text: 'Invoice', style: 'header' },
      { text: `Invoice Number: ${invoiceId}`, style: 'subheader' },
      { text: `Invoice IssueDate: ${issueDate}`, style: 'subheader' },
      { text: `Invoice Due Date: ${dueDate}`, style: 'subheader' },
      { text: `Invoice Transaction Number: ${transactionId}`, style: 'subheader' },
      { text: `Invoice Status: ${status}`, style: 'subheader' },
      { text: `Currency: ${currency}`, style: 'subheader' },
      { text: `Customer: ${customer}`, style: 'subheader' },
      { text: `Customer Phone: ${customerPhone}`, style: 'subheader' },
      { text: `Customer Email: ${customerEmail}`, style: 'subheader' },
      { text: `Tax: ${tax}`, style: 'subheader'},
      { text: `Supplier: ${supplier}`, style: 'subheader' },
      { text: `Total: $${amount}`, style: 'subheader' },
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 14,
        margin: [0, 10, 0, 5],
      },
    },
  };

  return (
    <div>
        <button className="bg-main-purple text-white rounded-md hover:bg-violet-900 mt-2 ml-[90%] text-[16px] h-7 w-32 mb-1" onClick={() => handleDownload(docDefinition)}>Download PDF</button>
    </div>
  );
};

export default InvoicePdf;
