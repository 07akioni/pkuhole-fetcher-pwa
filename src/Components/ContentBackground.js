import React, { Component } from 'react'

class ContentBackground extends Component {
  style = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    width: '100%',
    background: 'white',
    zIndex: -2
  }
  render () {
    return <div style={this.style}></div>
  }
}

export default ContentBackground