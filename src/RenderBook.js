import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

class RenderBook extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired
  }

  updateShelf(event) {
    console.log(event, document.activeElement)
    console.log(this.props.book.shelf)
    this.props.book.shelf=event
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
        <select
          name= {`${book.id}`}
          className="book-shelf-changer"
          onChange={(event) => this.updateShelf(event.target.value)}
          value={book.shelf}
        >
          <option value="none" disabled>Move to...</option>
          <option className="shelf-choice" value="currentlyReading">Currently Reading</option>
          <option className="shelf-choice" value="wantToRead">Want to Read</option>
          <option className="shelf-choice"  value="read">Read</option>
          <option className="shelf-choice" value="none">None</option>
        </select>
      </div>
    );
  }
}

export default RenderBook;
