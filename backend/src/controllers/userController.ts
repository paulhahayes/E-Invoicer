import { Response } from 'express';
import { RequestUser } from '../models/user';
import { getAllUsers, getUserById } from '../functions/user';

export const getUsers = async (req: RequestUser, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getUser = async (req: RequestUser, res: Response) => {
  const user = req.params.id;
  try {
    res.json(await getUserById(user));
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
