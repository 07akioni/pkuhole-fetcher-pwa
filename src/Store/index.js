import { createStore } from 'redux'
import *  as type from './actionTypes'
import produce from 'immer'

const initialState = {
  currentType: null,

  fromPid: 0,
  posts: [],
  loadingPosts: false,

  fromHotPid: 0,
  hotPosts: [],
  loadingHotPosts: false,

  fromDeletedPid: 0,
  deletedPosts: [],
  loadingDeletedPosts: false,

  searchLoading: false,
  searchPosts: [],
  searchKeywords: '',
  
  detail: {
    head: {},
    body: []  
  },
  loadingDetail: false
}


const app = (state, action) => {
  const payload = action.payload
  if (typeof state === 'undefined') return produce(initialState, draft => {})
  else return produce(state, draft => {
    switch (action.type) {
      case type.SET_CURRENT_TYPE:
        draft.currentType = payload.currentType
        break
      /*
       * actions for all posts
       */
      case type.CLEAR_POSTS:
        draft.posts = []
        break
      case type.APPEND_POSTS:
        draft.posts = draft.posts.concat(payload.posts)
        break
      case type.SET_POSTS_LOADING:
        draft.loadingPosts = !!payload.loadingPosts
        break
      case type.SET_FROMPID:
        draft.fromPid = payload.fromPid
        break
      /*
       * actions for hot posts
       */
      case type.CLEAR_HOT_POSTS:
        draft.hotPosts = []
        break
      case type.APPEND_HOT_POSTS:
        draft.hotPosts = draft.hotPosts.concat(payload.hotPosts)
        break
      case type.SET_HOT_POSTS_LOADING:
        draft.loadingHotPosts = !!payload.loadingHotPosts
        break
      case type.SET_HOT_FROMPID:
        draft.fromHotPid = payload.fromHotPid
        break
      /*
       * actions for detail page
       */
      case type.SET_DETAIL_HEAD:
        draft.detail.head = payload.detail.head
        break
      case type.SET_DETAIL_BODY:
        draft.detail.body = payload.detail.body
        break
      case type.SET_DETAIL_LOADING:
        draft.loadingDetail = !!payload.loadingDetail
        break
      case type.CLEAR_DETAIL:
        draft.detail = {
          head: {},
          body: []
        }
        break
      /*
       * actions for search page
       */
      case type.SET_SEARCH_LOADING:
        draft.searchLoading = payload.searchLoading
        break
      case type.APPEND_SEARCH_POSTS:
        draft.searchPosts = draft.searchPosts.concat(payload.searchPosts)
        break
      case type.CLEAR_SEARCH_POSTS:
        draft.searchPosts = []
        break
      case type.SET_SEARCH_KEYWORDS:
        draft.searchKeywords = payload.searchKeywords
        break
      default:
        break
    }
  })
}

const store = createStore(app)

export default store