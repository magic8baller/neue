import React from 'react'

const Like = props => {
  return (
    <i
      style={{ cursor: 'pointer' }}
      onClick={props.onClick}
      className={props.liked ? 'fas fa-heart' : 'far fa-heart'}
      aria-hidden="true"
    />
  )
}

export default Like
