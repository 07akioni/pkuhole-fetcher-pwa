import React, { Component } from 'react'
import { getDetail } from '../Services'
import { connect } from 'react-redux'
import  { CLEAR_DETAIL, SET_DETAIL_HEAD, SET_DETAIL_LOADING } from '../Store/actionTypes'
import { CircularProgress, Typography, Divider } from '@material-ui/core'
import Post from '../Components/Post'
import Comment from '../Components/Comment'
import TweenOne from 'rc-tween-one'

/*
 *
 */
class PostDetail extends Component {
  animation = {
    x: '0%',
    opacity: '1',
    duration: 200
  }
  tweenStyle = {
    transform: 'translate(10%, 0)',
    opacity: '0',
    ease: 'easeOutQuad'
  }
  componentDidMount () {
    this.props.setLoading(true)
    getDetail(this.props.pid)
  }
  mapBody2Comment () {
    return this.props.body.map(v => {
      return <Comment post={v} key={v.cid}/>
    })
  }
  render () {
    return (
      <TweenOne animation={this.animation} style={this.tweenStyle}>
        <Post post={this.props.head} />
        {
          this.props.loading ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8 }}>
            <CircularProgress size={ 28 }/>
          </div> :
          this.props.body.length === 0 ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8 }}>
            <Typography variant="body1">暂无回复</Typography>
          </div> :
          <div>{this.mapBody2Comment()}</div>
        }
      </TweenOne>
    )
  }
}

PostDetail = connect((state, ownProps) => {
  return {
    head: state.detail.head,
    body: state.detail.body,
    loading: state.loadingDetail
  }
}, (dispatch, ownProps) => {
  return {
    setHead (head) {
      dispatch({
        type: SET_DETAIL_HEAD,
        payload: {
          detail: {
            head: head
          }
        }
      })
    },
    setLoading (loading) {
      dispatch({
        type: SET_DETAIL_LOADING,
        payload: {
          loadingDetail: loading
        }
      })
    }
  }
})(PostDetail)

export default PostDetail