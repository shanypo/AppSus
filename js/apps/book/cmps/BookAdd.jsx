import { bookService } from "../services/book.service.js"

export class BookAdd extends React.Component {
    state = {
        searchKey: '',
        booksResults: []
    }
    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ searchKey: value }, () => {
            bookService.searchBook(this.state.searchKey)
                .then((res) => {
                    this.setState({ booksResults: res })
                })
        });
    }
    onAddBook = (googleBook) => {
        // bookService.addGoogleBook(googleBook)
    }
    render() {
        const { searchKey, booksResults } = this.state;
        return (
            <React.Fragment>
                <label htmlFor="book-search">Search a book</label>
                <input
                    name='search'
                    id='book-search'
                    type='search'
                    placeholder='Search for a book'
                    value={searchKey}
                    onChange={this.handleChange}
                />
                <section>
                    <ul>

                        {booksResults.length && booksResults.map(book =>
                            <li key={book.id} >{book.volumeInfo.title}
                                <button key={book.id} onClick={() => { this.onAddBook(book) }}>+</button>
                            </li>)}
                    </ul>
                </section>
            </React.Fragment >
        );
    }
}