import type { IResult } from '@/api/interface'

export default class indexedDB {
  private dbName: string
  private db: any //数据库对象

  constructor(dbName: string) {
    this.dbName = dbName
  }

  // 打开数据库 + 对象仓库（参数：对象仓库数组、主键名、索引数组）
  public openStore(stores: any) {
    const request = window.indexedDB.open(this.dbName, 4)

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        console.log('数据库打开成功')
        this.db = event.target.result
        console.log(event)
        resolve(true)
      }
      request.onerror = (event) => {
        console.log('数据库打开失败')
        console.log(event)
      }

      // 数据库更新成功的回调（第一次打开数据库才会执行！）
      request.onupgradeneeded = (event) => {
        console.log('数据库更新成功')
        const { result }: any = event.target
        // 初始化多个对象仓库
        for (const storeName in stores) {
          const { keyPath, indexs } = stores[storeName]
          //  没有表则新建表
          if (!result.objectStoreNames.contains(storeName)) {
            const store = result.createObjectStore(storeName, {
              autoIncrement: true,
              keyPath,
            })
            // 新建索引
            if (indexs && indexs.length) {
              indexs.map((v: string) => {
                store.createIndex(v, v, { unique: false })
              })
            }
            // 验证store是否创建成功
            store.transaction.oncomplete = (event: any) => {
              console.log('创建对象仓库成功')
            }
          }
        }
      }
    })
  }

  // 新增/修改数据库数据
  updateItem(storeName: string, data: any) {
    // 打开对象仓库
    const store = this.db
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)

    // 仓库写入数据
    const request = store.put({
      ...data,
      // 加入时间戳，同时将unqiue改为false，可以实现传入id修改数据
      updateTIme: new Date().getTime(),
    })

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log('数据写入成功')
        console.log(event)
        resolve(true)
      }

      request.onerror = (event: any) => {
        console.log('数据写入失败')
        console.log(event)
      }
    })
  }

  // 删除数据库数据
  deleteItem(storeName: string, key: number | string) {
    // 打开对象仓库
    const store = this.db
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)

    // 仓库删除数据
    const request = store.delete(key)

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log('数据删除成功')
        console.log(event)
        resolve(true)
      }

      request.onerror = (event: any) => {
        console.log('数据删除失败')
        console.log(event)
      }
    })
  }

  // 查询所有数据
  getList(storeName: string) {
    // 打开对象仓库
    const store = this.db.transaction(storeName).objectStore(storeName)
    // 查询所有数据
    const request = store.getAll()
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log('查询所有数据成功')
        console.log(event.target.result)
        resolve(event.target.result)
        resolve(true)
      }

      request.onerror = (event: any) => {
        console.log('查询所有数据失败')
        console.log(event)
      }
    })
  }

  // 查询某一条数据
  getItem(storeName: string, key: number | string) {
    // 打开对象仓库
    const store = this.db.transaction(storeName).objectStore(storeName)

    // 查询某一条数据
    const request = store.get(key)

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log('查询一条数据成功')
        console.log(event)
        resolve(event)
      }

      request.onerror = (event: any) => {
        console.log('查询一条数据失败')
        console.log(event)
      }
    })
  }
}
