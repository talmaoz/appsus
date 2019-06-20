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
                >{{booksErr.errMsg}}
            </h2>
            
            <div
                class="book-app-inner-container"
                v-if="!booksErr.isErr">
                
                <notes-filter 
                        v-if="!selectedNote"
                        @set-filter="setFilter">    
                </notes-filter>
                    
                <notes-list 
                    v-if="!selectedNote"
                    :books="booksForDisplay"
                    @note-selected="setSelectedNote">
                </notes-list>
                    
                <note-details
                    v-if="selectedNote"
                    :book="selectedNote"
                    @back-to-list="backToList">
                </note-details>
            </div>
            
                
        </section>
    `,
    data() {
        return {
            filter: null,
            books: [],
            selectedNote: null,
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
            this.selectedNote = selectedNote
        },
        backToList() {
            this.selectedNote = null
        },
    },
    components: {
        notesList,
        notesFilter,
        noteDetails,
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
