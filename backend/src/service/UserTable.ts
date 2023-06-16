import { db } from '../config/firebase';
import bcrypt from 'bcrypt';
import HTTPError from 'http-errors';
import { UserType } from '../models/user';
// userRegister: checks if email has been registered
export const queryUserByEmail = async (email: string) => {
  try {
    const querySnapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get();
    if (querySnapshot.empty) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log('Error querying');
    throw HTTPError(500, error.message);
  }
};

// authorisation in userLogin: checks if email and password are correct
export const queryLoginValid = async (email: string, password: string) => {
  try {
    const querySnapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get();
    if (querySnapshot.empty) {
      return false;
    } else {
      const userData = querySnapshot.docs[0].data();
      const encrpytedPassword = userData.hash;
      const valid = await bcrypt.compare(password, encrpytedPassword);
      return valid;
    }
  } catch (error) {
    console.log('Error querying');
    throw HTTPError(500, error.message);
  }
};

// InvoiceStore/Show/showRange/delete: Returns userData given userId
export const queryUserById = async (userId: string) => {
  try {
    const querySnapshot = await db.collection('users').doc(userId).get();

    return querySnapshot.data();
  } catch (error) {
    throw HTTPError(404, 'User not found');
  }
};

// Used in getAllUsers
export const queryAllUsers = async () => {
  try {
    const allUsers: UserType[] = [];
    const querySnapshot = await db.collection('users').get();
    querySnapshot.forEach((doc: any) => allUsers.push(doc.data()));
    return allUsers;
  } catch (error) {
    console.log('Error querying');
    throw HTTPError(500, error.message);
  }
};

export const queryUserExists = async (userId: string) => {
  try {
    const querySnapshot = await db.collection('users').doc(userId).get();
    return querySnapshot.exists;
  } catch (error) {
    throw HTTPError(403, 'User does not exist');
  }
};
