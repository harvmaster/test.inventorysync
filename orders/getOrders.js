import axios from 'axios'
import { location_id } from '../config.js'

export const getOrders = async () => {
  const { data } = await axios.post('/orders/search', {
    location_ids: [
      location_id
    ]
  })

  console.log(data)
}

export default getOrders