import { createChart, CrosshairMode } from 'lightweight-charts'
export default ({ app }, inject) => {
  inject('createChart', createChart)
  inject('CrosshairMode', CrosshairMode)
}
