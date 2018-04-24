
// Import required files

import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import RenderBook from './RenderBook';   // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import {getAll} from './BooksAPI';

/* Enforce type of props                                                      */
class ListBooks extends Component {
  PropTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired
  }

  /* Set the state once the component hase monted */
  componentDidMount() {
    getAll().then((books) => {
      this.setState({ books });
    });
  }

  /* Render the shelves                                                       */
  render() {
    /* consts just for convenience                                            */
    const books = this.props.books;
    const shelf = this.props.shelf;

    /* Sort books just cause it's nicer                                       */
    books.sort(sortBy('title'));

    /* Construct the DOM looping on books inside a shelf                      */
    return (
      <div>
        <div className='shelves'>
          <ul className='book-list'>
            {this.props.books.filter((book)=>(
              book.shelf===(Object.keys(shelf).toString()))).map((book)=>(
              <li key={book.id} className='book'>

                {/* Call the component to render each book 
                    Passing the callback function for the change self event recieved as a
                    prop from parent and the book to render as props */}
                <RenderBook
                  book={book}
                  updateBook = {this.props.updateBook}
                />
              </li>
            ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default ListBooks;
