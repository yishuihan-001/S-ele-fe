const Util = {
  /**
   * 存储localStorage
   */
  setStore: (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },

  /**
   * 获取localStorage
   */
  getStore: name => {
    if (!name) return
    return window.localStorage.getItem(name)
  },

  /**
   * 删除localStorage
   */
  removeStore: name => {
    if (!name) return
    window.localStorage.removeItem(name)
  },

  /**
  * 获取url中的参数
  * @param url
  * @param name
  * @returns {*}
  */
  getQueryString: function (url, name) {
    let reg = new RegExp(name + '\\s*=\\s*([^&#]+)\\s*')
    let r = url.match(reg)
    if (r != null) {
      return decodeURI(r[1])
    } else {
      return null
    }
  }
}

export default Util
