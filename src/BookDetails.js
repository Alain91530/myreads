import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import {get} from './BooksAPI';

class BookDetails extends Component {

state = {
  book: {title: ''},
  bookId:  this.props.match.params.number
}

componentDidMount() {
  console.log(this.state.bookId)
  get(this.state.bookId).then((book) => {
    this.setState({book: book});})
}

render() {

  const bookId = this.props.bookId;
  const book = this.state.book;

  console.log(bookId,book)
  return (
    <div className="detailed-desc">
      <div className="detailed-title">
        <h1>Title: {book.title}</h1>
      </div>
      {book.hasOwnProperty('imageLinks')&&(<div className="detailed-book-cover"
        style={{backgroundImage: `url(${book.imageLinks.thumbnail})`
        }} />)}
      <div className="infos-container">
        <div className="detailed-summary">
          <span className="detailed-info">Authors:</span>
          <span> {book.authors}</span>
        </div>
        <div className="detailed-summary">
          <span className="detailed-info">Summary:</span>
          <span> {book.description}</span>
        </div>
      </div>
    </div>
  );
}
}

export default BookDetails;