import {storageService} from './storage.service.js'
import {utilService} from './util.service.js'

export default {
    query
}

const BOOKS_KEY = 'books'

// Simulation controllers:
const SIMULATED_SERVER_DELAY = 0.5 * 1000
const SIMULATE_SERVER_ERR    = false

function query() {
    let books = storageService.load(BOOKS_KEY);
    if (!books) {
        books = generateBooks();
        storageService.store(BOOKS_KEY, books)
    }
    if (SIMULATE_SERVER_ERR) books = null
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if (!books) {
                reject(`Couldn't retrieve data from server.`)
            } else {
                resolve(books)
            }
        }, SIMULATED_SERVER_DELAY)
    })
}

function generateBooks() {
    var books = []
    for (let index = 0; index < 20; index++) {
        var book = createBook()
        books.push(book)

    }
    return books;
}

function createBook() {
    let imgBaseUrl = 'http://coding-academy.org/books-photos/'
    return {
        id: utilService.makeId(),
        title: utilService.makeLorem(10),
        publishedDate: utilService.getRandomInt(1900, 2000),
        thumbnail: imgBaseUrl + utilService.getRandomInt(1, 21) + '.jpg',
        price: utilService.getRandomInt(50, 400),
        pages: utilService.getRandomInt(50, 900),
        isOnSale: utilService.getRandomInt(0, 100) > 70,
    }
}

