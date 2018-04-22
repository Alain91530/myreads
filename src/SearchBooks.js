import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import RenderBook from './RenderBook';    // eslint-disable-line no-unused-vars
import {search, getAll} from './BooksAPI';

class SearchBooks extends Component {
  state = {
    searchedBooks: [],
    myBooks:[],
    query: ''
  };

  /*
   * Get all books according to the query from the data base and update state
   *   to have it rendered
   */

  componentDidMount() {
    getAll().then((myBooks) => {
      this.setState({ myBooks });
    });
  }

  updateQuery = (query) => {
    let searchResult=[];
    searchResult=[];
    this.setState({ query: query });
    /*
    * No need to search for books if query is empty (after backspacing or
     * deleting)
     */
    if (query) {
      search(query).then(( searchedBooks ) => {
        if(searchedBooks.length) {
          this.setState({searchedBooks});
        }
        else {
          this.setState({searchedBooks: []});
        }
      });
    }
    this.setState({searchResult});
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
                  <RenderBook
                    book={book}
                  />
                </li>
              ))
              }
            </ul>
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
