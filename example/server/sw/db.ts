import Dexie from 'dexie'

export default class DBMock extends Dexie {
  mock: Dexie.Table<IMock, number>

  constructor() {
    super('DBMock')

    //
    // Define tables and indexes
    // (Here's where the implicit table props are dynamically created)
    //
    this.version(1).stores({
      mock: '++id, api, data'
    })

    // The following lines are needed for it to work across typescipt using babel-preset-typescript:
    this.mock = this.table('mock')
  }
}

// By defining the interface of table records,
// you get better type safety and code completion
export interface IMock {
  id?: number // Primary key. Optional (autoincremented)
  data: string,
  api: string
}
