import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { getDateDiff } from '../Utils'
import { ListItem } from '@material-ui/core'

class Comment extends Component {
  style = {
    margin: 16
  }
  render () {
    const post = this.props.post
    return (
      <div>
        <ListItem button onClick={ this.props.onClick }>
          <div style={{ width: '100%' }}>
            <Typography variant="caption" gutterBottom>
              #{post.cid} · { getDateDiff(post.timestamp * 1000) }
            </Typography>
            <Typography variant="body1" gutterBottom style={{ wordWrap: 'break-word' }}>
              {post.text}
            </Typography>
          </div>
        </ListItem>
        <Divider />
      </div>
    )
  }
}

export default Comment