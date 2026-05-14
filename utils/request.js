// utils/request.js
const BASE_URL = 'https://medistock.shop/api'

let _redirectingToLogin = false
function _redirectToLogin() {
  if (_redirectingToLogin) return
  _redirectingToLogin = true
  wx.removeStorageSync('token')
  wx.removeStorageSync('userInfo')
  wx.reLaunch({
    url: '/pages/login/index',
    complete: () => { _redirectingToLogin = false }
  })
}

function _isAuthError(statusCode, message) {
  if (statusCode === 401 || statusCode === 403) return true
  if (!message) return false
  return /未登录|登录失效|未授权|token|登录过期/i.test(message)
}

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
        const body = res.data || {}
        const message = body.message || body.msg || body.error || ''

        // 1) HTTP 层错误
        if (res.statusCode >= 400) {
          if (_isAuthError(res.statusCode, message)) _redirectToLogin()
          const err = new Error(message || `请求失败 (${res.statusCode})`)
          err.statusCode = res.statusCode
          reject(err)
          return
        }

        // 2) 业务层 success:false（后端常用 200 + success:false 风格）
        if (body && body.success === false) {
          if (_isAuthError(200, message)) _redirectToLogin()
          const err = new Error(message || '请求失败')
          err.statusCode = res.statusCode
          err.bizFail = true
          reject(err)
          return
        }

        // 3) 成功，返回真正的数据层
        resolve(body.data !== undefined ? body.data : body)
      },
      fail(err) {
        reject(new Error(err.errMsg || '网络连接失败，请检查网络'))
      }
    })
  })
}

module.exports = request
