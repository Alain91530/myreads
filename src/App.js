import React, { Component } from 'react';
import ListBooks from './ListBooks'
import {getAll} from './BooksAPI';
import './App.css';


class App extends Component {

  state = {
    books: [
      { title: 'test1', shelf:'lu'},
      {title: 'test2', shelf:'à lire'}
    ]
  };


  render() {
    return (

      <div className="App">
        <div>
          <header className="App-header">
            <h1 className="App-title">My Reads</h1>
          </header>
          <ListBooks
            books={this.state.books}
          />
        </div>
      </div>
    );
  }
}

export default App;
