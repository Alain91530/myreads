import React, { Component } from 'react';
import ListBooks from './ListBooks'
import {getAll} from './BooksAPI';
import './App.css';


class App extends Component {

  state = {
    books: [

    ]
  };
  componentDidMount() {
    getAll().then((books) => {
      this.setState({ books });
    });
  }

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
