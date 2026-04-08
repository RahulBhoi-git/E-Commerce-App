import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';
import razorpay from 'razorpay';

import crypto from "crypto";

//global variables
const currency="inr";
const deliveryCharge=10;

//placing orders using Stripe Method
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

//placing orders using razorpay Method
const razorpayInstance=new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET
})
//placing orders using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//place orders using Stripe Method
const placeOrderStripe = async (req, res) => {
  try {
    const {userId,items,amount,address}=req.body;
    const origin = req.headers.origin || "http://localhost:5173";
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items=items.map((item)=>({
      price_data:{
        currency:currency,
        product_data:{
          name:item.name
        },
        unit_amount:item.price*100
      },
      quantity:item.quantity
    }))
    line_items.push({
      price_data:{
        currency:currency,
        product_data:{
          name:'Delivery Charges'
        },
        unit_amount:deliveryCharge*100
      },
      quantity:1
    })
    const session=await stripe.checkout.sessions.create({
      success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode:'payment'
    })
    res.json({success:true,session_url:session.url});

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// Error exist
//Verify Stripe
const verifyStripe=async (req,res)=>{
  const {orderId,success,userId}=req.body;
  try {
    if(success==="true"){
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      await userModel.findByIdAndUpdate(userId,{cartData:{}});
      res.json({success:true});
    }else{
      await orderModel.findByIdAndUpdate(orderId);
      res.json({success:false});
    }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message});
    
  }
}
// place orders using Razorpay Method
const placeOrderRazorPay = async (req, res) => {
  try {
     const {userId,items,amount,address}=req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options={
      amount:amount*100,
      currency:currency.toUpperCase(),
      receipt:newOrder._id.toString()
    }
    await razorpayInstance.orders.create(options,(error,order)=>{
      if(error){
        console.log(error);
        return res.json({success:false,message:error});
      }
      res.json({success:true,order})
    })
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message});
    
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const {
      userId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    // 🔴 STEP 1: Create body
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    // 🔴 STEP 2: Generate expected signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    // 🔴 STEP 3: Compare signatures
    if (expectedSignature === razorpay_signature) {

      // ✅ Find order using receipt (your DB id)
      const order = await orderModel.findOne({ receipt: razorpay_order_id });

      if (!order) {
        return res.json({ success: false, message: "Order not found" });
      }

      // ✅ Update payment
      await orderModel.findByIdAndUpdate(order._id, { payment: true });

      // ✅ Clear cart
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      return res.json({ success: true });

    } else {
      return res.json({ success: false, message: "Invalid signature" });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// const verifyRazorpay=async (req,res)=>{
//   try {
//     const {userId,razorpay_order_id}=req.body;
    
//     if(!razorpay_order_id){
//       return res.json({success:false,message:"Order ID is missing"});
//     }
    
//     const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id);
    
//     if(orderInfo.status==="paid"){
//       await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
//       await userModel.findByIdAndUpdate(userId,{cartData:{}});
//       res.json({success:true,message:"Payment Verified"});
//     }else{
//       res.json({success:false,message:"Payment Failed"});
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({success:false,message:error.message});
//   }
// }
//User order data for Admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//User order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// update order status for admin panel
const updateStatus = async (req, res) => {
  try {
    const {orderId,status}=req.body;
    await orderModel.findByIdAndUpdate(orderId,{status});
    res.json({success:true,message:'Status Updated'})
  } catch (error) {
     console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorPay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay,
};
