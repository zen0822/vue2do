import Dexie from 'dexie'

export interface IMock {
  id?: number,
  data: object,
  api: string,
  name: string
}

export class DBMock extends Dexie {
  mock: Dexie.Table<IMock, number>

  constructor() {
    super('DBMock')

    this.version(1).stores({
      mock: 'name, api, data'
    })

    this.mock = this.table('mock')
  }
}

const db = new DBMock()

export default db
