import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import RefreshIcon from '@material-ui/icons/Refresh'
import { Router } from '@reach/router'
import { refreshCurrentTab } from '../../Services'

class SearchToolBar extends Component {
  titleStyle = {
    color: 'white',
    flexGrow: 1
  }
  render () {
    return (
      <Toolbar>
        <Typography variant="title" style={this.titleStyle}>
          PKUHOLE ARCHIVE
        </Typography>
      </Toolbar>
    )
  }
}

export default SearchToolBar