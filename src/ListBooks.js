import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import RenderBook from './RenderBook';   // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import {getAll, update} from './BooksAPI';


/* Enforce type of props                                                      */

class ListBooks extends Component {
  static propTypes = {
    shelves: PropTypes.array.isRequired
  }

  state = {
    books: []
  };

  updateShelf = (event) => {
    const bookId=document.activeElement.name;
    const books=this.state.books;

    let bookMoved=books.filter((book) => (book.id===bookId));
    books[books.indexOf(bookMoved[0])].shelf=event;

    update(bookMoved[0], event).then(() => {(getAll()
      .then((books) => {this.setState({books});})
    );});
  
    this.setState(books: books);
  }

  componentDidMount() {
    getAll().then((books) => {
      this.setState({ books });
    });
  }

  /* Render the shelves                                                       */

  render() {
    /* const just for convenience                                             */
    const books = this.state.books;
    const shelves = this.props.shelves;
    /* Sort books just cause it's nicer                                       */
    books.sort(sortBy('title'));
    /* Construct the DOM looping on shelves and on books inside a shelf       */
    return (
      <div>
        <div className='shelves'>
          {shelves.map((shelf) => (
            <div key={Object.keys(shelf)} className='shelf'>
              <h2 className='shelf-title'>
                {shelf[Object.keys(shelf).toString()]}
              </h2>
              <ul className='book-list'>
                {this.state.books.filter((book)=>(
                  book.shelf===(Object.keys(shelf).toString()))).map((book)=>(
                  <li key={book.id} className='book'>
                    <div className="book-container">
                      <RenderBook
                        book={book}
                        updateBook = {this.updateShelf}
                      />

                    </div>
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
