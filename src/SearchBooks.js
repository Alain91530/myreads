import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import RenderBook from './RenderBook';    // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';  // eslint-disable-line no-unused-vars

import {search, getAll, update} from './BooksAPI';

class SearchBooks extends Component {
  state = {
    searchedBooks: [],
    myBooks:[],
    query: ''
  };


  componentDidMount() {
    getAll().then((myBooks) => {
      this.setState({ myBooks });
    });
  }

  updateMyBooks = (event) => {
    /*
     * Get Id of the modified book and set some come for convenience
     */
    const bookId=document.activeElement.name;
    const books=this.state.searchedBooks;

    let bookMoved=books.filter((book) => (book.id===bookId));
    // bookMoved can't be empty and has only 1 element, it's the modified book
    books[books.indexOf(bookMoved[0])].shelf=event;

    // Update the database then get all books updated and set new state
    update(bookMoved[0], event).then(() => {(getAll()
      .then((books) => {this.setState({books});})
    );});
  }
  

  /*
   * Get all books according to the query from the data base and update state
   *   to have it rendered
   */
  updateQuery = (query) => {
    /*
    * No need to search for books if query is empty (after backspacing or
     * deleting), but we need to set the new state
     */
    (query) 
      ? search(query).then(( searchedBooks ) =>
      {
        // Search the query and update the component's state with the results
        (searchedBooks.length) ? this.setState({searchedBooks}) : this.setState({searchedBooks: []});
      })
      :
      this.setState({searchedBooks: []});
    // Update the state with the query
    this.setState({ query });

  }

  checkIfOwned= (book) => {
    let ownedBook = book;
    let foundBook = this.state.myBooks.filter((myBook) => (book.id===myBook.id))[0];
    ownedBook.shelf = 'none';
    if (foundBook) ownedBook = foundBook;
    return(ownedBook);
  }

  render() {
    
    const query = this.state.query;
    let searchedBooks= this.state.searchedBooks;
    searchedBooks=searchedBooks.map((book)=>(
      this.checkIfOwned(book)));

    return (
      <div>
        {/*Render the search area of the search page*/}
        <div  className='search-books-top'>
          <h3>Search for new books:</h3>
        </div>
        <div>
          <input
            className='search-books'
            type='text'
            placeholder='Search books'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value, searchedBooks)}
          />
        </div>
        <Link
          to='/'
          className="back-home"
        >Back to My reads</Link>

        {/*
          * Now render the results:
          * First the number of results returned
          */}
        {searchedBooks.length!==0 && (
          <div>
            <p className="search-results">
              {`Your search for" ${(query)} returned ${(searchedBooks.length)} result(s)`}
            </p>

            {/* Then the grid of books returned*/}
            <ul className='book-list'>
              {searchedBooks.map((book)=>(
                <li key={book.id} className='book'>
                  <div className="book-container">

                    <RenderBook
                      book={book}
                      updateBook = {this.updateMyBooks}
                    />

                  </div>

                </li>
              ))
              }
            </ul>
            <Link
              to='/'
              className="back-home"
            >Back to My reads</Link>
            {/*console.log(searchedBooks)*/}
          </div>
        )}
        {/* If the search return an empty array a warnig telling it*/}
        {(searchedBooks.length===0) && (
          <div className="search-results">
            {`No match found for "${query}"`}</div>
        )}

      </div>

    );
  }
}

export default SearchBooks;
