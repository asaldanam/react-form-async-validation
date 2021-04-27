import { Router } from 'express';
import { validateTraveler } from './Traveler';
import { getAllUsers, addOneUser, updateOneUser, deleteOneUser } from './Users';


// User-route
const userRouter = Router();
userRouter.get('/all', getAllUsers);
userRouter.post('/add', addOneUser);
userRouter.put('/update', updateOneUser);
userRouter.delete('/delete/:id', deleteOneUser);

// Form-route
const travelerRouter = Router();
travelerRouter.post('/create:validate', validateTraveler);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/users', userRouter);
baseRouter.use('/traveler', travelerRouter);

export default baseRouter;
