import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import {search} from './BooksAPI';

class SearchBooks extends Component {
  state = {
    searchedBooks: [],
    query: ''
  };
  /*
   * Get all books according to the query from the data base and update state
   *   to have it rendered
   */

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

  render() {
    const query = this.state.query;
    const searchedBooks= this.state.searchedBooks;
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
                  <div className="book-cover"
                    style={{
                      backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }} />
                  <p className='book-title'> {book.title}</p>
                  <p className='book-authors'> {book.authors}</p>
                </li>
              ))
              }
            </ul>
          </div>
        )}
        {/* If the search return an empty array a warnig telling it*/}
        {searchedBooks.length===0 && (
          <div className="search-results">
            {`No match found for "${query}"`}</div>
        )}
      </div>

    );
  }
}

export default SearchBooks;
