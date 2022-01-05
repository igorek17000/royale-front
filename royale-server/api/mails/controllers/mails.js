'use strict'
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async new(ctx) {
    const { from, subject, text } = ctx.request.body

    console.log('from', from)
    console.log('subject', subject)
    console.log('text', text)
    if (!from) return

    let mail = await strapi.plugins['email'].services.email.send({
      to: 'silverturku@gmail.com',
      from: from,
      subject: subject,
      text: text,
    })
    console.log('mail', mail)
    ctx.send(
      {
        message: 'The content was created!',
      },
      201
    )
  },
}
