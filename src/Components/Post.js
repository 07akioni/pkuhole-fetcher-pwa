import React, { Component } from 'react'
import { Typography, Chip } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import { getDateDiff } from '../Utils'
import { ListItem } from '@material-ui/core'

class Post extends Component {
  render () {
    const post = this.props.post
    return (
      <div>
        <ListItem button onClick={ this.props.onClick }>
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex' }}>
              <Typography variant="caption" gutterBottom style={{ flexGrow: 1}}>
                #{post.pid} · { getDateDiff(post.timestamp * 1000) }
              </Typography>
              {
                post.deleted ?
                <Typography variant="caption" gutterBottom style={{ borderRadius: '2px', border: '1px solid rgba(0, 0, 0, .45)', padding: '0 .5em 0 .5em'}}>
                  已删除
                </Typography> : null
              }
            </div>
            <Typography variant="body1" gutterBottom style={{ wordWrap: "break-word" }}>
              {post.text}
            </Typography>
            <Typography variant="caption">{post.likenum} 关注 · {post.reply} 回复</Typography>
          </div>
        </ListItem>
        <Divider />
      </div>
    )
  }
}

export default Post