const { DomainPage } = require('twilio/lib/rest/api/v2010/account/sip/domain');
const pool = require('../utils/pool');

module.exports = class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }


  //INSERT ORDER
  static async insert({quantity}) {
    const {rows} = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
      [quantity]
    );
    return new Order(rows[0]);
  }


  //GET ALL ORDERS
  static async getAll(){
    const {rows} = await pool.query(
      'SELECT * FROM orders '
    );
    return rows.map(row => new Order(row));
  }

  //GET ORDER BY ID

  static async getById(orderId){
    const {rows} = await pool.query(`
    SELECT * FROM orders
    WHERE id=$1`, [orderId]
    )
    return rows[0]; 
  }

  //PATCH ORDER BY ID
  static async patchById(orderId, updateQty){
  const {rows} = await pool.query(`
    UPDATE orders
    SET
    quantity=$2
    WHERE id=$1
    RETURNING *;
  `[orderId, updateQty.quantity]
  );

  return rows[0];
  }

//DELETE ORDER
  static async deleteOrder(orderId){
   const{ rows } = await pool.query(`
    DELETE 
    FROM orders 
    WHERE id=$1`, [orderId]
    );
    return rows[0];
  }



};





//Instance method
//arr.map(), arr.filter()

//static methods
//Order.insert();