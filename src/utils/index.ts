import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'

export const getRandom = (length: string | number): number => {
  const num = Math.random() * Number(length)
  return parseInt(String(num), 10)
}

export const formatTime = (data: any) => {
  if (!data) {
    return
  }
  return dayjs(data).format('YYYY-MM-DD HH:mm:ss')
}

export const converModifyDate = (modifyDate: any) => {
  if (!modifyDate) {
    return ''
  }
  return `${modifyDate[0]}-${modifyDate[1]}-${modifyDate[2]} ${modifyDate[3]}:${modifyDate[4]}:${modifyDate[5]}`
}

export const formatAddress = (address?: string) => {
  if (!address) {
    return ''
  }
  if (address.length < 10) {
    return address
  }
  return address.slice(0, 6) + '...' + address.slice(-4)
}

export const splitNumber = (num: any, decimals = 18) => {
  const _num = String(num)
  let result = _num
  if (num.includes('.')) {
    const temp = _num.split('.')
    result = temp[0] + '.' + temp[1].slice(0, decimals)
  }
  return result
}

export const accuracy = (
  num: any,
  decimals: any,
  fix: any,
  acc = false
): any => {
  if (Number(num) === 0 || !num) {
    return 0
  }
  const n = new BigNumber(num)
    .div(new BigNumber(10).pow(Number(decimals)))
    .toFixed(Number(fix), BigNumber.ROUND_DOWN)
  if (acc) {
    return n
  }
  return Number(n)
}

export const scala = (num: any, decimals: any) => {
  if (Number(num) === 0 || !num) {
    return 0
  }
  return new BigNumber(num)
    .times(new BigNumber(10).pow(Number(decimals)))
    .toFixed(0)
}

export const fixZero = (str: string | number) => {
  return String(str).replace(/(?:\.0*|(\.\d+?)0+)$/, '$1')
}

export const toBN = (num: string | number) => {
  return new BigNumber(num)
}

export const formatBalance = (num: any, length = 6) => {
  if (!num || Number(num) === 0) {
    return 0
  }

  num = num.toString()
  let c
  if (num.toString().indexOf('.') !== -1) {
    const temp = num.split('.')
    c =
      temp[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') +
      '.' +
      temp[1].slice(0, length)
  } else {
    c = num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }
  return c
}

export const fixedZero = (num: any, decimals = 6) => {
  if (Number(num) === 0 || !num) {
    return 0
  }
  return new BigNumber(num).toFixed(Number(decimals), BigNumber.ROUND_DOWN)
}

export const checkTOPAddr = (topAddr: string) =>
  /^T00000[a-zA-Z0-9]{34}$/.test(topAddr) ||
  /^T80000[a-fA-F0-9]{40}$/.test(topAddr) ||
  /^T60004[a-fA-F0-9]{40}$/.test(topAddr)

export const checkTOPAddrLowerCase = (topAddr: string) => {
  if (topAddr.startsWith('T0')) {
    return true
  }
  topAddr = topAddr.replace(/^T/, '')
  return topAddr === topAddr.toLowerCase()
}

export const checkTOPHash = (hash: string) => {
  // 0xa4d5889f412bce8bf45763f837b76a1df7619765fd75cdb107014cf76af06a34
  return /^(0x)?[a-f0-9]{64}$/.test(hash)
}

export const getRandomString = function () {
  let str = 'abcdefghijklmnopqrstuvwxyz9876543210'
  let tmp = '',
    i = 0,
    l = str.length
  for (i = 0; i < 10; i++) {
    tmp += str.charAt(Math.floor(Math.random() * l))
  }
  return tmp
}

export const isZero = function (num: any) {
  if (typeof num === 'string') {
    num = +num
  }
  if (num === 0) {
    return 0
  } else {
    return num
  }
}

export const isEmpty = function (num: any) {
  if (typeof num === 'number') {
    return true
  } else {
    return num
  }
}

export const defaultValue = function (str: string) {
  return isEmpty(str) ? str : '--'
}

export const dateDiff = function (timestamp: any) {
  var second = 1000
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  var halfamonth = day * 15
  var month = day * 30
  var now = new Date().getTime()
  var diffValue = now - timestamp * 1000

  if (diffValue < 0) {
    return ''
  }

  var monthC = (diffValue / month) as any
  var weekC = (diffValue / (7 * day)) as any
  var dayC = (diffValue / day) as any
  var hourC = (diffValue / hour) as any
  var minC = (diffValue / minute) as any
  var secondC = (diffValue / second) as any

  var zero = function (value: any) {
    if (value < 10) {
      return '0' + value
    }
    return value
  }

  if (monthC > 12) {
    return (function () {
      var date = new Date(timestamp)
      return (
        date.getFullYear() +
        ' ' +
        zero(date.getMonth() + 1) +
        ' ' +
        zero(date.getDate()) +
        ' '
      )
    })()
  } else if (monthC >= 1) {
    return parseInt(monthC) + ' Month ago'
  } else if (weekC >= 1) {
    return parseInt(weekC) + ' week ago'
  } else if (dayC >= 1) {
    return parseInt(dayC) + ' day ago'
  } else if (hourC >= 1) {
    return parseInt(hourC) + ' hour ago'
  } else if (minC >= 1) {
    return parseInt(minC) + ' minute ago'
  }
  return parseInt(secondC) + ' second ago'
}

export const getScrollTop = () =>
  document.documentElement.scrollTop ||
  window.pageYOffset ||
  document.body.scrollTop

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export const handleCreditScore = function (str: any) {
  let result
  if (typeof str === 'string') {
    let string = (+str).toFixed(6).toString()
    result = string.split('.')[0] + '.' + string.split('.')[1].substr(0, 2)
  } else {
    let string = str.toFixed(6).toString()
    result = string.split('.')[0] + '.' + string.split('.')[1].substr(0, 2)
  }
  return result
}

export const formatNodeType = function (type: any, lang: any = 'en') {
  let str = ''
  const arr = type.split(',')
  if (
    arr.indexOf('advance') > -1 &&
    arr.indexOf('validator') > -1 &&
    arr.indexOf('edge') > -1
  ) {
    if (lang === 'zh-CN') {
    } else {
      str += 'Genesis Miner'
    }
    return str
  }
  if (arr.indexOf('advance') > -1) {
    if (arr.indexOf('advance') !== arr.length - 1) {
      if (lang === 'zh-CN') {
      } else {
        str += 'Advance Miner、'
      }
    } else {
      if (lang === 'zh-CN') {
      } else {
        str += 'Advance Miner'
      }
    }
  }
  if (arr.indexOf('validator') > -1) {
    if (arr.indexOf('validator') !== arr.length - 1) {
      if (lang === 'zh-CN') {
      } else {
        str += 'Validator Miner、'
      }
    } else {
      if (lang === 'zh-CN') {
      } else {
        str += 'Validator Miner'
      }
    }
  }
  if (arr.indexOf('edge') > -1) {
    if (arr.indexOf('edge') !== arr.length - 1) {
      if (lang === 'zh-CN') {
      } else {
        str += 'Edge Miner、'
      }
    } else {
      if (lang === 'zh-CN') {
      } else {
        str += 'Edge Miner'
      }
    }
  }
  if (arr.indexOf('full_node') > -1) {
    if (arr.indexOf('full_node') !== arr.length - 1) {
      if (lang === 'zh-CN') {
      } else {
        str += 'Exchange Miner、'
      }
    } else {
      if (lang === 'zh-CN') {
      } else {
        str += 'Exchange Miner'
      }
    }
  }
  if (arr.indexOf('exchange') > -1) {
    if (arr.indexOf('exchange') !== arr.length - 1) {
      if (lang === 'zh-CN') {
      } else {
        str += 'Exchange Miner、'
      }
    } else {
      if (lang === 'zh-CN') {
      } else {
        str += 'Exchange Miner'
      }
    }
  }
  return str
}
