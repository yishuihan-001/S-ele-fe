import { Toast } from 'mint-ui'

const failFn = (msg) => {
  Toast(msg)
  if (msg.match('没有登录')) {
    setTimeout(() => {
      window.location.href = window.location.origin + '/login'
    }, 1000)
  }
}

export default (res, successCB, failCB = failFn) => {
  if (res && res.status && +res.status === 1) {
    successCB && typeof successCB === 'function' && successCB(res.data)
  } else {
    failCB && typeof failCB === 'function' && failCB(res.message || 'FAIL~fail')
  }
}
