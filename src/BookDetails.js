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
    </div>
  );
}
}

export default BookDetails;