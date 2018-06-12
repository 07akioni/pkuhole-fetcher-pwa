import React, { Component } from 'react'
import { CircularProgress, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import Post from '../Components/Post'
import { SET_CURRENT_TYPE, CLEAR_POSTS, SET_FROMPID } from '../Store/actionTypes'
import { getNextPage } from '../Services'
import { RoutePadding, RouteBottomPadding } from '../Components/RouterPadding'

class DeletedPosts extends Component {
  componentDidMount () {
    this.props.setCurrentType()
    this.props.clearPosts()
    this.props.initPid()
    getNextPage()
    this.scrollListener = window.addEventListener('scroll', (e) => {
      this.handleScroll()
    })
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollListener)
  }
  mapState2Posts () {
    return this.props.posts.map(v => {
      return (
        <Post post={v} key={v.pid}/>
      )
    })
  }
  handleScroll (event) {
    if (this.props.fromPid === -1 && this.props.fromPid === 0) return
    if (window.scrollY + window.innerHeight >= document.scrollingElement.scrollHeight - 44 && !this.props.loadingPosts) {
      getNextPage()
    }
  }
  render () {
    return (
      <div>
        {
          this.mapState2Posts()
        }
        {
          this.props.fromPid === 0 ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8, width: '100%', height: '70vh' }}>
            <CircularProgress/>
          </div> :
          this.props.fromPid !== -1 ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8 }}>
            <CircularProgress size={ 28 }/>
          </div> :
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8 }}>
            <Typography variant="body2">已加载全部信息</Typography>
          </div>
        }
      </div>
    )
  }
}

DeletedPosts = connect((state, ownProps) => {
  return {
    posts: state.posts,
    fromPid: state.fromPid,
    loadingPosts: state.loadingPosts
  }
}, (dispatch, ownProps) => {
  return {
    initPid: () => dispatch({
      type: SET_FROMPID,
      payload: {
        fromPid: 0
      }
    }),
    clearPosts: () => dispatch({
      type: CLEAR_POSTS
    }),
    setCurrentType: () => dispatch({
      type: SET_CURRENT_TYPE,
      payload: {
        currentType: 'deleted'
      }
    })
  }
})(DeletedPosts)

export default DeletedPosts