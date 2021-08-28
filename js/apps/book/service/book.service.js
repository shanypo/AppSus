import { storageService } from '../../../services/storage.service.js'
import { dafultBooks } from './books.data.js';

export const bookService = {
    query,
    getBookById,
    searchBook,
    addGoogleBook,
    getCurrencyIcon
}

const KEY = 'booksDB';
let gBooks = _loadBooksFromStorage() || dafultBooks;

function query(filterBy) {
    const storageBooks = _loadBooksFromStorage()
    gBooks = (storageBooks) ? storageBooks : dafultBooks;
    if (filterBy) {
        let { title, minPrice, maxPrice } = filterBy
        maxPrice = maxPrice ? maxPrice : Infinity
        minPrice = minPrice ? minPrice : 0
        const booksFiltered = gBooks.filter(book =>
            book.title.includes(title) &&
            book.listPrice.amount >= minPrice &&
            book.listPrice.amount <= maxPrice)
        return Promise.resolve(booksFiltered)
    }
    return Promise.resolve(gBooks)
}

function getBookById(bookid) {
    let book = gBooks.find(book => bookid === book.id)
    return Promise.resolve(book)
}


function getCurrencyIcon(currencyCode) {
    switch (currencyCode) {
        case 'ILS':
            return '₪';
        case 'EUR':
            return '€';
        default:
            return '$';
    }
}

// SAVING AND LOADING //

function _saveBooksToStorage() {
    storageService.saveToStorage(KEY, gBooks)
}

function _loadBooksFromStorage() {
    return storageService.loadFromStorage(KEY)
}

// GOOGLE BOOKS //

// SEARCH BOOKS //

function searchBook(searchKey) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchKey}`)
        .then((rawData) => {
            return rawData.data.items
        })
        .catch((err) => err);
}

// SAVE BOOK //

function addGoogleBook(googleBook) {
    // console.log('googleBook', googleBook)
}

