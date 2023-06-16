import { db } from "../config/firebase";
import HTTPError from "http-errors";

// For companyRegister
export const queryCompanyExists = async (companyName: string) => {
  try {
    const querySnapshot = await db
      .collection("companies")
      .where("companyName", "==", companyName)
      .get();
    if (querySnapshot.empty) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log("Error querying");
    throw HTTPError(500, error.message);
  }
};

// For company register: if company email already exists
export const queryCompanyByEmail = async (companyEmail: string) => {
  try {
  const querySnapshot = await db
    .collection("companies")
    .where("companyEmail", "==", companyEmail)
    .get();
  if (querySnapshot.empty) {
    return false;
  } else {
    return true;
  }
  } catch (error) {
    console.log("Error querying");
    throw HTTPError(500, error.message);
  }
};

// For userRegister. checks if company exists
export const queryUserByCompanyKey = async (companyName: string) => {
  try {
  const querySnapshot = await db
    .collection("companies")
    .where("companyKey", "==", companyName)
    .get();
  if (querySnapshot.empty) {
    return false;
  } else {
    return true;
  }
  } catch (error) {
    console.log("Error querying");
    throw HTTPError(500, error.message);
  }
};

// export const queryAllCompanys = async () => {
//   const querySnapshot = await db.collection("companies").get();
//   const companies = [];
//   querySnapshot.forEach((doc) => {
//     companies.push(doc.data());
//   });
//   return companies;
// };


// export const queryCompanyCount = async () => {
//   const querySnapshot = await db.collection("companies").get();
//   return querySnapshot.size;
// };


