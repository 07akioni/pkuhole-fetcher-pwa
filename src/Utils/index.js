function getDateDiff (dateTimeStamp) {
  let minute     = 1000 * 60
  let hour       = minute * 60
  let day        = hour * 24
  let month      = day * 30
  let now        = new Date().getTime()
  let diffValue  = now - new Date(dateTimeStamp).getTime()
  if (diffValue < 0) {
    diffValue = 0
  }
  let monthCount = diffValue / month
  let weekCount  = diffValue / (7 * day)
  let dayCount   = diffValue / day
  let hourCount  = diffValue / hour
  let minCount   = diffValue / minute
  let result = ""
  if (monthCount >= 1) {
    result = parseInt(monthCount) + " 个月前"
  } else if (weekCount >= 1) {
    result = parseInt(weekCount) + " 周前"
  } else if (dayCount >= 1) {
    result = parseInt(dayCount) + " 天前"
  } else if (hourCount >= 1) {
    result = parseInt(hourCount) + " 小时前"
  } else if (minCount >= 1) {
    result = parseInt(minCount) + " 分钟前"
  } else result = "刚刚发表"
  return result
}

export {
  getDateDiff
}