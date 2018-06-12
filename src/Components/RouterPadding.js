import React, { Component } from 'react'

class RoutePadding extends Component {
  style = {
    width: '100%',
    paddingTop: 'env(safe-area-inset-top)',
    height: 56
  }
  render () {
    return <div style={this.style}></div>
  }
}

class RouteBottomPadding extends Component {
  style = {
    width: '100%',
    height: 56,
    paddingBottom: 'env(safe-area-inset-bottom)'
  }
  render () {
    return <div style={this.style}></div>
  }
}

export {
  RoutePadding,
  RouteBottomPadding
}