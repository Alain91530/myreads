import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import {get} from './BooksAPI';

class SearchBooks extends Component {
  state = {
    books: [],
    query: ''
  };

  /* Get all books from the data base and update state to have it renderer    */



  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>

    );
  }
}

export default SearchBooks;
