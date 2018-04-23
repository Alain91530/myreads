import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import RenderBook from './RenderBook';    // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';  // eslint-disable-line no-unused-vars
import ListBooks from './ListBooks';      // eslint-disable-line no-unused-vars
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
  /*
   * Arrow function for the callback to avoid binding when invoking it
   */

  updateMyBooks = (event) => {
    /*
     * Get Id of the modified book and set some come for convenience
     */
    const bookId=document.activeElement.name;
    const searchedBooks=this.state.searchedBooks;

    let bookMoved=searchedBooks.filter((book) => (book.id===bookId));
    // bookMoved can't be empty and has only 1 element, it's the modified book

    // Update the database then get all books updated and set new state
    update(bookMoved[0], event).then(() => {(getAll()
      .then((books) => {this.setState({myBooks: books});})
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
    if (query) 
      search(query).then(( searchedBooks ) =>
      // Update the query
      {this.setState({ query });
        // Search the query and update the component's state with the results
        (searchedBooks.length) ? this.setState({searchedBooks}) : this.setState({searchedBooks: []});
      });
    else {
      // Update the state with the query to allow it comming back to ""
      this.setState({ query });
      // Update the books with an empty array
      this.setState({searchedBooks: []});}

  }
  /*
   * Function used to check the owned book in the search result. Used to be able to
   * highligth the proper option in the select to change a book of shelf.
   * 
   * For all owned book check if the book passed as parameter is the same
   * If not we return the book with a none shelf otherwise the shelf where it's stored
   * The check is made upon the Id which is unique
   */

  checkIfOwned= (book) => {

    // Prepare a default book to return
    let ownedBook = book;
    ownedBook.shelf = 'none';

    let foundBook = this.state.myBooks.filter((myBook) => (book.id===myBook.id))[0];
    // If a book was found foundBook is truthy and we return it 
    if (foundBook) {ownedBook = foundBook;}
    return(ownedBook);
  }

  render() {
    const query = this.state.query;
    let searchedBooks= this.state.searchedBooks;

    // Search if any owned books in the search result and update the result with the right shelf
    searchedBooks=searchedBooks.map((book)=>(
      this.checkIfOwned(book)));

    return (
      <div>
        {/*Render the search area of the search page*/}
        {/*A header with text input for the query and a link to the main page back*/}
        <div  className='search-books-top'>
          <h3>Search for new books:</h3>
          <input
            className='search-books'
            type='text'
            placeholder='Search for author, title, etc...'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value, searchedBooks)}
          />
          <Link
            to='/'
            className="back-home"
          >Back to My reads</Link>
        </div>

        {/*
          * Now render the results:
          * First the number of results returned
          */}

        {searchedBooks.length!==0 && (
          <div>
            <p className="search-results">
              {`Your search for "${(query)}" returned ${(searchedBooks.length)} result(s)`}
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

            {/* Add another link at the bottom of the page to scrolling up to go back*/}
            <Link
              to='/'
              className="back-home"
            >Back to My reads</Link>
          </div>
        )}

        {/* If the search returned an empty array a warning telling it*/}
        {((searchedBooks.length===0)&&(query.length!==0)) && (
          <div className="search-results">
            {`No match found for "${query}"`}</div>
        )}

        {/* Just nothing if the query is empty*/}
        
      </div>

    );
  }
}

export default SearchBooks;
