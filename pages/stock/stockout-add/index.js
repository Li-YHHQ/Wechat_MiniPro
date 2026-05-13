// pages/stock/stockout-add/index.js
const request = require('../../../utils/request')

const OUT_TYPES = [
  { label: '销售', value: 'sale' },
  { label: '损耗', value: 'loss' },
  { label: '退货', value: 'return' },
]

Page({
  data: {
    form: {
      drug_id:   null,
      drug_name: '',
      quantity:  '',
      out_type:  'sale',
      remark:    '',
    },
    outTypes:      OUT_TYPES,
    outTypeIndex:  0,
    drugKeyword:   '',
    drugResults:   [],
    showDropdown:  false,
    drugSearching: false,
    submitting:    false,
  },

  _searchTimer: null,

  onDrugInput(e) {
    const keyword = e.detail.value
    this.setData({ drugKeyword: keyword, showDropdown: true })
    if (!keyword.trim()) {
      this.setData({ drugResults: [], showDropdown: false }); return
    }
    clearTimeout(this._searchTimer)
    this._searchTimer = setTimeout(() => this.searchDrug(keyword), 400)
  },

  async searchDrug(keyword) {
    this.setData({ drugSearching: true })
    try {
      const res = await request({ url: '/drugs', data: { drug_name: keyword, size: 8 } })
      const raw = res.data || res
      const list = Array.isArray(raw) ? raw : raw.list || raw.data || []
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
      'form.drug_id': id,
      'form.drug_name': name,
      drugKeyword: name,
      drugResults: [],
      showDropdown: false,
    })
  },

  clearDrug() {
    this.setData({
      'form.drug_id': null,
      'form.drug_name': '',
      drugKeyword: '',
      drugResults: [],
      showDropdown: false,
    })
  },

  onFormInput(e) {
    const field = e.currentTarget.dataset.field
    this.setData({ [`form.${field}`]: e.detail.value })
  },

  onOutTypeChange(e) {
    const index = Number(e.detail.value)
    this.setData({ outTypeIndex: index, 'form.out_type': OUT_TYPES[index].value })
  },

  async onSubmit() {
    const { form, submitting } = this.data
    if (submitting) return

    if (!form.drug_id && !form.drug_name.trim()) {
      wx.showToast({ title: '请选择或输入药品名称', icon: 'none' }); return
    }
    if (!form.quantity || Number(form.quantity) <= 0) {
      wx.showToast({ title: '请输入有效数量', icon: 'none' }); return
    }

    this.setData({ submitting: true })
    try {
      const payload = {
        drug_id:   form.drug_id || undefined,
        drug_name: form.drug_name || undefined,
        quantity:  Number(form.quantity),
        out_type:  form.out_type,
        remark:    form.remark || undefined,
      }
      await request({ url: '/stock-out', method: 'POST', data: payload })
      wx.showToast({ title: '出库成功', icon: 'success' })
      setTimeout(() => {
        const pages = getCurrentPages()
        const prevPage = pages[pages.length - 2]
        if (prevPage && prevPage.loadOut) prevPage.loadOut(true)
        wx.navigateBack()
      }, 1000)
    } catch (e) {
      wx.showToast({ title: '提交失败，请重试', icon: 'none' })
    } finally {
      this.setData({ submitting: false })
    }
  },
})
