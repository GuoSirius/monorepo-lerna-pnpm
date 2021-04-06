import dayjs from 'dayjs'

import BillboardModel from './BillboardModel'

// 新增 看板
export async function addBillboard(name) {
  await BillboardModel.connect()

  const billboard = BillboardModel.create({ name })

  return billboard.save()
}

// 编辑 看板
export async function editBillboard(id, name) {
  await BillboardModel.connect()

  return BillboardModel.findOneAndUpdate({ _id: id }, { name, updateTime: new Date() })
}

// 删除 看板
export async function deleteBillboard(id, isHardDelete = false) {
  await BillboardModel.connect()

  return isHardDelete
    ? BillboardModel.deleteOne({ _id: id })
    : BillboardModel.findOneAndUpdate({ _id: id }, { deleteTime: new Date() })
}

// 获取 看板列表
export async function getBillboardLists() {
  await BillboardModel.connect()

  return BillboardModel.find(
    { $or: [{ deleteTime: null }, { deleteTime: { $exists: false } }] },
    { sort: ['-createTime'] }
  ).then(lists => {
    return lists
      .map(item => item.toJSON())
      .map(item => ({ ...item, createDate: dayjs(item.createTime).format('MM/DD/YYYY') }))
  })
}
