import { Response, Request } from 'express';

import {
  authRegisterCompany,
  authRegister,
  authLogin,
  authLogout,
  authRegisterCompanyV2,
} from '../functions/auth';


export const registerCompany = async (req: Request, res: Response) => {
  const { companyName, companyEmail, numEmployees, ABN } = req.body;
  const apiVersion = (req as any).apiVersion;

  try {
    let result: { companyKey: string };
    switch (apiVersion) {
      case 2:
        const { companyAddress } = req.body;
        result = await authRegisterCompanyV2(
          companyName,
          companyEmail,
          numEmployees,
          ABN, 
          companyAddress
        );
        break;
      default:
        result = await authRegisterCompany(
          companyName,
          companyEmail,
          numEmployees,
          ABN
        );
    }
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, name, companyKey } = req.body;
  try {
    const result = await authRegister(email, password, name, companyKey);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authLogin(email, password);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  const token = req.headers.token as string;
  const userId = (req as any).user;
  try {
    const result = await authLogout(userId, token);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
