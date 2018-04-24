import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

class BookDetails extends Component {

  render() {
      const  bookId = this.props.match.params.number;
      console.log(bookId)
      return (
    <div className="detailed-desc">
    Book Details
    </div>
      )
    }
}

export default BookDetails;