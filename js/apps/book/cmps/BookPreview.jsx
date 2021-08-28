const { Link } = ReactRouterDOM
import { bookService } from '../service/book.service.js'

export function BookPreview({ book }) {
    return (
        <Link to={`/book/${book.id}`}>
            <div className='book-preview'>
                <h2>Title - {book.title}</h2>
                <img src={book.thumbnail} />
                <h4>Price: {book.listPrice.amount} {bookService.getCurrencyIcon(book.listPrice.currencyCode)}</h4>
            </div>
        </Link>
    )
}

