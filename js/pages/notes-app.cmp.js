import notesService from '../services/notes.service.js'
import notesList    from '../cmps/book/book-list.cmp.js'
import notesFilter  from '../cmps/book/book-filter.cmp.js'
import noteDetails from '../cmps/book/book-details.cmp.js'

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
                        @note-selected="setSelectedNote"
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
        setSelectedNote(selectedNote) {
            this.selectedBook = selectedNote
            console.log('emitSelectedBook =  ', selectedNote)
        },
        backToList() {
            this.selectedBook = null
        },
    },
    components: {
        bookList: notesList,
        bookFilter: notesFilter,
        bookDetails: noteDetails,
    },
    created() {
        let booksPrm = notesService.query()
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
