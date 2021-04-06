import CamoModel from './CamoModel'

export default class ListModel extends CamoModel {
  constructor() {
    super()

    this.scheme()
  }

  scheme() {
    super.schema({
      name: {
        type: String,
        unique: true,
        required: true
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
