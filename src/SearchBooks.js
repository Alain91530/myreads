import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import RenderBook from './RenderBook';    // eslint-disable-line no-unused-vars
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

  updateMyBooks(event) {
    const bookId=document.activeElement.name;
    let books=this.state.searchedBooks;
    let myNewBooks=this.state.myBooks
    const test =[]
    console.log(books,bookId)
    let bookMoved=books.filter((book) => (book.id===bookId));
    bookMoved.shelf=event
    myNewBooks.push(bookMoved)
    console.log(bookMoved[0])
    update(bookMoved[0], event)
      .then(() => {console.log('updated');(getAll()
        .then((test) => {console.log('got books',test);this.setState({test})})
        .catch(console.log('error',this.state.myBooks)))})
      .catch(console.log(books))
    //bookMoved.shelf = event
    //myNewBooks.push(bookMoved[0])
    //console.log(this.state.myBooks.indexOf(bookMoved[0]))
    //this.state.myBooks[)].shelf=event;
    //this.setState({myBooks: myNewBooks});
    console.log(this.state.myBooks)
  }

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
    console.log('render:',this.state.myBooks)

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
                  <div className="book-container">

                    <RenderBook
                      book={book}
                    />
                    {console.log(book.shelf)}

                    <select
                      name= {`${book.id}`}
                      className="book-shelf-changer"
                      onChange={(event) => this.updateMyBooks(event.target.value)}
                      value={book.shelf}
                    >
                      <option value="test" disabled>Move to...</option>
                      <option className="shelf-choice" value="currentlyReading" label='Currently reading'/>
                      <option className="shelf-choice" value="wantToRead">Want to Read</option>
                      <option className="shelf-choice"  value="read">Read</option>
                      <option className="shelf-choice" value="none">None</option>
                    </select>
                  </div>

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
