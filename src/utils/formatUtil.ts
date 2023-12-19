import numeral from 'numeral'
import moment from 'moment'

/**
 * 格式化數字
 */
export const formatNumber = (n: number | string) => {
  if (n !== undefined) {
    return numeral(n).format('0,0')
  } else {
    return '--'
  }
}

/**
 * 格式化日期
 */
export const formatDate = (n: string, type = 'YYYY/MM/DD') => {
  return moment(n).format(type)
}
