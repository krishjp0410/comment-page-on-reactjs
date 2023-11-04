import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
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

  toggleIsClicked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLike: !eachComment.isLike}
        }
        return eachComment
      }),
    }))
  }

  onDelete = id => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(eachComment => eachComment.id !== id),
    })
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialContainerBackgroundClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      isLike: false,
      date: new Date(),
      initialClassName: initialContainerBackgroundClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeComment = event => {
    this.setState({commentInput: event.target.value})
  }

  renderCommentsList = () => {
    const {commentsList} = this.props

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsClicked={this.toggleIsClicked}
        onDelete={this.onDelete}
      />
    ))
  }

  render() {
    const {commentsList, nameInput, commentInput} = this.state

    return (
      <div className="app-container">
        <div>
          <h1 className="heading">Comments</h1>
          <div className="comment-container">
            <form className="comment-card" onSubmit={this.onAddComment}>
              <p className="comment-title">
                Say something about 4.0 Technologies
              </p>
              <input
                className="input"
                type="text"
                onChange={this.onChangeName}
                value={nameInput}
                placeholder="Your Name"
              />
              <textarea
                type="text"
                onChange={this.onChangeComment}
                value={commentInput}
                placeholder="Your Comment"
                rows="6"
              />
              <button className="add-button" type="submit">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr />
          <p>
            <span className="count-of-comments">{commentsList.length}</span>{' '}
            Comments
          </p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
