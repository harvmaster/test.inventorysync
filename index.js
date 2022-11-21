import util from 'util'
import axios from 'axios'

import { access_token } from './config.js'

import { Orders, Items, Payments } from './libs.js'

axios.defaults.headers.common.authorization = `Bearer ${access_token}`
axios.defaults.baseURL = 'https://connect.squareupsandbox.com/v2'

const log = (message) => {
  console.log(util.inspect(message, {showHidden: false, depth: null, colors: true}))
}

const wait = async (time) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res()
    }, time)
  })
}

const run = async () => {
  try {
    // Get list of all items from the store
    const { objects: items } = await Items.getItems()
    log (items[0])

    // Choose just one variation
    const item = items[0].item_data.variations[0]

    // Create an order with a pickup location
    const  { order } = await Orders.createOrder([{ id: item.id, quantity: 5 }])

    log(order)
    await wait(3000)

    // Pay for order using card
    const payment = await Payments.createPayment({ id: order.id, price: order.net_amount_due_money.amount })
    log(payment)
  } catch (err) {
    console.error(err)
  }
}

run()