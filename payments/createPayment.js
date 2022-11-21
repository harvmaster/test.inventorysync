import axios from 'axios'
import crypto from 'crypto'

/*
  order: [
    {
      id: string,
      price: Number
    }
  ]
*/
export const createPayment = async (order) => {
  const uuid = crypto.randomUUID()
  try {
    const { data } = await axios.post('/payments', {
      idempotency_key: uuid,
      source_id: 'cnon:card-nonce-ok',
      amount_money: {
        amount: order.price,
        currency: 'AUD'
      },

      order_id: order.id
    })

    return data
  } catch (err) {
    throw err.response.data
  }
}

export default createPayment