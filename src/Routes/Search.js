import React, { Component } from 'react'
import Post from '../Components/Post'
import { ListItem, CircularProgress, Typography } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import { search as searchService } from '../Services'
import { connect } from 'react-redux'
import { CLEAR_SEARCH_POSTS, SET_DETAIL_HEAD, CLEAR_DETAIL, SET_SEARCH_KEYWORDS } from '../Store/actionTypes'
import { navigate } from '@reach/router'

let scrollTop = 0

class Search extends Component {
  componentWillMount () {
  }
  input = (e) => {
    this.props.setKeywords(e.target.value)
  }
  componentDidMount () {
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
    /*
     * set scrollTop
     */
    if (this.containerDOM) {
      // console.log('set scrollTop', this.selfDOM.parentElement.parentElement.scrollTop)
      // console.log(this.selfDOM.parentElement.parentElement)
      scrollTop = this.containerDOM.scrollTop
    }
  }
  search = (e) => {
    if (this.props.loading) return
    if (e.charCode === 13) {
      this.props.clear()
      if (this.props.keywords.trim()) {
        if (this.props.keywords.length <= 10) {
          searchService(this.props.keywords)
        } else {
          alert('输入关键词过长')
        }
      } else {
       alert('请输入搜索内容')
      }
    }
  }
  posts = () => {
    return this.props.posts.slice(0, 300).map(v => {
      return (
        <Post key={v.pid} post={v} onClick={() => {
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
        <ListItem>
          <div style={{ borderRadius: 2, position: 'relative', background: '#eeeeee', display: 'flex', width: '100%' }}>
            <div style={{ width: 72, height: '100%', display: 'flex', position: 'absolute', alignItems: 'center', pointerEvents: 'none', justifyContent: 'center' }}><SearchIcon /></div>
            <input style={{ border: 0, margin: 0, padding: '8px 8px 8px 72px', color: 'inherit', background: 'none', outline: 'none', flexGrow: '1' }} onChange={this.input} onKeyPress={this.search} value={this.props.keywords} />
          </div>
        </ListItem>
        {
          this.props.loading ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8 }}>
            <CircularProgress size={ 28 }/>
          </div> :
          null
        }
        { this.posts() }
        {
          this.props.posts.length > 300 ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 8 }}>
            <Typography variant="body1">仅显示前 300 条搜索结果</Typography>
          </div> :
          null
        }
      </div>
    )
  }
}

Search = connect((state, ownProps) => {
  return {
    loading: state.searchLoading,
    posts: state.searchPosts,
    keywords: state.searchKeywords
  }
}, (dispatch, ownProps) => {
  return {
    clear: () => dispatch({
      type: CLEAR_SEARCH_POSTS
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
    setKeywords: (keywords) => dispatch({
      type: SET_SEARCH_KEYWORDS,
      payload: {
        searchKeywords: keywords
      }
    })
  }
})(Search)

export default Search