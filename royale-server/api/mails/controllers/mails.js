'use strict'
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async new(ctx) {
    const { from, subject, html } = ctx.request.body

    if (!from) return

    await strapi.plugins['email'].services.email.send({
      to: 'silverturku@gmail.com',
      from: from,
      subject: subject,
      html: html,
    })
    ctx.send(
      {
        message: 'Mail Sent!',
      },
      200
    )
  },
}
