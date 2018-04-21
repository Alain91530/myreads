import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

class RenderBook extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired
  }

  render() {
    const currentBook = this.props.book;

    return(
      <div>
        <div className="book-cover"
          style={{
            backgroundImage: `url(${currentBook.imageLinks.thumbnail})`
          }} />
        <p className='book-title'> {currentBook.title}</p>
        <p className='book-authors'> {currentBook.authors}</p>
      </div>
    );
  }
}

export default RenderBook;
