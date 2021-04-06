import { createTable } from './database'

// 看板表
export const billboardTable = createTable('billboard', false, false)

// 列表表
export const listTable = createTable('list', false, false)

// 卡片表
export const cardTable = createTable('card', false, false)

// 卡片详情表
export const cardDetailTable = createTable('card-detail', false, false)
