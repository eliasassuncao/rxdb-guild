import { createStore } from 'vuex'
import users from './modules/users'
import VuexOffline, { PouchDB } from '@bildvitta/vuex-offline'

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmNzgzYzVmMC1jMzU0LTRhNDUtODI1ZS05MGY0ZDVhODdhODkiLCJqdGkiOiJiMGU3NGY5YWUyMDI5NmY1ZWJlNjBjZjEzZGEzM2YwNTlkNjllZmEzNTY0MzY5YmJmYzMwYWM2MWVmYzIzZWM0YzNhZjkwY2JmYTUzYjk4NyIsImlhdCI6MTY1NTI0OTM5MC44MjIzNzIsIm5iZiI6MTY1NTI0OTM5MC44MjIzODMsImV4cCI6MTY4Njc4NTM5MC43NzAwODgsInN1YiI6IjEyIiwic2NvcGVzIjpbInByb2ZpbGUiXX0.enKtxe7Yno1vjdVGcHRIxKDYPz_W6wfDZq51eGZAL8uRmbjnGgyKluggVLMxE5WoNayT0BLVxoUqmN6fReEqQifDM-y11xWmL6RaBQyZCZw8dGITtWCchw7EQCFLcnwUmcOjH8FyJe-9IdMMQRUQR7UOXKnhsfNjBv_yIelkxjZpqXnaUPvk52yB6fM_9QaQj5GNdisj9Lv4q94ntm-7rBE6PjtoO3ZCJyRux67-RJKUjb8D-RF78mYrKB2KGuRiYVmgLv5oXKJQCBRuZ_Aw7jXiEe7ZdOXSyoItKCB1thm7d-Tvo6zsg-sLCKxAvQkfwfZ0R3JKYrSJ-Q9JxmywvAuDA2d9h7nzR-jwlnyLPNQ99u7voD8UwYer8rvx5lnAjiszFUrYIr7XPRnQmx7mDxJDIh-PJFc8lex3vD0r7cGczT35ze5j9-cztu8p9edvfBWIveM-WGRUT3ULOgyEUIsBrIKtCl_2IC2F3NVTuYhin9_kTmbZYnvg6cFKi12bur36Svj6HFsjlKUi87_2Egmi6Zlu-yM836dE5d9eUAm1auj57S-a6HEQXOf72R5tMCK8OU9bHbpC51IQRVuZ9ERZod3icCsziK1rAXoBzEkwShfHNDWgY_0_pba2GRCCB4lOWBatTLIxbzWhdMz_U0JbWR9qL7tm-Shvv6LxNso'

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
  ],

  sync: {
    options: {
      baseURL: 'https://localhost:3000/api/couchdb',
      direction: {
        push: true,
        pull: true
      },
      options: {
        fetch: (url, options) => {
          options.headers.set('Authorization', `Bearer ${token}`)

          return PouchDB.fetch(url, options)
        }
      }
    }
  }
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

  vuexOffline.makeSync(['users'])

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
