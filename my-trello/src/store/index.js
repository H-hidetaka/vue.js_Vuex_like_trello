import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedLists = localStorage.getItem('trello-lists')


const store = new Vuex.Store({
  // localStorageにはJSON形式の文字列型でデータが保存されているので、取得するときにはJSON.parse(取得するデータ)でオブジェクトに変換する必要があります。
  state: {
    lists: savedLists ? JSON.parse(savedLists):[
      {
        title: 'Backlog',
        cards: [
          { body: 'English' },
          { body: 'Mathematics' },
        ]
      },
      {
        title: 'Todo',
        cards: [
          { body: 'Science' }
        ]
      },
      {
        title: 'Doing',
        cards: []
      }
    ],
  },
  mutations: {
    addlist(state,payload) {
      state.list.push({ title: payload.title, cards:[] })
    },
  },
  actions: {
    addlist(context,payload) {
      context.commit('addlist',payload)
    },
  },
  getters: {
  }
})
// データの状態を更新後にlocalStorageへデータの状態を保存しています
// localStorage.setItem('設定するキー', 文字列型のデータ)
store.subscribe((mutation, state) => {
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

export default store
