import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import {
    createCustomer,
    getCustomers,
    getCustomer,

} from '../controllers/companyController';


const router = Router();


router.post('/customers', authenticate, createCustomer);
router.get('/customers', authenticate, getCustomers);
router.get('/customers/:id', authenticate, getCustomer);

export default router;
