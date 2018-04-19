import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import {search} from './BooksAPI';

class SearchBooks extends Component {
  state = {
    searchedBooks: [],
    query: 'H'
  };

  /* Get all books from the data base and update state to have it renderer    */

  componentDidMount() {
    search(this.state.query).then((searchedBooks) => {
      this.setState({ searchedBooks });
    });
  }

  updateQuery = (query, test) => {
    this.setState({ query}
  )
    search(query).then(( searchedBooks) => {

    this.setState({searchedBooks})

  }).catch(()=>{console.log('erreur')});};

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
      </div>

    );
  }
}

export default SearchBooks;
