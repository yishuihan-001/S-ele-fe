import Vue from 'vue'
import SvgIcon from '../components/svgIcon'

Vue.component('SvgIcon', SvgIcon)

// requires and returns all modules that match
const requireAll = requireContext => requireContext.keys().map(requireContext)
// import all svg
const req = require.context('./', false, /.svg$/)
requireAll(req)
