import axios from 'axios'
import { location_id } from '../config.js'
import crypto from 'crypto'

/*
  items: [
    {
      id: string,
      quantity: number
    }
  ]
*/
export const createOrder = async (items) => {
  const uuid = crypto.randomUUID()
  const pickup_at = new Date(new Date().getTime() + 10*60000).toISOString()

  try {
    const { data } = await axios.post('/orders', {
      idempotency_key: uuid,
      order: {
        location_id,
        line_items: items.map(({id, quantity}) => ({quantity: quantity.toString(), catalog_object_id: id})),
        fulfillments: [
          {
            type: 'PICKUP',
            state: 'PROPOSED',
            pickup_details: {
              pickup_at,
              auto_complete_duration: 'P2DT12H30M15S',
              is_curbside_pickup: false,
              recipient: {
                // customer_id: crypto.randomUUID(),
                display_name: 'test',
                email_address: 'hzuccon@gmail.com',
                phone_number: '0466021427'
              }
            }
          }
        ],
        state: 'OPEN'
      }
    })

    console.log(data)
    return data
  } catch (err) {
    throw err.response.data
  }
}

export default createOrder