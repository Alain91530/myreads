import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';  // eslint-disable-line no-unused-vars


class RenderBook extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  /*
   * Just set-up each element for a book and the callback function accordind to the prop
   * for the change of shef event.
   */
  render() {
    const currentBook = this.props.book;
    return(
      <div className="book-container">
        <div className="book-details">
          <Link
            to = {`/details/${currentBook.id}`}
            >
      View details</Link>
        </div> 
        {/* use the cover pic as background if the book has one */}
        {currentBook.hasOwnProperty('imageLinks')&&(<div className="book-cover"
          style={{backgroundImage: `url(${currentBook.imageLinks.thumbnail})`
          }} />)}
        <p className='book-title'> {currentBook.title}</p>
        <p className='book-authors'> {currentBook.authors}</p>
        <div className='book-shelf-changer'>
          <select
            name= {`${currentBook.id}`}
            onChange={(event) => this.props.updateBook(event.target.value)}
            value={currentBook.shelf}
          >
            <option value="test" disabled>Move to...</option>
            <option className="shelf-choice" value="currentlyReading" label='Currently reading'/>
            <option className="shelf-choice" value="wantToRead">Want to Read</option>
            <option className="shelf-choice"  value="read">Read</option>
            <option className="shelf-choice" value="none">None</option>
          </select>
        </div>
      </div>
    );
  }
}

export default RenderBook;
