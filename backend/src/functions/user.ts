import HTTPError from 'http-errors';
import { queryAllUsers, queryUserById } from '../service/UserTable';

async function getAllUsers() {
  return await queryAllUsers();
}

async function getUserById(userId: string) {
  const user = await queryUserById(userId);
  if (!user) {
    throw HTTPError(404, 'User not found');
  }
  return user;
}

export { getAllUsers, getUserById };
