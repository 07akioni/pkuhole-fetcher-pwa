import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import RefreshIcon from '@material-ui/icons/Refresh'
import { Router } from '@reach/router'
import { refreshCurrentTab } from '../../Services'
import DefaultToolBar from './DefaultToolBar'
import PostDetailToolBar from './PostDetailToolBar'
import SearchToolBar from './SearchToolBar'

class AppTopBar extends Component {
  style = {
    width: '100%',    
    paddingTop: 'env(safe-area-inset-top)'
  }
  titleStyle = {
    color: 'white',
    flexGrow: 1
  }
  render () {
    return (
      <AppBar position="fixed" style={this.style}>
        <Router>
          <PostDetailToolBar path="/postdetail/:pid" />
          <SearchToolBar path="/search"/>
          <DefaultToolBar default/>
        </Router>
      </AppBar>
    )
  }
}

export default AppTopBar