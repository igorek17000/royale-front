'use strict'
const { sanitizeEntity } = require('strapi-utils')
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async newDeposit(ctx) {
    const { id } = ctx.request.body
    const { amount } = ctx.request.body
    let entity
    if (!id) return

    let payment = await strapi.services.payments.findOne({ 'user.id': id })

    if (!payment) return
    let payload = {
      user: id,
      amount: amount,
    }
    entity = await strapi.services.deposit.create(payload)
    let paymentData = {
      actual_balance: amount + payment.actual_balance,
      started_balance: amount + payment.started_balance,
    }
    await strapi.services.payments.update({ id: payment.id }, paymentData)
    return sanitizeEntity(entity, { model: strapi.models.deposit })
  },
}
