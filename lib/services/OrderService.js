const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  

  //CREATES,STORES NEW ORDER & SENDS TEXT MSG
  static async createOrder({ quantity }) {
    //send text
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    //store the order
    const order = await Order.insert({ quantity });

    return order;
  }

  //GETS ALL ORDERS AND & SENDS
  static async AllOrders() {
    //send text
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      'Got all of your orders'
    );

    //get all orders
    const order = await Order.getAll();
    return order;
  }

  //GETS ALL ORDERS AND & SENDS TEXT MSG
  static async getDesiredOrder(id) {
    //send text
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order information with No.${id} requested`
    );
  
    //get desired order
    const order = await Order.getById(id);
    return order;
  }

  //DELETES ORDER AND & SENDS TEXT MSG
  static async deleteTheOrder(id) {
    //send text
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order with No.${id} has been deleted`
    );
  
    //get desired order
    const order = await Order.deleteOrder(id);
    console.log('THISSSSS', order);
    return order;
  }

  
};
