import { db } from '../config/firebase';

import { queryLoginValid, queryUserByEmail } from '../service/UserTable';
import {
  queryCompanyExists,
  queryCompanyByEmail,
  queryUserByCompanyKey,
} from '../service/CompanyTable';
import * as EmailValidator from 'email-validator';
import HTTPError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function authRegisterCompany(
  companyName: string,
  companyEmail: string,
  numEmployees: number,
  ABN: number
) {
  // invalid email
  if (!EmailValidator.validate(companyEmail)) {
    throw HTTPError(400, 'Email is invalid');
  }

  if (ABN.toString().length !== 11) {
    throw HTTPError(400, 'ABN invalid');
  }

  // check if company email already exists
  const companyEmailExists = await queryCompanyByEmail(companyEmail);
  if (companyEmailExists) {
    throw HTTPError(409, 'Company email is already registered');
  }

  // check if company already exists
  const exists = await queryCompanyExists(companyName);
  if (exists) {
    throw HTTPError(409, 'Company is already registered');
  }

  try {
    const company = db.collection('companies');

    // not secure but helpful for early testing
    const companyKey = 'K' + new Date().getTime().toString();

    const newCompany = {
      companyName: companyName,
      companyEmail: companyEmail,
      companyKey: companyKey,
      numEmployees: numEmployees,
      ABN: ABN,
    };

    await company.doc(companyName).set(newCompany);
    return { companyKey: companyKey };
  } catch (error) {
    throw HTTPError(500, error.message);
  }
}

async function authRegister(
  email: string,
  password: string,
  name: string,
  companyKey: string
) {
  // invalid email
  if (!EmailValidator.validate(email)) {
    throw HTTPError(400, 'Email is invalid.');
  }

  //  check if email already exists
  const emailAlreadyExists = await queryUserByEmail(email);
  if (emailAlreadyExists) {
    throw HTTPError(409, 'Email is already registered');
  }

  // invalid companyKey
  const companyKeyExists = await queryUserByCompanyKey(companyKey);
  if (!companyKeyExists) {
    throw HTTPError(404, 'Company key does not exist');
  }

  try {
    const user = db.collection('users');
    const userId = new Date().getTime().toString();
    // password encryption
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    // tokens
    const token = jwt.sign({ userId: userId }, 'cheesecake', {
      expiresIn: '1d',
    });

    //find companyName based on company key
    const querySnapshot = await db
      .collection('companies')
      .where('companyKey', '==', companyKey)
      .get();
    if (querySnapshot.empty) {
      throw HTTPError(404, 'Company key does not exist');
    }
    const companyData = querySnapshot.docs[0].data();

    const userObject = {
      userId,
      email,
      hash,
      name,
      companyName: companyData.companyName,
      tokens: [token],
    };

    // set in database
    await user.doc(userId).set(userObject);

    return {
      token: token,
      userId: userId,
    };
  } catch (error) {
    throw HTTPError(500, error.message);
  }
}

async function authLogin(email: string, password: string) {
  // invalid email
  if (!EmailValidator.validate(email)) {
    throw HTTPError(400, 'Email is invalid.');
  }

  // Check is user with email exists
  if (!(await queryLoginValid(email, password))) {
    throw HTTPError(
      401,
      'User with this email does not exist or password is incorrect'
    );
  }

  // Get userData
  const querySnapshot = await db
    .collection('users')
    .where('email', '==', email)
    .get();
  const userData = querySnapshot.docs[0].data();

  //Generate token
  const token = jwt.sign({ userId: userData.userId }, 'cheesecake', {
    expiresIn: '1d',
  });

  // Append new token to the existing token array
  userData.tokens.push(token);

  // Update user document in Firebase
  await db.collection('users').doc(userData.userId).update({
    tokens: userData.tokens,
  });

  return {
    token: token,
    userId: userData.userId,
  };
}

async function authLogout(userId: string, token: string) {
  //Authenticate token

  // find user in db
  const userRef = db.collection('users').doc(userId);
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    throw HTTPError(403, 'Invalid token.');
  }

  if (!userDoc.data().tokens.includes(token)) {
    throw HTTPError(403, 'User already logged out');
  }
  // remove token from user object for that particular user
  const updatedTokens = userDoc.data().tokens.filter((t: any) => t !== token);

  // update user object in db
  await userRef.update({ tokens: updatedTokens });

  return { message: 'User logged out succesfully' };
}



//TODO make a seperate file for version 2 of auth
async function authRegisterCompanyV2(
  companyName: string,
  companyEmail: string,
  numEmployees: number,
  ABN: number,
  companyAddress: any
) {

  // invalid email
  if (!EmailValidator.validate(companyEmail)) {
    throw HTTPError(400, 'Email is invalid');
  }

  if (ABN.toString().length !== 11) {
    throw HTTPError(400, 'ABN invalid');
  }

  // check if company email already exists
  const companyEmailExists = await queryCompanyByEmail(companyEmail);
  if (companyEmailExists) {
    throw HTTPError(409, 'Company email is already registered');
  }

  // check if company already exists
  const exists = await queryCompanyExists(companyName);
  if (exists) {
    throw HTTPError(409, 'Company is already registered');
  }

  try {
    const company = db.collection('companies');

    // not secure but helpful for early testing
    const companyKey = 'K' + new Date().getTime().toString();

    const newCompany = {
      companyName: companyName,
      companyEmail: companyEmail,
      companyKey: companyKey,
      numEmployees: numEmployees,
      ABN: ABN,
      companyAddress,
    };

    await company.doc(companyName).set(newCompany);
    return { companyKey: companyKey };
  } catch (error) {
    throw HTTPError(500, error.message);
  }
}


export { authRegister, authLogin, authLogout, authRegisterCompany, authRegisterCompanyV2 };
