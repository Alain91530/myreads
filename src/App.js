import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { Route } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import ListBooks from './ListBooks';      // eslint-disable-line no-unused-vars
import SearchBooks from './SearchBooks';      // eslint-disable-line no-unused-vars
import {getAll} from './BooksAPI';
import './App.css';


class App extends Component {

  state = {
    books: []
  };

  /* Get all books from the data base and update state to have it renderer    */

  componentDidMount() {
    getAll().then((books) => {
      this.setState({ books });
    });
  }

  render() {
    const shelves = ['currentlyReading','wantToRead','read'];
    /* call ListBooks component to display the books.                         */
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">My Reads</h1>
        </header>
        <Route exact path='/' render = {() => (
          <div>
            <ListBooks
              books={this.state.books}
              shelves={shelves}
            />
            <div className="search-book">
            </div>
          </div>
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBooks />
        )} />
      </div>
    );
  }
}

export default App;
