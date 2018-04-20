import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

class RenderBook extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired
  }

  render() {

    const book=this.props.book;

    return(
      <div>
        <div className="book-cover"
          style={{
            backgroundImage: `url(${book.imageLinks.thumbnail})`
          }} />
        <p className='book-title'> {book.title}</p>
        <p className='book-authors'> {book.authors}</p>
      </div>
    );
  }
}

export default RenderBook;
