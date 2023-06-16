import { db } from '../config/firebase';
import HTTPError from 'http-errors';

// Store a new customer for the user's company
async function storeCustomer(customerData : any, userId : string) {


    // TODO error checking

  // Get the user's document from the "users" collection
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();



  const userData = userDoc.data();
  const userCompany = userData.companyName;


  // Get the company document from the "companies" collection
  const companyRef = db.collection("companies").doc(userCompany);
  const companyDoc = await companyRef.get();

  // If the company document exists
  if (companyDoc.exists) {
    // Check if the customer already exists in the customers array
    const existingCustomers = companyDoc.data().customers || [];
    const customerExists = existingCustomers.some(
      (customer: any) => customer.companyName === customerData.companyName
    );

    if (!customerExists) {
      // Add the new customer to the customers array
      await companyRef.update({
        customers: [...existingCustomers, customerData],
      });
    } else {
      throw HTTPError(409, "Customer already exists.");
    }
  } else {
    throw HTTPError(404, "Company not found.");
  }
  // return the new customer data
  return { customerData }
}

// Retrieve all companies for a user
async function retrieveCompanies(userId: string) {
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();

  const userData = userDoc.data();
  const userCompany = userData.companyName;
  const companyRef = db.collection("companies").doc(userCompany);
  const companyDoc = await companyRef.get();

  const companies = companyDoc.data().customers || [];
  

  return companies;
}

// Retrieve a specific company by name for a user
async function retrieveCompany(companyName: string, userId: string) {
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();

  const userData = userDoc.data();
  const userCompany = userData.companyName;

  const companySnapshot = await db
    .collection("companies")
    .where("companyName", "==", userCompany)
    .where("companyName", "==", companyName)
    .get();

  if (!companySnapshot.empty) {
    const companyData = companySnapshot.docs[0].data();
    return { id: companySnapshot.docs[0].id, ...companyData };
  } else {
    throw HTTPError(404, "Company not found.");
  }
}

export { storeCustomer, retrieveCompanies, retrieveCompany };