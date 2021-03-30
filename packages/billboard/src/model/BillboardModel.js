import CamoModel from './CamoModel'

export default class BillboardModel extends CamoModel {
  constructor() {
    super()

    this.scheme()
  }

  scheme() {
    super.schema({
      title: {
        type: String,
        required: true
      }
    })
  }
}
