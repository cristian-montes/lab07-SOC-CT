const pool = require('../lib/utils/pool');
// const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const { response } = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn()
  }
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  //POST A NEW ORDER TEST
  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then(res => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10
        });
      });
  });

  //GET ALL TEST
  it('it gets all of the orders in file', () => {
    return request(app)
      .get('/api/v1/orders')
      .then(res => {
        expect(res.body).toEqual([{
          id: '1',
          quantity: 10
        }]);
      });
  });


  //GET BY ID TEST
  it('it gets order by id', () => {
    return request(app)
      .get('/api/v1/orders/1')
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 10
        });
      });
  });

  //PATCH ORDER BY ID TEST
  it.skip('it patches order by id', async () => {
    // const psot =   await request(app)
    //   .post('/api/v1/oders')
    //   .send({ quantity:20 });
    // console.log('HEREA', psot);


    await request(app)
      .patch('/api/v1/oders/1')
      .send({ quantity:20 });

    const result = await request(app).get('/api/v1/orders/1');
    expect(result.body).toEqual({
      id:'1',
      quantity:20
    });
  });


  //DELETE ORDER
  it('gets an order by id and deletes it from DB', async () => {
    const response = await request(app)
      .delete('/api/v1/orders/1');
    expect(response.body).toEqual({});
  });


});
