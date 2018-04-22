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
      </div>
    );
  }
}

export default RenderBook;
