import CamoModel from './CamoModel'

export default class CardDetailModel extends CamoModel {
  constructor() {
    super()

    this.scheme()
  }

  scheme() {
    super.schema({
      billboardId: {
        type: String,
        required: true
      },
      listId: {
        type: String,
        required: true
      },
      cardId: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      maturityTime: {
        type: Date
      },
      reminderTime: {
        type: Number,
        default: -1
      },
      order: {
        type: Number,
        default: 0
      },
      createTime: {
        type: Date,
        default: Date.now
      },
      updateTime: {
        type: Date,
        default: Date.now
      },
      deleteTime: {
        type: Date,
        default: null
      }
    })
  }
}
