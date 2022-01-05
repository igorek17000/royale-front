'use strict'
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async new(ctx) {
    const { from, subject, text } = ctx.request.body

    if (!from) return

    let mail = await strapi.plugins['email'].services.email.send({
      to: 'silverturku@gmail.com',
      from: from,
      subject: subject,
      text: text,
    })
    ctx.send(
      {
        message: 'The content was created!',
        mail: mail,
      },
      201
    )
  },
}
