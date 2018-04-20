import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import RenderBook from './RenderBook';   // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import sortBy from 'sort-by';

/* Enforce type of props                                                      */

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired
  }

  /* Render the shelves                                                       */

  render() {
    /* const just for convenience                                             */
    const books = this.props.books;
    const shelves = this.props.shelves;
    /* Sort books just cause it's nicer                                       */
    books.sort(sortBy('title'));
    /* Construct the DOM looping on shelves and on books inside a shelf       */
    return (
      <div>
        <div className='shelves'>
          {shelves.map((shelf) => (
            <div key={shelf} className='shelf'>
              <h2 className='shelf-title'>{shelf}</h2>
              <ul className='book-list'>
                {books.filter((book)=>(book.shelf===shelf)).map((book)=>(
                  <li key={book.id} className='book'>
                    <RenderBook
                      book={book}
                    />
                  </li>
                ))
                }
              </ul>
            </div>

          ))}
        </div>

      </div>);
  }
}

export default ListBooks;
