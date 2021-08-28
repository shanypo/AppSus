const { Link } = ReactRouterDOM
// import { utilService } from '../services/util.service.js'
import { bookService } from '../service/book.service.js'

export class BookDetails extends React.Component {

    state = {
        book: null
    }

    componentDidMount() {
        console.log(this.props, this.props)
        this.loadBook()
    }

    loadBook = () => {
        const id = this.props.match.params.bookId
        bookService.getBookById(id)
            .then(book => {
                if (!book) this.props.history.push('/')
                this.setState({ book })
            })

    }

    onBack = () => {
        this.props.history.push('/book')
    }

    getReading = (pageCount) => {
        if (pageCount < 100) return ('Light Reading: ' + pageCount + ' Pages')
        if (pageCount > 200) return ('Decent Reading: ' + pageCount + ' Pages')
        if (pageCount > 500) return ('Long reading: ' + pageCount + ' Pages')
        return ('Pages: ' + pageCount)
    }
    getDate = (publishedDate) => {
        const bookAge = new Date().getFullYear() - publishedDate;
        if (bookAge > 10) return 'Veteran Book'
        if (bookAge < 1) return 'New!'
        return ('Publishet At: ' + publishedDate)
    }
    getClassColor = (price) => {
        if (price > 150) return 'red'
        if (price < 20) return 'green'
    }
    render() {
        const { book } = this.state;
        if (!book) return <div>loading...</div>
        return (
            <React.Fragment>
                <section className='book-details' >
                    <h1>{book.title}</h1>
                    <h3>{book.subtitle}</h3>
                    <h4>by: {book.authors.map(author => author).join(',')}</h4>
                    <img src={book.thumbnail} />
                    <h1 className={this.getClassColor(book.listPrice.amount)}>Price: {book.listPrice.amount} {bookService.getCurrencyIcon(book.listPrice.currencyCode)}</h1>
                    <p>{this.getReading(book.pageCount)}</p>
                    <p>{this.getDate(book.publishedDate)}</p>
                    <button onClick={this.onBack}>Back</button>
                </section>
                <section className="reviews">
                    <form action="">

                    </form>
                </section>
            </React.Fragment>
        );
    }
}