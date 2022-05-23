import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    nameInput: '',
    commentInput: '',
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteComment = id => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(eachComment => eachComment.id !== id),
    })
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachItem => (
      <CommentItem
        key={eachItem.id}
        commentDetails={eachItem}
        toggleIsLiked={this.toggleIsLiked}
        onDeleteComment={this.onDeleteComment}
      />
    ))
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  onSubmitComment = event => {
    event.preventDefault()
    const {nameInput, commentInput, commentsList} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      isLiked: false,
      initialClassName: initialContainerBackgroundClassNames,
      date: new Date(),
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  render() {
    const {commentsList, nameInput, commentInput} = this.state
    const commentsImage =
      'https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png'
    return (
      <div className="bg-cont">
        <div className="app-cont">
          <h1 className="heading">Comments</h1>
          <div className="form-cont">
            <form className="input-cont" onSubmit={this.onSubmitComment}>
              <p className="description">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="name-input"
                onChange={this.onChangeNameInput}
                placeholder="Your Name"
                value={nameInput}
              />
              <textarea
                className="comment-input"
                onChange={this.onChangeCommentInput}
                rows="6"
                value={commentInput}
                placeholder="Your Comment"
              />
              <button className="submit-button" type="submit">
                Add Comment
              </button>
            </form>
            <img
              src={commentsImage}
              alt="comments"
              className="comments-image"
            />
          </div>
          <p>
            <span className="comment-length">{commentsList.length}</span>
            Comments
          </p>
          <ul className="comment-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
