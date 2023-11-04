import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleIsClicked, onDelete} = props
  const {id, name, comment, isLike, date, initialClassName} = commentDetails

  const postedTime = formatDistanceToNow(date)

  const onLikeClicked = () => {
    toggleIsClicked(id)
  }

  const onClickDelete = () => {
    onDelete(id)
  }

  const startImgUrl = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  return (
    <li>
      <div className={initialClassName}>
        <p>{initialClassName}</p>
      </div>
      <div>
        <p>{name}</p>
        <p>{postedTime} ago</p>
      </div>
      <p>{comment}</p>
      <div className="like-and-delete-card">
        <div>
          <img src={startImgUrl} alt="like" />
          <button className="button" type="button" onClick={onLikeClicked}>
            like
          </button>
        </div>
        <button className="button" type="button" onClick={onClickDelete}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
