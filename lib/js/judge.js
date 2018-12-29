const Judge = {
  isEmpty: function (str) {
    str = str.trim()
    return str === '' || str === undefined || str === null
  },
  isNotEmpty: function (str) {
    str = str.trim()
    return !this.isEmpty(str)
  },
  regexpPhone: function (str) {
    str = str.trim()
    return /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(str)
  },
  regexpEmail: function (str) {
    str = str.trim()
    return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(str)
  }
}

export default Judge
