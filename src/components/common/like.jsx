import React from 'react'

const Like = props => {
  return (
    <i
      onClick={props.onClick}
      className={
        props.liked ? 'clickable fas fa-heart' : 'clickable far fa-heart'
      }
      aria-hidden="true"
    />
  )
}

export default Like
