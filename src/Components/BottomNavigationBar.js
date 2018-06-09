import React, { Component } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import DeleteIcon from '@material-ui/icons/Delete'
import SearchIcon from '@material-ui/icons/Search'
import { connect } from 'react-redux'
import { navigate, Location } from '@reach/router'
import DefaultToolBar from './AppTopBar/DefaultToolBar';

class BottomNavigationBar extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  styles = {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    borderTop: '1px solid #eeeeee',
    paddingBottom: 'env(safe-area-inset-bottom)'
  }
  handleChange () {
    this.forceUpdate()
  }
  render () {
    return (
      <Location>
        {
          ({location}) => {
            let value = null
            switch (location.pathname) {
              case '/':
                value = 'default'
                break
              case '/hot':
                value = 'hot'
                break
              case '/search':
                value = 'search'
                break
              default:
                break
            }
            return (
              <BottomNavigation value={value} onChange={this.handleChange} style={this.styles}>
                <BottomNavigationAction label="最近" value="default" icon={<RestoreIcon />} onClick={ () => navigate('/') } />
                <BottomNavigationAction label="热门" value="hot" icon={<WhatshotIcon />} onClick={ () => navigate('/hot') } />
                { /*<BottomNavigationAction label="已删" value="nearby" icon={<DeleteIcon />} onClick={ () => navigate('/deleted') }/> */ }
                <BottomNavigationAction label="搜索" value="search" icon={<SearchIcon />} onClick={ () => navigate('/search') } />
              </BottomNavigation>
            )
          }
          
        }
      </Location>
    )
  }
}

BottomNavigationBar = connect((state, ownProps) => {
  return {}
}, (dispatch, ownProps) => {
  return {}
})(BottomNavigationBar)


export default BottomNavigationBar