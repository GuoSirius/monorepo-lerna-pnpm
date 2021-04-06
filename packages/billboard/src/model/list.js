import ListModel from './ListModel'

// 新增 列表
export async function addList(name) {
  await ListModel.connect()

  const list = ListModel.create({ name })

  return list.save()
}

// 编辑 列表
export async function editList(id, name) {
  await ListModel.connect()

  return ListModel.findOneAndUpdate({ _id: id }, { name, updateTime: new Date() })
}

// 删除 列表
export async function deleteList(id, isHardDelete = false) {
  await ListModel.connect()

  return isHardDelete
    ? ListModel.deleteOne({ _id: id })
    : ListModel.findOneAndUpdate({ _id: id }, { deleteTime: new Date() })
}

// 获取 列表
export async function getListLists() {
  await ListModel.connect()

  return ListModel.find(
    { $or: [{ deleteTime: null }, { deleteTime: { $exists: false } }] },
    { sort: ['-createTime'] }
  ).then(lists => {
    return lists.map(item => item.toJSON())
  })
}
