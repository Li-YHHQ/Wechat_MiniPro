// utils/request.js
const BASE_URL = 'https://medistock.shop/api'

/**
 * 统一请求封装
 * @param {object} options - { url, method, data }
 * @returns {Promise}
 */
const request = (options) => {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token')

    wx.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      success(res) {
        if (res.statusCode === 401) {
          if (wx.getStorageSync('token')) {
            wx.removeStorageSync('token')
            wx.removeStorageSync('userInfo')
            wx.reLaunch({ url: '/pages/login/index' })
          }
          reject(new Error('登录已过期，请重新登录'))
          return
        }
        if (res.statusCode >= 400) {
          const d = res.data || {}
          reject(new Error(d.message || d.msg || d.error || '请求失败，请重试'))
          return
        }
        resolve(res.data)
      },
      fail(err) {
        reject(new Error(err.errMsg || '网络连接失败，请检查网络'))
      }
    })
  })
}

module.exports = request
