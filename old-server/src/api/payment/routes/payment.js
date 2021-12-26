'use strict'

/**
 * payment router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories

module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: 'POST',
      path: '/payments/getBalance',
      handler: 'payment.getBalance',
    },
  ],
}
