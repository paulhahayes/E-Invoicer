import { Response, Request } from 'express';


import {
    storeCustomer,
    retrieveCompanies,
    retrieveCompany
} from '../functions/company';


export const createCustomer = async (req: Request, res: Response) => {

    const userId = (req as any).user;
    const company = req.body;
    try {
        const result = await storeCustomer(company, userId);
        res.json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}



export const getCustomer = async (req: Request, res: Response) => {
    const userId = (req as any).user;
    const companyId = req.params.id;
    try {
        const result = await retrieveCompany(companyId, userId);
        res.json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}


export const getCustomers = async (req: Request, res: Response) => {
    const userId = (req as any).user;
    try {
        const result = await retrieveCompanies(userId);

        res.json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}
