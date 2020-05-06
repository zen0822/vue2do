import Dexie from 'dexie'
import { mock as getMock } from 'mockjs'
import mockrc from '../../mock.config'

interface IApi {
  data: IApiData[]
  key: string
  total?: number
  url: string
}

interface IApiData {
  children?: any[]
  key: string
  content?: any
  tpl?: string
}

const db = new Dexie('DBMock')
const mockApi: IApi[] = mockrc.api

/**
 * 解析模拟数据生成数据库表
 */
function createTable(): Record<string, string> {
  const tableHub = {}

  mockApi.map((apiItem) => {
    const cols = apiItem.data.map((dataItem) => dataItem.key)
    const dataTotal = apiItem.total ?? 1

    Object.assign(tableHub, {
      [apiItem.key]: `${dataTotal > 1 ? '++id' : ''}, ${cols.join(', ')}`
    })
  })

  return tableHub
}

/**
 * 给数据库表添加模拟数据
 */
function createMockData(dbMock: Dexie): void {
  mockApi.map(async (apiItem): Promise<void> => {
    const colData = {}

    apiItem.data?.map((apiItemDataItem) => {
      let randomData = apiItemDataItem.content
      randomData = getMock(apiItemDataItem.tpl) ?? 'children'

      Object.assign(colData, {
        [apiItemDataItem.key]: randomData
      })
    })

    try {
      await dbMock.table(apiItem.key).put(colData)
    } catch (error) {
      console.warn(error)
    }
  })
}

db.version(1).stores(createTable())
createMockData(db)

export default db
