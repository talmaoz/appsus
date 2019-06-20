import bookService from '../services/notes.service.js'
import bookList    from '../cmps/book/book-list.cmp.js'
import bookFilter  from '../cmps/book/book-filter.cmp.js'
import bookDetails from '../cmps/book/book-details.cmp.js'

export default {
    template: `
        <section class="book-app">
            
            <h2 
                class="book-app-inner-container"
                v-if="booksErr.isErr"
                >
                {{booksErr.errMsg}}
            </h2>
            
            <div
                class="book-app-inner-container"
                v-if="!booksErr.isErr"
            >
                <book-filter 
                        v-if="!selectedBook"
                        @set-filter="setFilter"
                    >    
                    </book-filter>
                    
                    <book-list 
                        v-if="!selectedBook"
                        :books="booksForDisplay"
                        @book-selected="setSelectedBook"
                    >
                    </book-list>
                        
                    <book-details
                        v-if="selectedBook"
                        :book="selectedBook"
                        @back-to-list="backToList"
                    >
                    </book-details>
            </div>
            
                
        </section>
    `,
    data() {
        return {
            filter: null,
            books: [],
            selectedBook: null,
            booksErr: {isErr: false, errMsg: ''},
        }
    },
    computed: {
        booksForDisplay() {
            if (!this.filter) return this.books;
            return this.books.filter(book => book.title.includes(this.filter.txt))
        }
    },
    methods: {
        setFilter(filter) {
            this.filter = filter
        },
        setSelectedBook(selectedBook) {
            this.selectedBook = selectedBook
            console.log('emitSelectedBook =  ', selectedBook)
        },
        backToList() {
            this.selectedBook = null
        },
    },
    components: {
        bookList,
        bookFilter,
        bookDetails,
    },
    created() {
        let booksPrm = bookService.query()
        booksPrm
            .then((booksFromDb) => {
                this.books = booksFromDb
            })
            .catch((serverErr) => {
                this.booksErr.isErr  = true
                this.booksErr.errMsg = serverErr
            })
    },
}
