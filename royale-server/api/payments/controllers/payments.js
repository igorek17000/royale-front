const { sanitizeEntity } = require('strapi-utils')

module.exports = {
  async getBalance(ctx) {
    const { id } = ctx.request.body
    const { user } = ctx.state
    if (!id) return
    let entity

    entity = await strapi.services.payments.findOne({ 'user.id': id })

    if (!entity) return

    if (entity.user.id !== user.id) {
      return ctx.unauthorized('You are not the owner of this note')
    } else {
      if (entity.user) delete entity.user
      if (entity.id) delete entity.id
      if (entity.created_at) delete entity.created_at
      if (entity.updated_at) delete entity.updated_at
      return sanitizeEntity(entity, { model: strapi.models.payments })
    }
  },
}
