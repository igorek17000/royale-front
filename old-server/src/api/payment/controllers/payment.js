'use strict'

/**
 *  payment controller
 */

const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController('api::payment.payment', ({ strapi }) => ({
  // Method 2: Wrapping a core action (leaves core logic in place)
  async getBalance(ctx) {
    const { id } = ctx.request.body
    const { user } = ctx.state
    if (!id) return

    // const entity = await strapi
    //   .service('api::payment.payment')
    //   .find(id, populate)
    // if (!entity) return
    // console.log('entity', entity)
    const entity = await strapi.db.query('api::payment.payment').findMany({
      where: {
        'user_id.id': user.id,
      },
      populate: { user_id: true },
    })
    console.log('🚀 ~ getBalance ~ entity', entity)
    // some more logic

    // if (entity.user_id !== ctx.state.user.id) {
    //   return ctx.unauthorized('You are not the owner of this note')
    // } else {
    //   const sanitizedEntity = await this.sanitizeOutput(entity, ctx)
    // }

    return this.transformResponse(sanitizedEntity)
  },
}))
