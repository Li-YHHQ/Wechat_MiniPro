// utils/request.js
const BASE_URL = 'https://medistock.shop/api'

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
          const err = new Error('未授权，请确认登录状态')
          err.statusCode = 401
          reject(err)
          return
        }
        if (res.statusCode >= 400) {
          const body = res.data || {}
          const err = new Error(body.message || body.msg || body.error || '请求失败，请重试')
          err.statusCode = res.statusCode
          reject(err)
          return
        }
        const body = res.data || {}
        if (body.success === false) {
          reject(new Error(body.message || '请求失败'))
          return
        }
        // 返回真正的数据层，兼容无 data 包裹的响应
        resolve(body.data !== undefined ? body.data : body)
      },
      fail(err) {
        reject(new Error(err.errMsg || '网络连接失败，请检查网络'))
      }
    })
  })
}

module.exports = request
