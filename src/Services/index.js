import store from '../Store'
import * as type from '../Store/actionTypes'
import axios from 'axios'

function refreshCurrentTab () {
  const state = store.getState()
  const dispatch = store.dispatch
  console.log(state.currentType)
  switch (state.currentType) {
    case 'default':
      dispatch({
        type: type.SET_FROMPID,
        payload: {
          fromPid: 0
        }
      })
      dispatch({
        type: type.CLEAR_POSTS
      })
      getNextPage()
      break
    case 'hot':
      dispatch({
        type: type.SET_HOT_FROMPID,
        payload: {
          fromHotPid: 0
        }
      })
      dispatch({
        type: type.CLEAR_HOT_POSTS
      })
      getHotNextPage()
      break
    default:
      break
  }
  
}

/*
 * 需要思考要不要依赖外面参数
 */
function getNextPage () {
  const state = store.getState()
  const dispatch = store.dispatch
  if (state.loadingPosts || state.fromPid === -1) {
    return
  } else {
    dispatch({
      type: type.SET_POSTS_LOADING,
      payload: {
        loadingPosts: true
      }
    })
    axios
      .get('/q', {
        params: {
          fromPid: state.fromPid,
          type: state.currentType
        }
      })
      .then(res => {
        if (res.data.data.length === 0) {
          dispatch({
            type: type.SET_FROMPID,
            payload: {
              fromPid: -1
            }
          })
        } else {
          dispatch({
            type: type.APPEND_POSTS,
            payload: {
              posts: res.data.data
            }
          })
          dispatch({
            type: type.SET_FROMPID,
            payload: {
              fromPid: res.data.data[res.data.data.length - 1].pid
            }
          })
        }
        dispatch({
          type: type.SET_POSTS_LOADING,
          payload: {
            loadingPosts: false
          }
        })
      })
      .catch(err => {
        alert('出错了，暂时懒得写错误处理')
        dispatch({
          type: type.SET_POSTS_LOADING,
          payload: {
            loadingPosts: false
          }
        })
      })
  }
}

function getNextPage () {
  const state = store.getState()
  const dispatch = store.dispatch
  if (state.loadingPosts || state.fromPid === -1) {
    return
  } else {
    dispatch({
      type: type.SET_POSTS_LOADING,
      payload: {
        loadingPosts: true
      }
    })
    axios
      .get('/q', {
        params: {
          fromPid: state.fromPid,
          type: state.currentType
        }
      })
      .then(res => {
        if (res.data.data.length === 0) {
          dispatch({
            type: type.SET_FROMPID,
            payload: {
              fromPid: -1
            }
          })
        } else {
          dispatch({
            type: type.APPEND_POSTS,
            payload: {
              posts: res.data.data
            }
          })
          dispatch({
            type: type.SET_FROMPID,
            payload: {
              fromPid: res.data.data[res.data.data.length - 1].pid
            }
          })
        }
        dispatch({
          type: type.SET_POSTS_LOADING,
          payload: {
            loadingPosts: false
          }
        })
      })
      .catch(err => {
        alert('出错了，暂时懒得写错误处理')
        dispatch({
          type: type.SET_POSTS_LOADING,
          payload: {
            loadingPosts: false
          }
        })
      })
  }
}

function getHotNextPage () {
  const state = store.getState()
  const dispatch = store.dispatch
  if (state.loadingHotPosts || state.fromHotPid === -1) {
    return
  } else {
    dispatch({
      type: type.SET_HOT_POSTS_LOADING,
      payload: {
        loadingHotPosts: true
      }
    })
    axios
      .get('/q', {
        params: {
          fromPid: state.fromHotPid,
          type: 'hot'
        }
      })
      .then(res => {
        if (res.data.data.length === 0) {
          dispatch({
            type: type.SET_HOT_FROMPID,
            payload: {
              fromHotPid: -1
            }
          })
        } else {
          dispatch({
            type: type.APPEND_HOT_POSTS,
            payload: {
              hotPosts: res.data.data
            }
          })
          dispatch({
            type: type.SET_HOT_FROMPID,
            payload: {
              fromHotPid: res.data.data[res.data.data.length - 1].pid
            }
          })
        }
        dispatch({
          type: type.SET_HOT_POSTS_LOADING,
          payload: {
            loadingHotPosts: false
          }
        })
      })
      .catch(err => {
        alert('出错了，暂时懒得写错误处理')
        dispatch({
          type: type.SET_HOT_POSTS_LOADING,
          payload: {
            loadingPosts: false
          }
        })
      })
  }
}

function getDetail (pid) {
  const state = store.getState()
  const dispatch = store.dispatch
  dispatch({
    type: type.SET_DETAIL_LOADING,
    payload: {
      loadingDetail: true
    }
  })
  axios
    .get('/d', {
      params: {
        pid: pid
      }
    })
    .then(res => {
      const reply = JSON.parse(res.data.data.text).data
      dispatch({
        type: type.SET_DETAIL_LOADING,
        payload: {
          loadingDetail: false
        }
      })
      dispatch({
        type: type.SET_DETAIL_BODY,
        payload: {
          detail: {
            body: reply
          }
        }
      })
      console.log(reply)
    })
    .catch(err => {
      dispatch({
        type: type.SET_DETAIL_LOADING,
        payload: {
          loadingDetail: false
        }
      })
      alert('出现问题了，但我懒得写代码解决')
    })
}

function search (value) {
  const dispatch = store.dispatch
  dispatch({
    type: type.SET_SEARCH_LOADING,
    payload: {
      searchLoading: true
    }
  })
  axios
    .get('/s', {
      params: {
        keywords: value
      }
    })
    .then(res => {
      dispatch({
        type: type.APPEND_SEARCH_POSTS,
        payload: {
          searchPosts: res.data.data
        }
      })
      dispatch({
        type: type.SET_SEARCH_LOADING,
        payload: {
          searchLoading: false
        }
      })
    })
    .catch(err => {
      dispatch({
        type: type.SET_SEARCH_LOADING,
        payload: {
          searchLoading: false
        }
      })
    })
}

export {
  getNextPage,
  getHotNextPage,
  refreshCurrentTab,
  getDetail,
  search
}