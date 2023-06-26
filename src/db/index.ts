import indexedDB from '@/utils/indexedDB' //引入数据库的类
import languageObjectStore from './objectStores/language' //引入语言类型对象仓库
import userObjectStore from './objectStores/user' //引入用户信息对象仓库

// 数据库
export const airbnbDB = new indexedDB('airbnb')

// 暴露数据库对象仓库
export { languageObjectStore, userObjectStore }
