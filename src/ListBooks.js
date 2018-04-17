import React, { Component } from 'react';
import PropTypes from 'prop-types'


class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    const books = this.props.books;
    return (
      <div>
        {books.map((book)=>(
          <div key={book.title}>
            <p> {book.title}</p>
            <p> {book.shelf}</p>
          </div>
        ))
        }
      </div>);
  }
}

export default ListBooks;
