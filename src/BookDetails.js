import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import {get} from './BooksAPI';
import { Link } from 'react-router-dom';  // eslint-disable-line no-unused-vars


class BookDetails extends Component {

state = {
  book: {authors:[],
    description: ''},
  bookId:  this.props.match.params.number
}

componentDidMount() {
  get(this.state.bookId).then((book) => {
    this.setState({book: book});})
}

render() {

  const book = this.state.book;
  /* Intialise to warn user is info is not available */
  if (!(book.hasOwnProperty('authors'))) book.authors = 'Not available';
  if (!(book.hasOwnProperty('description'))) book.description = 'Not available';
  if (!(book.hasOwnProperty('pageCount'))) book.pageCount = 'Not available';
  if (!(book.hasOwnProperty('publisher'))) book.publisher = 'Not available';
  if (!(book.hasOwnProperty('publishedDate'))) book.publishedDate = 'Not available';

  return (
    <div className="detailed-desc">
      <div className="detailed-title">
        <h1>Title: {book.title}</h1>
        <Link
            to='/'
            className="back-home"
          >Back to My reads</Link>
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
        <div className="detailed-summary">
          <span className="detailed-info">Number of pages:</span>
          <span> {book.pageCount}</span>
        </div>
        <div className="detailed-summary">
          <span className="detailed-info">Date of publication:</span>
          <span> {book.publishedDate}</span>
        </div>
        <div className="detailed-summary">
          <span className="detailed-info">Publisher:</span>
          <span> {book.publisher}</span>
        </div>
        <div className="detailed-summary">
          <span className="detailed-info">View on </span>
          <a
            href = {`${book.canonicalVolumeLink}`} >
           Google Books
          </a>
        </div>
      </div>
    </div>
  );
}
}

export default BookDetails;