import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import {search} from './BooksAPI';

class SearchBooks extends Component {
  state = {
    searchedBooks: [],
    query: ''
  };

  /* Get all books from the data base and update state to have it renderer    */

/*  componentDidMount() {
    const searchResult=[];

    if(searchResult.length) {
      search(this.state.query).then((Books) => {
        this.setState({ Books });
      });
    }
    else {
      console.log(this.state.searchedBooks)
      this.setState({searchResult});
    }
  } */

  updateQuery = (query) => {
    let searchResult=[];
    searchResult=[];
    this.setState({ query: query });
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
        <div>
          <h1>Hello World</h1>
        </div>
        <div className='search-books-top'>
          <input
            className='search-books'
            type='text'
            placeholder='Search books'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value, searchedBooks)}
          />
        </div>
        {this.state.searchedBooks.length!==0 && (
          <ul className='book-list'>
            {this.state.searchedBooks.map((book)=>(
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
        )}
        {this.state.searchedBooks.length===0 && (
          <div className="search-results">
            {`No match found for "${query}"`}</div>
        )}
      </div>

    );
  }
}

export default SearchBooks;
