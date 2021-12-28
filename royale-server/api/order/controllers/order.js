'use strict'
const { sanitizeEntity } = require('strapi-utils')
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async newOrder(ctx) {
    const { user, amount, trade_type, return_amount, coin } = ctx.request.body
    let entity
    if (!user) return

    let payment = await strapi.services.payments.findOne({ 'user.id': user })

    if (!payment) return

    entity = await strapi.services.order.create(ctx.request.body)

    if (trade_type === 'sell') {
      let coinSearch = await strapi.services.coin.findOne({
        'user.id': user,
        name: coin,
      })
      if (!coinSearch) {
        let payCoin = {
          name: coin,
          user: user,
          balance: parseFloat(amount),
        }
        await strapi.services.coin.create(payCoin)
      } else {
        console.log('coin found')
        let coinData = {
          balance: parseFloat(coinSearch.balance) - parseFloat(amount),
        }
        await strapi.services.coin.update({ id: coinSearch.id }, coinData)
      }
      let paymentData = {
        actual_balance: parseFloat(return_amount) + payment.actual_balance,
      }
      await strapi.services.payments.update({ id: payment.id }, paymentData)
      return sanitizeEntity(entity, { model: strapi.models.order })
    } else {
      let coinSearch = await strapi.services.coin.findOne({
        'user.id': user,
        name: coin,
      })
      if (!coinSearch) {
        let payCoin = {
          name: coin,
          user: user,
          balance: parseFloat(return_amount),
        }
        await strapi.services.coin.create(payCoin)
      } else {
        console.log('coin found')
        let coinData = {
          balance: parseFloat(coinSearch.balance) + parseFloat(return_amount),
        }
        await strapi.services.coin.update({ id: coinSearch.id }, coinData)
      }
      let paymentData = {
        actual_balance: payment.actual_balance - parseFloat(amount),
      }
      await strapi.services.payments.update({ id: payment.id }, paymentData)
      return sanitizeEntity(entity, { model: strapi.models.order })
    }
  },
}
