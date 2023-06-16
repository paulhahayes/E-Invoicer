import * as xmlbuilder from 'xmlbuilder'

export const generateInvoice = (formData) => {
  const supplier = formData.userData
  const customer = formData.customerData
  if (!supplier.userDetails) {
    supplier.userDetails = {}
  }
  const supplierContact = supplier.userDetails

  // console.log('supplier', supplier)
  // console.log('customer', customer)
  // Initialize the UBL XML document
  const invoice = xmlbuilder
    .create('Invoice', {
      version: '1.0',
      encoding: 'UTF-8',
      standalone: true,
    })
    .att('xmlns', 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2')
    .att(
      'xmlns:cac',
      'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2'
    )
    .att(
      'xmlns:cbc',
      'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2'
    )

  // general
  invoice.ele(
    'cbc:CustomizationID',
    'urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0'
  )
  invoice.ele('cbc:ProfileID', 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0')
  invoice.ele('cbc:ID', formData.invoiceNumber)
  invoice.ele('cbc:IssueDate', formData.date)
  invoice.ele('cbc:DueDate', formData.dueDate)
  invoice.ele('cbc:InvoiceTypeCode', '380')
  invoice.ele('cbc:DocumentCurrencyCode', formData.currency)
  invoice.ele('cbc:BuyerReference', 'n/a')

  // Add the AccountingSupplierParty element
  const accountingSupplierParty = invoice.ele('cac:AccountingSupplierParty')
  const party = accountingSupplierParty.ele('cac:Party')
  party.ele('cbc:EndpointID', { schemeID: '0151' }, supplier.ABN)
  const partyIdentification = party.ele('cac:PartyIdentification')
  partyIdentification.ele('cbc:ID', { schemeID: '0151' }, supplier.ABN)

  // Add the PartyName
  const partyName = party.ele('cac:PartyName')
  partyName.ele('cbc:Name', supplier.companyName)
  const sAdrs = supplier.companyAddress || {
    street: 'n/a',
    suburb: 'n/a',
    postcode: 'n/a',
    state: 'n/a',
    countryCode: 'n/a',
  }

  // Add the PostalAddress
  const postalAddress = party.ele('cac:PostalAddress')
  postalAddress.ele('cbc:StreetName', sAdrs.street)
  postalAddress.ele('cbc:CityName', sAdrs.suburb)
  postalAddress.ele('cbc:PostalZone', sAdrs.postcode)
  postalAddress.ele('cbc:CountrySubentity', sAdrs.state)
  const country = postalAddress.ele('cac:Country')
  country.ele('cbc:IdentificationCode', sAdrs.countryCode)

  // Add the PartyTaxScheme
  const partyTaxScheme = party.ele('cac:PartyTaxScheme')
  partyTaxScheme.ele('cbc:CompanyID', supplier.ABN)
  const taxScheme = partyTaxScheme.ele('cac:TaxScheme')
  taxScheme.ele('cbc:ID', 'GST')

  // Add the PartyLegalEntity
  const partyLegalEntity = party.ele('cac:PartyLegalEntity')
  partyLegalEntity.ele('cbc:RegistrationName', supplier.companyName)
  partyLegalEntity.ele('cbc:CompanyID', { schemeID: '0151' }, supplier.ABN)

  // Add the Contact
  const contact = party.ele('cac:Contact')
  contact.ele('cbc:Name', supplierContact.name || 'n/a')
  contact.ele('cbc:Telephone', supplierContact.phone || 'n/a')
  contact.ele('cbc:ElectronicMail', supplierContact.email || 'n/a')
  // Add the AccountingCustomerParty element
  const accountingCustomerParty = invoice.ele('cac:AccountingCustomerParty')
  const customerParty = accountingCustomerParty.ele('cac:Party')

  customerParty.ele('cbc:EndpointID', { schemeID: '0151' }, customer.contactABN)
  const customerPartyIdentification = customerParty.ele(
    'cac:PartyIdentification'
  )
  customerPartyIdentification.ele(
    'cbc:ID',
    { schemeID: '0151' },
    customer.contactABN
  )

  // Add the PartyName
  const customerPartyName = customerParty.ele('cac:PartyName')
  customerPartyName.ele('cbc:Name', customer.companyName)

  // Add the PostalAddress
  const customerPostalAddress = customerParty.ele('cac:PostalAddress')
  customerPostalAddress.ele(
    'cbc:StreetName',
    customer.Street + ' ' + customer.StreetNumber
  )
  customerPostalAddress.ele('cbc:CityName', customer.City)
  customerPostalAddress.ele('cbc:PostalZone', customer.PostCode)
  customerPostalAddress.ele('cbc:CountrySubentity', customer.State)
  const customerCountry = customerPostalAddress.ele('cac:Country')
  customerCountry.ele('cbc:IdentificationCode', customer.CountryCode)

  // Add the PartyTaxScheme
  const customerPartyTaxScheme = customerParty.ele('cac:PartyTaxScheme')
  customerPartyTaxScheme.ele('cbc:CompanyID', customer.contactABN)
  const customerTaxScheme = customerPartyTaxScheme.ele('cac:TaxScheme')
  customerTaxScheme.ele('cbc:ID', 'GST')

  // Add the PartyLegalEntity
  const customerPartyLegalEntity = customerParty.ele('cac:PartyLegalEntity')
  customerPartyLegalEntity.ele('cbc:RegistrationName', customer.companyName)
  customerPartyLegalEntity.ele(
    'cbc:CompanyID',
    { schemeID: '0151' },
    customer.contactABN
  )

  // Add the Contact
  const customerContact = customerParty.ele('cac:Contact')
  customerContact.ele('cbc:Name', customer.contactName)
  customerContact.ele('cbc:Telephone', customer.contactPhone)
  customerContact.ele('cbc:ElectronicMail', customer.contactEmail)

  // Add the Delivery element
  const delivery = invoice.ele('cac:Delivery')

  // Add the DeliveryLocation element
  const deliveryLocation = delivery.ele('cac:DeliveryLocation')
  const deliveryAddress = deliveryLocation.ele('cac:Address')
  deliveryAddress.ele('cbc:AdditionalStreetName', customer.Street)
  deliveryAddress.ele('cbc:CityName', customer.City)
  deliveryAddress.ele('cbc:PostalZone', customer.PostCode)
  const deliveryCountry = deliveryAddress.ele('cac:Country')
  deliveryCountry.ele('cbc:IdentificationCode', customer.CountryCode)

  // Add the DeliveryParty element
  const deliveryParty = delivery.ele('cac:DeliveryParty')
  const deliveryPartyName = deliveryParty.ele('cac:PartyName')
  deliveryPartyName.ele('cbc:Name', customer.companyName)

  const paymentMeans = invoice.ele('cac:PaymentMeans')
  paymentMeans.ele('cbc:PaymentMeansCode', { name: 'Credit transfer' }, '30')
  paymentMeans.ele('cbc:PaymentID', '000167212100')

  const payeeFinancialAccount = paymentMeans.ele('cac:PayeeFinancialAccount')
  payeeFinancialAccount.ele('cbc:ID', 'ACCOUNTNUMBER')
  payeeFinancialAccount.ele('cbc:Name', 'ACCOUNTNAME')

  const financialInstitutionBranch = payeeFinancialAccount.ele(
    'cac:FinancialInstitutionBranch'
  )
  financialInstitutionBranch.ele('cbc:ID', 'BSB')

  // Add the PaymentTerms element
  const paymentTerms = invoice.ele('cac:PaymentTerms')
  const termInfo = formData.paymentTerms
  if (termInfo == 0) {
    paymentTerms.ele('cbc:Note', 'Immediately.')
  } else {
    paymentTerms.ele(
      'cbc:Note',
      `${formData.paymentTerms} days from invoice date`
    )
  }

  // Calculate the sum of invoice line net amounts, the total tax amount, and the total amount with VAT
  const lineExtensionAmount = formData.items.reduce(
    (acc, item) => acc + item.amount,
    0
  )
  const taxAmount = lineExtensionAmount * (formData.taxRate / 100)
  const taxInclusiveAmount = lineExtensionAmount + taxAmount

  // Create the <cac:TaxTotal> element
  const taxTotal = invoice.ele('cac:TaxTotal')
  taxTotal.ele('cbc:TaxAmount', { currencyID: 'AUD' }, taxAmount.toFixed(2))

  const taxSubtotal = taxTotal.ele('cac:TaxSubtotal')
  taxSubtotal.ele(
    'cbc:TaxableAmount',
    { currencyID: 'AUD' },
    lineExtensionAmount.toFixed(2)
  )
  taxSubtotal.ele('cbc:TaxAmount', { currencyID: 'AUD' }, taxAmount.toFixed(2))

  const taxCategory = taxSubtotal.ele('cac:TaxCategory')
  taxCategory.ele('cbc:ID', 'S')
  taxCategory.ele('cbc:Percent', formData.taxRate)

  const taxSchemea = taxCategory.ele('cac:TaxScheme')
  taxSchemea.ele('cbc:ID', formData.taxScheme)

  // Create the <cac:LegalMonetaryTotal> element
  const legalMonetaryTotal = invoice.ele('cac:LegalMonetaryTotal')
  legalMonetaryTotal.ele(
    'cbc:LineExtensionAmount',
    { currencyID: 'AUD' },
    lineExtensionAmount.toFixed(2)
  )
  legalMonetaryTotal.ele(
    'cbc:TaxExclusiveAmount',
    { currencyID: 'AUD' },
    lineExtensionAmount.toFixed(2)
  )
  legalMonetaryTotal.ele(
    'cbc:TaxInclusiveAmount',
    { currencyID: 'AUD' },
    taxInclusiveAmount.toFixed(2)
  )
  legalMonetaryTotal.ele(
    'cbc:AllowanceTotalAmount',
    { currencyID: 'AUD' },
    '0.00'
  )
  legalMonetaryTotal.ele('cbc:ChargeTotalAmount', { currencyID: 'AUD' }, '0.00')
  legalMonetaryTotal.ele('cbc:PrepaidAmount', { currencyID: 'AUD' }, '0.00')
  legalMonetaryTotal.ele(
    'cbc:PayableAmount',
    { currencyID: 'AUD' },
    taxInclusiveAmount.toFixed(2)
  )

  const createInvoiceLine = (item, index) => {
    const invoiceLine = invoice.ele('cac:InvoiceLine')
    invoiceLine.ele('cbc:ID', index + 1)
    invoiceLine.ele('cbc:InvoicedQuantity', { unitCode: 'E99' }, item.quantity)
    invoiceLine.ele(
      'cbc:LineExtensionAmount',
      { currencyID: 'AUD' },
      item.amount.toFixed(2)
    )

    const itemElement = invoiceLine.ele('cac:Item')
    itemElement.ele('cbc:Description', item.description)
    itemElement.ele('cbc:Name', item.item)

    const taxCategory = itemElement.ele('cac:ClassifiedTaxCategory')
    taxCategory.ele('cbc:ID', 'S')
    taxCategory.ele('cbc:Percent', formData.taxRate)

    const taxSch = taxCategory.ele('cac:TaxScheme')
    taxSch.ele('cbc:ID', formData.taxScheme)

    const price = invoiceLine.ele('cac:Price')
    const priceAmount = parseFloat(item.price).toFixed(2) || null
    price.ele('cbc:PriceAmount', { currencyID: 'AUD' }, priceAmount)
  }

  // Iterate over the formData.items array and create an InvoiceLine for each item
  formData.items.forEach((item, index) => {
    createInvoiceLine(item, index)
  })

  // Convert the XML structure to a string
  const xmlString = invoice.end({ pretty: true })
  return xmlString
}
