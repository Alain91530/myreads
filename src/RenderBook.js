import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

class RenderBook extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired
  }

  render() {
    const currentBook = this.props.book;
    //   if(!currentBook.hasOwnProperty('imageLinks')) currentBook.imageLinks={thumbnail: './icons/no_cover.jpg'};
    return(
      <div>
        {currentBook.hasOwnProperty('imageLinks')&&(<div className="book-cover"
          style={{backgroundImage: `url(${currentBook.imageLinks.thumbnail})`
          }} />)}
        {!currentBook.hasOwnProperty('imageLinks')&&(<div className="book-cover"/>)}
        <p className='book-title'> {currentBook.title}</p>
        <p className='book-authors'> {currentBook.authors}</p>
        <select
          name= {`${currentBook.id}`}
          className="book-shelf-changer"
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
    );
  }
}

export default RenderBook;
