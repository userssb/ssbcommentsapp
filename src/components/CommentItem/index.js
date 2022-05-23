import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, onDeleteComment} = props
  const {id, name, date, comment, isLiked, initialClassName} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const postedTime = formatDistanceToNow(date)
  const likeTextClassName = isLiked ? 'button active' : 'button'
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  const deleteComment = () => {
    onDeleteComment(id)
  }

  return (
    <div className="list-item">
      <li className="comment-item">
        <div className="comment-cont">
          <div className="init-user-date-cont">
            <div className={initialClassName}>
              <p className="initial-cont">{initial}</p>
            </div>
            <div className="user-date-cont">
              <p>{name}</p>
              <p className="date-time">{postedTime}</p>
            </div>
          </div>
          <p>{comment}</p>
        </div>
        <div className="button-cont">
          <div className="like-cont">
            <img src={likeImageUrl} alt="like" className="like-image" />
            <button
              className={likeTextClassName}
              type="button"
              onClick={onClickLike}
            >
              Like
            </button>
          </div>
          <button type="button" className="del-but" onClick={deleteComment}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
              className="delete-image"
            />
          </button>
        </div>
        <hr className="comment-line" />
      </li>
    </div>
  )
}
export default CommentItem
