import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// desc   Create new order
//@route  POST / api / orders
//access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req?.body;
  if (!orderItems?.length) {
    res.status(400);
    throw new Error('No Oder Items');
  } else {
    const order = new Order({
      orderItems: orderItems?.map((x) => ({
        ...x,
        product: x?.id || x?._id,
        _id: undefined
      })),
      user: req?.user?._id || (orderItems?.length && orderItems[0]?.user),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isDelivered: orderItems?.isDelivered || false
    });
    const createdOrder = await order.save();

    res.status(200).json(createdOrder);
  }
});

// desc   Get logged in user orders
//@route  GET /api/orders/myorders
//access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  // res.send("Get my orders");
  const orders = await Order.find({ user: req?.user?._id });
  res.status(200).json(orders);
});

// desc   Get order by id
//@route  GET /api/orders/:id
//access  Private
const getOrderById = asyncHandler(async (req, res) => {
  // res.send("Get order by id");

  const order = await Order.findById(req?.params?.id).populate('user', 'name email');

  if (order) {
    res.status(200).json(order);
  } else {
    // res.status(404).json({message: 'Order not found'});
    res.stats(404);
    throw new Error("Order not found")
  }
});

// desc   Update order to paid
//@route  PUT /api/orders/:id/pay
//access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // res.send("Update order to paid");
  const order = await Order.findById(req?.params?.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body?.id,
      status: req.body?.status,
      update_time: req.body?.update_time,
      email_address: req.body?.email_address,
    }
    const updateOrder = await order.save();
    res.status(200).json(updateOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// desc   Update order to delivered
//@route  PUT /api/orders/:id/delivery
//access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("Update order to delivered");
});

// desc   Update all orders
//@route  POST /api/orders
//access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("Get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
