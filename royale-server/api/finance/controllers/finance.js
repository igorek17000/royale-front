var yahooFinance = require('yahoo-finance2').default
const axios = require('axios')
module.exports = {
  // async forex(ctx) {
  //   let data
  //   try {
  //     const { symbol, from, to, interval } = ctx.request.body
  //     const query = symbol
  //     const queryOptions = {
  //       period1: from,
  //       period2: to,
  //       interval,
  //     }
  //     data = await yahooFinance._chart(query, queryOptions)
  //   } catch (error) {
  //     return error
  //   }
  //   return data
  // },
  async forex(ctx) {
    const { symbol } = ctx.request.body
    const { data } = await axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1d&interval=1m`
    )
    return data.chart.result[0]
  },
  async quote(ctx) {
    const { symbol } = ctx.request.body
    const queryOptions = { modules: ['price'] } // defaults
    const result = await yahooFinance.quoteSummary(symbol, queryOptions)

    return result
  },
  async search(ctx) {
    let data
    try {
      const { searchString } = ctx.request.body
      data = await yahooFinance.search(searchString, {
        newsCount: 0,
        enableNavLinks: false,
        enableCb: false,
        enableEnhancedTrivialQuery: false,
      })
    } catch (error) {
      return error
    }
    return data
  },
}
