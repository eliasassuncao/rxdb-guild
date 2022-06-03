import { createStore } from 'vuex'
import users from './modules/users'
import VuexOffline from '@bildvitta/vuex-offline'
import usersMock from './mocks/users.json'

const vuexOffline = new VuexOffline({
  idKey: 'uuid',

  storage: 'idb',

  database: {
    name: 'guildadb',
    multiInstance: true,
    ignoreDuplicate: true
  },

  modules: [
    users
  ]
})

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default async function (/* { ssrContext } */) {
  await vuexOffline.createDatabase()
  await vuexOffline.setupCollections()

  const { users } = vuexOffline.collections

  console.log(users)

  const hash = users.schema?.hash

  console.log(hash, '<-- hash')

  users.importJSON(({ docs: usersMock, schemaHash: hash }))

  window.vuexOffline = vuexOffline

  const Store = createStore({
    modules: {
      ...vuexOffline.getStoreModules()
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
}
