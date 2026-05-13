// pages/drug/add/index.js
const request = require('../../../utils/request')

Page({
  data: {
    form: {
      drug_code:           '',
      drug_name:           '',
      generic_name:        '',
      specifications:      '',
      unit:                '',
      cost_price:          '',
      retail_price:        '',
      low_stock_threshold: '',
      manufacturer:        '',
      category:            ''
    },
    submitting: false
  },

  onFormInput(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    this.setData({ [`form.${field}`]: value })
  },

  async onSubmit() {
    const { form, submitting } = this.data
    if (submitting) return

    if (!form.drug_name || !form.drug_name.trim()) {
      wx.showToast({ title: '药品名称不能为空', icon: 'none' })
      return
    }

    this.setData({ submitting: true })
    try {
      const payload = {
        ...form,
        cost_price:          form.cost_price          !== '' ? Number(form.cost_price)          : undefined,
        retail_price:        form.retail_price        !== '' ? Number(form.retail_price)        : undefined,
        low_stock_threshold: form.low_stock_threshold !== '' ? Number(form.low_stock_threshold) : undefined
      }
      await request({ url: '/drugs', method: 'POST', data: payload })
      wx.showToast({ title: '添加成功', icon: 'success' })
      setTimeout(() => {
        const pages = getCurrentPages()
        const prevPage = pages[pages.length - 2]
        if (prevPage && prevPage.loadList) {
          prevPage.loadList(true)
        }
        wx.navigateBack()
      }, 1000)
    } catch (e) {
      wx.showToast({ title: '添加失败，请重试', icon: 'none' })
    } finally {
      this.setData({ submitting: false })
    }
  }
})
