import { BookPreview } from './BookPreview.jsx'
export function BookList({ books }) {
    return (
        <div className='book-list main-layout'>
            {books.map(book => <BookPreview key={book.id} book={book} />)}
        </div>
    )
}
