import BillboardModel from './BillboardModel'

// 新增 看板
export async function addBillboard(name) {
  await BillboardModel.connect()

  const billboard = BillboardModel.create({ name, createTime: Date.now() })

  return billboard.save()
}

// 编辑 看板
export async function editBillboard(id, name) {
  await BillboardModel.connect()

  const billboard = BillboardModel.create({ name })

  billboard._id = id

  return billboard.save()
}

// 删除 看板
export async function deleteBillboard(id) {
  await BillboardModel.connect()

  return BillboardModel.deleteOne({ _id: id })
}

// 获取 看板列表
export async function getBillboardLists() {
  await BillboardModel.connect()

  return BillboardModel.find().then(lists => {
    return lists.map(item => item.toJSON())
  })
}
