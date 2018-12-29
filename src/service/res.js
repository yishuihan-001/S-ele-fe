import { Toast } from 'mint-ui'

const failFn = (msg) => {
  Toast(msg)
}

export default (res, successCB, failCB = failFn) => {
  if (res && res.status && +res.status === 1) {
    successCB && typeof successCB === 'function' && successCB(res.data)
  } else {
    failCB && typeof failCB === 'function' && failCB(res.message || 'FAIL~fail')
  }
}
