import express from 'express';
import {placeOrder,placeOrderStripe,placeOrderRazorPay,allOrders,userOrders,updateStatus, verifyStripe, verifyRazorpay} from "../controller/orderController.js";
import adminAuth from '../middleware/adminauth.js';
import authUser from '../middleware/auth.js';

const orderRouter=express.Router();

orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

//Payment Features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorPay',authUser,placeOrderRazorPay);

//User Feature
orderRouter.post('/userorders',authUser,userOrders);

//verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default orderRouter;