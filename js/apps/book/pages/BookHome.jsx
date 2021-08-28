const { Link } = ReactRouterDOM

import { bookService } from "../service/book.service.js";
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from "../cmps/BookFilter.jsx";
// import { BookDetails } from "./BookDetails.jsx";
import { BookAdd } from "../cmps/BookAdd.jsx";

export class BookHome extends React.Component {
    state = {
        books: [],
        filterBy: null,
    };

    componentDidMount() {
        this.loadBooks();
    };

    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then((books) => {
                this.setState({ books })
            });
    };

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }

    render() {
        const { books } = this.state;
        return (
            <section className='books-app main-layout'>
                <BookAdd />
                <BookFilter onSetFilter={this.onSetFilter} />
                <BookList books={books} />
            </section>
        );
    }
}