const { DomainPage } = require('twilio/lib/rest/api/v2010/account/sip/domain');
const pool = require('../utils/pool');

module.exports = class Order {
  id;
  quantity

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






};





//Instance method
//arr.map(), arr.filter()

//static methods
//Order.insert();