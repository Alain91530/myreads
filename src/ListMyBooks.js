import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import RenderBook from './RenderBook';    // eslint-disable-line no-unused-vars
import ListBooks from './ListBooks';      // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import {getAll, update} from './BooksAPI';

class ListMyBooks extends Component {

/* Enforce type of props                                                      */
  static propTypes = {
    shelves: PropTypes.array.isRequired
  }

  state = {
    books: []
  };
/*
 * Callback function for the event triggered when a book change of shef
 */
  updateShelf = (event) => {
    const bookId=document.activeElement.name;
    const books=this.state.books;

    let bookMoved=books.filter((book) => (book.id===bookId));
    books[books.indexOf(bookMoved[0])].shelf=event;

    update(bookMoved[0], event).then(() => {(getAll()
      .then((books) => {this.setState({books});})
    );});
    /*
     * Not totally necessary but used to force rerender before the database update
     * to have a more reactive app
     */
    this.setState({books: books});
  }
  /* Get the books and set the state when component has mount                 */
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

    /* Construct the DOM looping on shelves                                   */
    return (
      
      <div className='shelves'>
        {shelves.map((shelf) => (
          <div key={Object.keys(shelf)} className='shelf'>
            <h2 className='shelf-title'>
              {shelf[Object.keys(shelf).toString()]}
            </h2>
            {/* List the books on each shelf and pass the call back function*/}
            <ListBooks
              books={this.state.books.filter((book)=>
                (book.shelf===(Object.keys(shelf).toString())))
              }
              shelf={shelf}
              updateBook= {this.updateShelf}/>
          </div>
        ))}
      </div>
    );
  }
}

export default ListMyBooks;
