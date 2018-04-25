




# Fend project #7 My Reads 
## Description
The project purpose is to use and demonstrate React framework. It's a GUI to manage a books database. The user can sort his books in 3 categories:
- Currently reading
- Want to read
- Read

He can also seach a wider database to find new books and add them to his books by category.
## Getting Started
### Prerequisites
To run the project you need an ES5 compliant browser  
To install the project you will need npm, [visit npm page to install it](https://www.npmjs.com/) if needed.
The project is created with create-ract-app so all dependencies will be added.These specific dependencies are:  
- prop-types
- sort-by
- react-router-dom

### Installing
- Clone the repository or download the files
- Go to to the directory where you have cloned or copied the project and run:  
 `npm install`
 The project will install all dependencies requested.
 - run `npm start` to start the application. A web page will open in your browser with the home page of the application. By default the server runs on port 3000.  
 If this port is used on your computer you can change it by setting another port in the package.json file:  
 Linux: `"start": "PORT=XXXX react-scripts start"`  
 Windows: `"start": "set PORT=XXXX && react-scripts start"`  
 where XXXX is the port you want
 ### Usage
 The home page display your books on 3 shelves, each book with, if available, a cover miniature, its title and its author(s).
 User can open a dropdown menu on each book allowing him to change it of shelf (category). The book will then move on the screen to go in the adequate category.  
 He can also view more details about the book by clicking the button at the top of each book. This will navigate him to a detailed page with some more information if available in the database and a link to the Google Books page of the selected book.  
 At the bottom of the page the user can click on a "plus" link wich will open a seach page where he can find new books. Books will appear instantly while he types the query for the search.
## Version
- V 1.0 24/04/2018 Submission of project
## Documentation
The poject uses 5 components  
- App: Main page of the application showing the books on their shelves
    - no state
    - no props
    - Route "/"

- BookDetails: detailed information of the selected book
    - state : book : object with the informations about the book comming from the database
    - props: match (inherited from the <Link>)
    - Route: "/detail/:number" where number is the id of the book passed by the link. This number is retrieved in this.props.match.number.

- ListBooks: list all books on a shelf called by ListMyBooks
    - no state
    - props:
        - book: array of objects representing the books to render
        - shelf: object representing the different shelves
        - updateBook: callback function to be passed to RenderBook to handle the change of shelf event.
    - Route no spécific route just ineherited from caller

- ListMyBooks: List the shelves and the book on it by calling
ListBooks
    - state:
        - books: array of object containing the books on shelves
    - props:
        - shelves: object of objects representing the different shelves
    Route: no specific route inherited from App.

- RenderBook: display each book information and its dropdown menu to select the shelf. Called by ListBook and SearchBooks.
    - no state
    - props:
        - book: object representing the book to render
        - updateBook: the callback function for the dropdown menu event recieved by the caller in order to change the state of the parent (SearchBooks) or the grand-parent (ListMyBooks).
    - Route: no specific route, inerited by the caller.

- SearchBooks: the search page of the application
    - state:
        - SearchBooks: array of objects containing the books return by the query to the database.
        - myBooks: array of objects containing the book on the shelves
        - query: string containing the query for the database typed by the user.
    - no props
    - Route: "/search"

## Built With
- React framework ([see homepage](https://reactjs.org/))
## Contribution
- BooksAPI.js provided by [Udacity](https:udacity.com)
## Author
- **Alain Cadenat**
## License
MIT License

Copyright (c) 2018 Alain CADENAT

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
