// function GetRTime () {
//   var EndTime = new Date('2019/01/10 16:04:10')
//   var NowTime = new Date()
//   var t = EndTime.getTime() - NowTime.getTime()
//   var d = parseInt(t / 1000 / 60 / 60 / 24)
//   h = parseInt((t / 1000 / 60 / 60) % 24)
//   m = parseInt((t / 1000 / 60) % 60)
//   s = parseInt((t / 1000) % 60)
//   d < 10 ? (d = '0' + d) : (d = d)
//   h < 10 ? (h = '0' + h) : (h = h)
//   m < 10 ? (m = '0' + m) : (m = m)
//   s < 10 ? (s = '0' + s) : (s = s)
//   console.log(d + '天' + h + '时' + m + '分' + s + '秒')
//   if (t < 0) {
//     clearTimeout(GetRTime)
//     return false
//   }
//   setTimeout(GetRTime, 1000)
// }
// GetRTime()

let timer
function ShowTimes () {
  let endtime = new Date('2016/11/12,17:20:00')
  let nowtime = new Date()
  let LeaveTime = endtime - nowtime
  let LeaveDays = Math.floor(LeaveTime / (1000 * 60 * 60 * 24)) // 天
  let LeaveHours = Math.floor((LeaveTime / (1000 * 60 * 60)) % 24) // 时
  let LeaveMinutes = Math.floor((LeaveTime / (1000 * 60)) % 60) // 分
  let LeaveSeconds = Math.floor((LeaveTime / 1000) % 60) // 秒
  let c = new Date()
  let q = c.getMilliseconds()
  if (q < 10) {
    // 因为毫秒为一位数时只占一个字符位置，会让毫秒二字变动位置
    q = '00' + c.getMilliseconds()
  }
  if (q >= 10 && q < 100) {
    // 因为毫秒为两位数时只占两个字符位置，会让毫秒二字变动位置
    q = '0' + c.getMilliseconds()
  }
  if (LeaveTime < 0) {
    clearInterval(timer) // 结束循环
  } else {
    let hxtime = LeaveDays + ':' + LeaveHours + ':' + LeaveMinutes + ':' + LeaveSeconds + ':' + q
    console.log(hxtime)
  }
}
timer = setInterval(ShowTimes, 5)

this.efficacy = true
this.timer = setInterval(() => {
  let d = Math.floor(remainTime / (1000 * 60 * 60 * 24)) // 天
  let h = Math.floor((remainTime / (1000 * 60 * 60)) % 24) // 时
  let m = Math.floor((remainTime / (1000 * 60)) % 60) // 分
  let s = Math.floor((remainTime / 1000) % 60) // 秒
  let c = new Date()
  let q = c.getMilliseconds()
  if (q < 10) {
    // 因为毫秒为一位数时只占一个字符位置，会让毫秒二字变动位置
    q = '00' + c.getMilliseconds()
  }
  if (q >= 10 && q < 100) {
    // 因为毫秒为两位数时只占两个字符位置，会让毫秒二字变动位置
    q = '0' + c.getMilliseconds()
  }
  if (remainTime < 0) {
    this.efficacy = false
    clearInterval(this.timer) // 结束循环
  } else {
    let str = d + ':' + h + ':' + m + ':' + s + ':' + q
    this.showTime = str
  }
}, 100)
