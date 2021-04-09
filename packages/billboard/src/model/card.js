import cloneDeep from 'lodash/cloneDeep'

import dayjs from 'dayjs'

import CardModel from './CardModel'

// 新增 卡片
export async function addCard({ billboardId, listId, name, order = 0 } = {}) {
  await CardModel.connect()

  const card = CardModel.create({ billboardId, listId, name, order })

  return card.save()
}

// 编辑 卡片
export async function editCard({ id, name, maturityTime, reminderTime = -1, description } = {}) {
  await CardModel.connect()

  return CardModel.findOneAndUpdate(
    { _id: id },
    { name, maturityTime, description, reminderTime, updateTime: new Date() }
  )
}

// 改变 卡片状态
export async function changeCardStatusById(id, isCompleted = true) {
  await CardModel.connect()

  return CardModel.findOneAndUpdate({ _id: id }, { isCompleted, updateTime: new Date() })
}
export async function changeCardStatusByListId(listId, isCompleted = true) {
  await CardModel.connect()

  return CardModel.find({ listId, $or: [{ deleteTime: null }, { deleteTime: { $exists: false } }] }).then(lists => {
    return Promise.all(
      lists.map(item => {
        item.isCompleted = isCompleted
        item.updateTime = new Date()

        return item.save()
      })
    )
  })
}
export async function changeCardStatusByBillboardId(billboardId, isCompleted = true) {
  await CardModel.connect()

  return CardModel.find({ billboardId, $or: [{ deleteTime: null }, { deleteTime: { $exists: false } }] }).then(
    lists => {
      return Promise.all(
        lists.map(item => {
          item.isCompleted = isCompleted
          item.updateTime = new Date()

          return item.save()
        })
      )
    }
  )
}

// 更新 卡片归属、顺序
export async function updateCardAffiliationAndOrder(lists) {
  await CardModel.connect()

  const allPromises = []

  lists = cloneDeep(lists)

  lists.forEach(item => {
    const { _id: listId, lists } = item

    const promises = lists.map((item, index) => {
      const { _id } = item

      return CardModel.findOneAndUpdate({ _id }, { listId, order: index, updateTime: new Date() })
    })

    allPromises.push(...promises)
  })

  return Promise.all(allPromises)
}

// 删除 卡片
export async function deleteCard(id, isHardDelete = false) {
  await CardModel.connect()

  return isHardDelete
    ? CardModel.deleteOne({ _id: id })
    : CardModel.findOneAndUpdate({ _id: id }, { updateTime: new Date(), deleteTime: new Date() })
}

// 获取 卡片列表
export async function getCardLists() {
  await CardModel.connect()

  return CardModel.find(
    { $or: [{ deleteTime: null }, { deleteTime: { $exists: false } }] },
    { sort: ['order', 'createTime'] }
  ).then(lists => {
    return lists.map(item => item.toJSON())
  })
}
export async function getCardListsByListId(listId) {
  await CardModel.connect()

  return CardModel.find(
    { listId, $or: [{ deleteTime: null }, { deleteTime: { $exists: false } }] },
    { sort: ['order', 'createTime'] }
  ).then(lists => {
    return lists.map(item => item.toJSON())
  })
}
export async function getCardListsByBillboardId(billboardId) {
  await CardModel.connect()

  return CardModel.find(
    { billboardId, $or: [{ deleteTime: null }, { deleteTime: { $exists: false } }] },
    { sort: ['order', 'createTime'] }
  ).then(lists => {
    return lists.map(item => item.toJSON())
  })
}
export async function getRecentMaturityList(name = '', currentDate = new Date()) {
  await CardModel.connect()

  return CardModel.find(
    {
      maturityTime: { $gte: currentDate },
      reminderTime: { $gte: 0 },
      isCompleted: { $ne: true },
      $or: [{ deleteTime: null }, { deleteTime: { $exists: false } }],
      $where() {
        return !name || this.name.includes(name)
      }
    },
    { sort: ['order', 'createTime'] }
  )
    .then(lists => {
      return lists.map(item => item.toJSON())
    })
    .then(lists => {
      return lists.filter(item => {
        const { maturityTime, reminderTime } = item

        return !dayjs(maturityTime).subtract(reminderTime, 'minute').isAfter(currentDate)
      })
    })
    .then(lists => {
      return lists.map(item => ({ ...item, maturityDate: dayjs(item.maturityTime).format('MM/DD/YYYY') }))
    })
}
