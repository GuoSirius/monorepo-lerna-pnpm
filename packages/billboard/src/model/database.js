import path from 'path'
import { ensureFileSync } from 'fs-extra'

import { app } from '@electron/remote'

import NeDB from 'nedb'
import lowDB from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

import { connect } from 'camo'

export const NEDB_OPTIONS = {
  autoload: true,
  inMemoryOnly: false,
  timestampData: true,
  corruptAlertThreshold: 0.8
}

export const APP_DATA_PATH = app.getPath('appData')
export const USER_DATA_PATH = app.getPath('userData')

export const DATABASE_PATH = path.resolve(USER_DATA_PATH, 'database')

export function createTable(filename, useLowDB = false, useODM = true) {
  let table = null

  filename = path.join(DATABASE_PATH, `${filename}.json`)

  ensureFileSync(filename)

  if (useLowDB) {
    const adapter = new FileSync(filename)
    table = lowDB(adapter)
  } else {
    if (useODM) table = connect(`nedb://${filename}`)
    else table = new NeDB({ ...NEDB_OPTIONS, filename })
  }

  return Promise.resolve(table)
}

export function selectTable(...rest) {
  return createTable(...rest)
}