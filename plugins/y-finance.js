import { YFinanceLive } from 'yfinance-live'

export default ({ app }, inject) => {
  inject('YFinanceLive', YFinanceLive)
}
