const { Router } = require('express');
const Order = require('../models/Order');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const order = await OrderService.createOrder(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try{
      const getThemAll = await OrderService.AllOrders();
      res.send(getThemAll);
    } catch(err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try{
      const getRequestedOrder = await OrderService.getDesiredOrder(req.params.id);
      res.send(getRequestedOrder);
    } catch(err){
      next(err);
    }
  })




  .patch('/:id', (req, res, next) => {
    const orderId = Number(req.params.id);
    Order
      .patchById(orderId, req.body)
      .then(updatedOrder => res.send(updatedOrder))
      .catch(next);
  })

  .delete('/:id', async (req, res, next) => {
    try{
      const deleteOrder = await OrderService.deleteTheOrder(req.params.id);
      res.send(deleteOrder);
    } catch(err){
      next(err);
    }
  });


// .get('/', async (req, res, next) => {
//   Order
//     .getAll()
//     .then(order => res.send(order))
//     .catch(next);
// })
// .get('/:id', (req, res, next) => {
//   Order
//     .getById(req.params.id)
//     .then(orderID => res.send(orderID))
//     .catch(next);
// })
