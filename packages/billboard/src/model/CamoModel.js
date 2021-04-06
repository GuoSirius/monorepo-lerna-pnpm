import kebabCase from 'lodash/kebabCase'

import { connect, Document } from 'camo'

import { DATABASE_PATH } from './database'

export default class CamoModel extends Document {
  static connect(dataPath = DATABASE_PATH) {
    return connect(`nedb://${dataPath}`)
  }

  static collectionName() {
    const collectionName = this.name?.replace(/model$/i, '')

    return kebabCase(collectionName)
  }
}
