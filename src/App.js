import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { Route } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';  // eslint-disable-line no-unused-vars
import ListMyBooks from './ListMyBooks';      // eslint-disable-line no-unused-vars
import SearchBooks from './SearchBooks';  // eslint-disable-line no-unused-vars
import './App.css';


class App extends Component {

  render() {

    const shelves = [{ currentlyReading:'Currently reading'},
      {wantToRead: 'Want to read'},
      {read: 'Read'}];

    /* call ListBooks component to display the books.                         */
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">My Reads</h1>
        </header>
        <Route exact path='/' render = {() => (
          <div>
            <ListMyBooks
              /*books={this.state.books} */
              shelves={shelves}
            />        
            <Link
              to='/search'
              className="search-book">
            >Search book</Link>
          </div>
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks/>
        )}
        />
      </div>
    );
  }
}

export default App;
