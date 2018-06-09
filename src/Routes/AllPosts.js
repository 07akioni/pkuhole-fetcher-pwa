import React, { Component } from 'react'
import Divider from '@material-ui/core/Divider'
import { CircularProgress, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import Post from '../Components/Post'
import { SET_CURRENT_TYPE, CLEAR_POSTS, SET_FROMPID, CLEAR_DETAIL, SET_DETAIL_HEAD } from '../Store/actionTypes'
import { getNextPage } from '../Services'
import { navigate } from '@reach/router'

let scrollTop = 0

class AllPosts extends Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {
    this.props.setCurrentType()
    if (this.props.posts.length === 0) {
      this.props.clearPosts()
      this.props.initPid()
      getNextPage()
    }
  }
  componentDidMount () {
    if (this.containerDOM) {
      this.scrollListener = this.containerDOM.addEventListener('scroll', (e) => {
        this.handleScroll()
      })
    }

    /*
     * restore scrollTop
     * not elegant at all
     * you should save its parentElement's parentElement's scrollTop to restore
     */
    
    if (this.containerDOM) {
      // console.log('set scrollTop', scrollTop)
      // console.log(this.selfDOM.parentElement.parentElement)
      this.containerDOM.scrollTop = scrollTop
    }
  }
  componentWillUnmount () {
    if (this.containerDOM) {
      this.containerDOM.removeEventListener('scroll', this.scrollListener)
    }
    /*
     * set scrollTop
     */
    if (this.containerDOM) {
      // console.log('set scrollTop', this.selfDOM.parentElement.parentElement.scrollTop)
      // console.log(this.selfDOM.parentElement.parentElement)
      scrollTop = this.containerDOM.scrollTop
    }
  }
  handleScroll (event) {
    if (this.props.fromPid === -1 && this.props.fromPid === 0) return
    if (this.containerDOM && this.selfDOM) {
      if (this.containerDOM.scrollTop + this.containerDOM.clientHeight >= this.selfDOM.clientHeight - 44 && !this.props.loadingPosts) {
        console.log(this.selfDOM)
        console.log(this.containerDOM.scrollTop, this.containerDOM.clientHeight, this.containerDOM.scrollTop + this.containerDOM.clientHeight, this.selfDOM.clientHeight)
        getNextPage()
      }
    }
  }
  mapState2Posts () {
    return this.props.posts.map(v => {
      return (
        <Post post={v} key={v.pid} onClick={() => {
          this.props.clearPostDetail()
          this.props.setPostDetailHead(v)
          navigate(`/postdetail/${v.pid}`)
         }}/>
      )
    })
  }
  
  render () {
    return (
      <div style={{ overflow: 'hidden' }} ref={ el => {
        this.selfDOM = el
        if (el) {
          this.containerDOM = el.parentElement.parentElement
        }
      } }>
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
            <Typography variant="body1">已加载全部信息</Typography>
          </div>
        }
      </div>
    )
  }
}

AllPosts = connect((state, ownProps) => {
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
    clearPostDetail: () => dispatch({
      type: CLEAR_DETAIL
    }),
    setPostDetailHead: (head) => dispatch({
      type: SET_DETAIL_HEAD,
      payload: {
        detail: {
          head: head
        }
      }
    }),
    setCurrentType: () => dispatch({
      type: SET_CURRENT_TYPE,
      payload: {
        currentType: 'default'
      }
    })
  }
})(AllPosts)

export default AllPosts