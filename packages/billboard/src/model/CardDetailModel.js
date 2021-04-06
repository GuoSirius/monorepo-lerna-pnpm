import CamoModel from './CamoModel'

export default class CardDetailModel extends CamoModel {
  constructor() {
    super()

    this.scheme()
  }

  scheme() {
    super.schema({
      description: {
        type: String
      },
      maturityTime: {
        type: Date
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
