import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { Refresh, ArrowBack } from '@material-ui/icons'
import { Router, navigate } from '@reach/router'
import { refreshCurrentTab } from '../../Services'
import TweenOne from 'rc-tween-one'

class PostDetailToolBar extends Component {
  titleStyle = {
    color: 'white',
    flexGrow: 1,
    textAlign: 'center'
  }
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
  back () {
    window.history.go(-1)
  }
  render () {
    /*
     * RefreshButton should refresh current post
     */
    return (
      <TweenOne animation={this.animation} style={this.tweenStyle}>
        <Toolbar>
          <IconButton color="inherit"><ArrowBack onClick={this.back} /></IconButton>
          <Typography variant="title" style={this.titleStyle}>
            #{this.props.pid}
          </Typography>
          <IconButton color="inherit" style={{ opacity: 0 }}><Refresh /></IconButton>
        </Toolbar>
      </TweenOne>
    )
  }
}

export default PostDetailToolBar