// pages/stock/stockin-add/index.js
const request = require('../../../utils/request')

Page({
  data: {
    form: {
      drugId:          null,
      drugName:        '',
      batchNo:         '',
      quantity:        '',
      costPrice:       '',
      productionDate:  '',
      expireDate:      '',
      supplier:        '',
    },
    drugKeyword:     '',
    drugResults:     [],
    showDropdown:    false,
    drugSearching:   false,
    submitting:      false,
  },

  _searchTimer: null,

  onDrugInput(e) {
    const keyword = e.detail.value
    this.setData({ drugKeyword: keyword, showDropdown: true })
    if (!keyword.trim()) {
      this.setData({ drugResults: [], showDropdown: false })
      return
    }
    clearTimeout(this._searchTimer)
    this._searchTimer = setTimeout(() => this.searchDrug(keyword), 400)
  },

  async searchDrug(keyword) {
    this.setData({ drugSearching: true })
    try {
      const res = await request({ url: '/drugs', data: { drug_name: keyword, size: 8 } })
      const raw = Array.isArray(res) ? res : (res.list || [])
      const list = raw.map(item => ({
        ...item,
        drug_name:      item.drugName,
        specifications: item.spec,
      }))
      this.setData({ drugResults: list, showDropdown: true })
    } catch (e) {
      // silent
    } finally {
      this.setData({ drugSearching: false })
    }
  },

  selectDrug(e) {
    const { id, name } = e.currentTarget.dataset
    this.setData({
      'form.drugId':   id,
      'form.drugName': name,
      drugKeyword:     name,
      drugResults:     [],
      showDropdown:    false,
    })
  },

  clearDrug() {
    this.setData({
      'form.drugId':   null,
      'form.drugName': '',
      drugKeyword:     '',
      drugResults:     [],
      showDropdown:    false,
    })
  },

  onFormInput(e) {
    const field = e.currentTarget.dataset.field
    this.setData({ [`form.${field}`]: e.detail.value })
  },

  onProductionDateChange(e) {
    this.setData({ 'form.productionDate': e.detail.value })
  },

  onExpiryDateChange(e) {
    this.setData({ 'form.expireDate': e.detail.value })
  },

  async onSubmit() {
    const { form, submitting } = this.data
    if (submitting) return

    if (!form.drugId) {
      wx.showToast({ title: '请从下拉中选择药品', icon: 'none' }); return
    }
    if (!form.quantity || Number(form.quantity) <= 0) {
      wx.showToast({ title: '请输入有效数量', icon: 'none' }); return
    }

    this.setData({ submitting: true })
    try {
      const payload = {
        drugId:         form.drugId,
        batchNo:        form.batchNo || undefined,
        quantity:       Number(form.quantity),
        costPrice:      form.costPrice !== '' ? Number(form.costPrice) : undefined,
        productionDate: form.productionDate || undefined,
        expireDate:     form.expireDate || undefined,
        supplier:       form.supplier || undefined,
      }
      await request({ url: '/stock-in', method: 'POST', data: payload })
      wx.showToast({ title: '入库成功', icon: 'success' })
      setTimeout(() => {
        const pages = getCurrentPages()
        const prevPage = pages[pages.length - 2]
        if (prevPage && prevPage.loadIn) prevPage.loadIn(true)
        wx.navigateBack()
      }, 1000)
    } catch (e) {
      wx.showToast({ title: e.message || '提交失败，请重试', icon: 'none' })
    } finally {
      this.setData({ submitting: false })
    }
  },
})
