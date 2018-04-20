import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

class RenderBook extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired
  }

  render() {

    const book=this.props.book;

    return(
      <div className="book-container">
        <div className="book-cover"
          style={{
            backgroundImage: `url(${book.imageLinks.thumbnail})`
          }} />
        <p className='book-title'> {book.title}</p>
        <p className='book-authors'> {book.authors}</p>
        <div className="book-shelf-changer">
          <select>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
    );
  }
}

export default RenderBook;
