const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  

  //CREATES,STORES NEW ORDER & SENDS TEXT MSG
  static async createOrder({ quantity }) {
  
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    const order = await Order.insert({ quantity });

    return order;
  }

  //GETS ALL ORDERS AND & SENDS
  static async AllOrders() {

    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      'Got all of your orders'
    );

    const order = await Order.getAll();
    return order;
  }

  //GETS ORDER BY ID AND & SENDS TEXT MSG
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

    const order = await Order.deleteOrder(id);
    return order;
  }




  //PATCHES AN ORDER AND SENDS A TEXT MSG
  static async patchOrder(id, quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order with No.${id} has been updated`
    );
  
    const order = await Order.patchById(id, quantity);
    return order;
  }

  
};
