import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, navigate } from '@reach/router'
import store from './Store'
import BottomNavigationBar from './Components/BottomNavigationBar'
import AllPosts from './Routes/AllPosts'
import DeletedPosts from './Routes/DeletedPosts'
import HotPosts from './Routes/HotPosts'
import Search from './Routes/Search'
import AppTopBar from './Components/AppTopBar/index.js'
import PostDetail from './Routes/PostDetail'

class App extends Component {
  componentDidMount () {
    // navigate('/')
  }
  render () {
    return (
      <Provider store={store}>
        <div className="App">
          { /* <div style={{ position: 'fixed', width: '100%', top: 56, paddingTop: 'env(safe-area-inset-top)', bottom: 56, paddingBottom: 'env(safe-area-inset-bottom)', overflowX: 'auto', '-webkit-overflow-scrolling': 'touch', overflowY: 'auto' }}> */ }
          <Router style={{ zIndex: -1, overflowX: 'hidden' }}>
            <AllPosts path="/" />
            <HotPosts path="/hot" />
            <DeletedPosts path="/deleted" />
            <Search path="/search" />
            <PostDetail path="/postdetail/:pid" />
          </Router>
          <AppTopBar style={{ zIndex: -1 }}/>
          <BottomNavigationBar style={{ zIndex: -1 }}/>
        </div>
      </Provider>
    )
  }
}

export default App;
