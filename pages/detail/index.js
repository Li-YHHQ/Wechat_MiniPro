// pages/detail/index.js
const request = require('../../utils/request')

Page({
  data: {
    drugId: null,
    drug: null,
    stockStatus: 'ok',
    stockLabel:  '库存充足',
    loading: true,
    editing: false,
    saving: false,
    form: {}
  },

  _calcStatus(drug) {
    const stock     = drug.current_stock ?? drug.stock_quantity ?? 0
    const threshold = drug.low_stock_threshold ?? 0
    return {
      stockStatus: stock > threshold ? 'ok'   : 'warn',
      stockLabel:  stock > threshold ? '库存充足' : '库存不足',
    }
  },

  onLoad(options) {
    const drugId = options.drugId || options.id
    this.setData({ drugId })
    if (drugId) this.loadDrug(drugId)
  },

  async loadDrug(id) {
    this.setData({ loading: true })
    try {
      const res = await request({ url: `/drugs/${id}` })
      const drug = res.data || res
      this.setData({ drug, loading: false, ...this._calcStatus(drug) })
      wx.setNavigationBarTitle({ title: drug.drug_name || '药品详情' })
    } catch (e) {
      this.setData({ loading: false })
      wx.showToast({ title: '加载失败', icon: 'none' })
    }
  },

  onEdit() {
    const { drug } = this.data
    this.setData({
      editing: true,
      form: {
        drug_code:           drug.drug_code           || '',
        drug_name:           drug.drug_name           || '',
        generic_name:        drug.generic_name        || '',
        specifications:      drug.specifications      || '',
        unit:                drug.unit                || '',
        cost_price:          drug.cost_price          != null ? String(drug.cost_price)          : '',
        retail_price:        drug.retail_price        != null ? String(drug.retail_price)        : '',
        low_stock_threshold: drug.low_stock_threshold != null ? String(drug.low_stock_threshold) : '',
        manufacturer:        drug.manufacturer        || '',
        category:            drug.category            || ''
      }
    })
  },

  onCancelEdit() {
    this.setData({ editing: false, form: {} })
  },

  onFormInput(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    this.setData({ [`form.${field}`]: value })
  },

  async onSave() {
    const { drugId, form, saving } = this.data
    if (saving) return
    if (!form.drug_name || !form.drug_name.trim()) {
      wx.showToast({ title: '药品名称不能为空', icon: 'none' })
      return
    }
    this.setData({ saving: true })
    try {
      const payload = {
        ...form,
        cost_price:          form.cost_price          !== '' ? Number(form.cost_price)          : undefined,
        retail_price:        form.retail_price        !== '' ? Number(form.retail_price)        : undefined,
        low_stock_threshold: form.low_stock_threshold !== '' ? Number(form.low_stock_threshold) : undefined
      }
      const res = await request({ url: `/drugs/${drugId}`, method: 'PUT', data: payload })
      const updated = res.data || res
      this.setData({ drug: updated, editing: false, form: {}, ...this._calcStatus(updated) })
      wx.showToast({ title: '保存成功', icon: 'success' })
      wx.setNavigationBarTitle({ title: updated.drug_name || '药品详情' })
    } catch (e) {
      wx.showToast({ title: '保存失败', icon: 'none' })
    } finally {
      this.setData({ saving: false })
    }
  },

  onDelete() {
    wx.showModal({
      title: '删除确认',
      content: `确定要删除"${this.data.drug.drug_name}"吗？此操作不可恢复。`,
      confirmText: '删除',
      confirmColor: '#EF4444',
      success: async (res) => {
        if (!res.confirm) return
        try {
          await request({ url: `/drugs/${this.data.drugId}`, method: 'DELETE' })
          wx.showToast({ title: '删除成功', icon: 'success' })
          setTimeout(() => wx.navigateBack(), 1200)
        } catch (e) {
          wx.showToast({ title: '删除失败', icon: 'none' })
        }
      }
    })
  }
})
