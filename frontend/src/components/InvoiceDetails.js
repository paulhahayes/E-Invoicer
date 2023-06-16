/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

export default function InvoiceDetails({ invoice, closeInvoice }) {

    return (
        <div className="overlay relative">
            <div className="bg-white h-full flex flex-col text-black w-2/5 m-2 absolute top-0 right-0 overflow-hidden">
                <div className="flex justify-between mt-16">
                    <h2 className="ml-8">{invoice.status}</h2>
                    <div className="w-12 h-12 bg-violet-600 rounded-full mr-8"></div>
                </div>
                <div className="mt-12 border border-gray-500 mr-8 ml-8 rounded-xl">
                    <div className="flex justify-between">
                        <p className="font-roboto font-bold text-lg mt-4 ml-5">Invoice number</p>
                        <p className="font-roboto font-bold text-lg mt-4 mr-5">Billed to</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-roboto font-normal text-md ml-5">Invoice Id: {invoice.invoiceId}</p>
                        <p className="font-roboto font-normal text-md mr-5">{invoice.customerPhone}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-roboto font-normal text-md ml-5">Issued Date: {invoice.issueDate}</p>
                        <p className="font-roboto font-normal text-md mr-5">{invoice.customerName}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                        <p className="font-roboto font-normal text-md ml-5">Due Date: {invoice.dueDate}</p>
                        <p className="font-roboto font-normal text-md mr-5">{invoice.customerEmail}</p>
                    </div>
                </div>
                <hr className="mt-9 ml-5 mr-5 border-gray-500"/>
                <div>
                    <div className="flex justify-between">
                        <p className="font-roboto font-bold text-lg mt-2 ml-12">Sub Total</p>
                        <p className="font-roboto font-bold text-lg mt-2 mr-12 text-green-800">${invoice.taxExclusiveAmount}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-roboto font-normal text-md mt-2 ml-12">Discount</p>
                        <p className="font-roboto font-bold text-md mt-2 mr-12">$0</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-roboto font-normal text-md mt-2 ml-12">Total Tax</p>
                        <p className="font-roboto font-bold text-md mt-2 mr-12">${invoice.tax}</p>
                    </div>
                </div>
                <hr className="mt-2 ml-5 mr-5 border-gray-500"/>
                <div className="flex justify-between">
                    <p className="font-roboto font-bold text-2xl mt-2 ml-12">Total</p>
                    <p className="font-roboto font-bold text-2xl mt-2 mr-12 text-green-800">${invoice.amount}</p>
                </div>
                <button onClick={closeInvoice} className="mt-16 ml-8 bg-violet-600 h-12 w-[90%] text-xl rounded-xl font-extrabold text-white font-roboto">Close</button>
            </div>
        </div>
    );
}  